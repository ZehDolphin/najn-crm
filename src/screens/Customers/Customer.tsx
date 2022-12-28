import { Card, Space, Spin } from 'antd'
import React from 'react'
import { useParams } from 'react-router-dom'
import EniroCard from '../../components/customers/customer/EniroCard'
import Loader from '../../layout/Loader'
import { ScreenHeader } from '../../layout/ScreenHeader'
import { useCustomer } from '../../lib/customers/Customers'

export default function Customer(props: any) {
	const { id } = useParams()
	const customer = useCustomer(id)

	if (!customer) return <Loader />

	return (
		<>
			<ScreenHeader>
				<h1 style={{ fontSize: '28px' }}>{customer.name}</h1>
				<div className="spacer fill"></div>
				{/* <AddCustomerButton /> */}
			</ScreenHeader>
			<main>
				<div className="spacer m"></div>
				{customer.eniroData && <EniroCard customer={customer} />}
			</main>
		</>
	)
}
