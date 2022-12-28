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
	query,
	Timestamp,
	where,
} from 'firebase/firestore'
import { db } from '../../firebase'
import { EniroCompany } from '../companies/TemporaryCompany'

export interface Customer {
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
	})
}
