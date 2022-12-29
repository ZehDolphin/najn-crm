/**
 * Utility file for creating and reading companies from the Firebase Firestore.
 */

import { getAuth } from 'firebase/auth'
import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	limit,
	onSnapshot,
	query,
	Timestamp,
	where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { useUser } from '../auth/UserProvider'
import { EniroCompany } from '../companies/TemporaryCompany'

export interface Customer {
	/**
	 * A Firestore ID that is set on all fetched customers.
	 */
	id?: string

	/**
	 * Firestore date object for when the Customer was added.
	 */
	addedDate?: {
		seconds: number
		nanoseconds: number
	}

	/**
	 * A unique Swedish organization number.
	 */
	org: string

	/**
	 * The company name.
	 */
	name: string

	/**
	 * If this company has been fetched from Eniro this will be set, otherwise null.
	 */
	eniroData?: EniroCompany

	/**
	 * The company website, used for scraping data and website analysis.
	 */
	website?: string

	/**
	 * A short description about the company.
	 * If the company is found on Eniro, the logo will be fetched from there by default, otherwise null.
	 */
	description?: string
}

export interface CustomerEvent {
	time: {
		seconds: number
		nanoseconds: number
	}

	author_name: string

	type: 'event' | 'comment'

	id: string

	content: string
}

export async function doesCustomerExist(customer: Customer) {
	return !(
		await getDocs(
			query(collection(db, 'customers'), where('org', '==', customer.org))
		)
	).empty
}

export async function addCustomer(customer: Customer) {
	const auth = getAuth()

	if (await doesCustomerExist(customer)) {
		throw new Error('Customer exists')
	}

	const ref = await addDoc(collection(db, 'customers'), {
		...customer,
		addedDate: Timestamp.now(),
		addedBy: auth.currentUser.uid,
		author_name: auth.currentUser.displayName || auth.currentUser.email,
	})

	await addCustomerEvent(
		ref as any,
		{
			type: 'event',
			content: 'Customer added',
		} as any
	)
}

export function useCustomers() {
	const [customers, setCustomers] = useState<Customer[]>([])
	const user = useUser()

	useEffect(() => {
		if (!user) return

		const unsub = onSnapshot(collection(db, 'customers'), (docs) => {
			let c: Customer[] = []
			docs.forEach((doc) => {
				c.push({
					...doc.data(),
					id: doc.id,
				} as Customer)
			})
			setCustomers(c)
		})

		return () => unsub()
	}, [user])

	return customers
}

export function useCustomer(id: string) {
	const [customer, setCustomer] = useState<Customer>(undefined)
	const user = useUser()

	useEffect(() => {
		if (!user) return

		const unsub = onSnapshot(doc(db, 'customers', id), (doc) => {
			setCustomer({
				...doc.data(),
				id: doc.id,
			} as Customer)
		})

		return () => unsub()
	}, [user])

	return customer
}

export function useCustomerEvents(id: string) {
	const [events, setEvents] = useState<CustomerEvent[]>([])
	const user = useUser()

	useEffect(() => {
		if (!user) return

		const unsub = onSnapshot(
			collection(db, 'customers', id, 'events'),
			(docs) => {
				let c: CustomerEvent[] = []
				docs.forEach((doc) => {
					c.push({
						...doc.data(),
						id: doc.id,
					} as any)
				})

				c = c.sort((a, b) => b.time.seconds - a.time.seconds)

				setEvents(c)
			}
		)

		return () => unsub()
	}, [user])

	return events
}

export async function addCustomerEvent(
	customer: Customer,
	event: CustomerEvent
) {
	const auth = getAuth()

	const ref = await addDoc(
		collection(db, 'customers', customer.id, 'events'),
		{
			...event,
			time: Timestamp.now(),
			author_id: auth.currentUser.uid,
			author_name: auth.currentUser.displayName || auth.currentUser.email,
		}
	)
}
