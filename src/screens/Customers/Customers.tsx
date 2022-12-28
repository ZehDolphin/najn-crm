import { Button, Table } from 'antd'
import React from 'react'
import styled from 'styled-components'
import AddCustomerButton from '../../components/customers/AddCustomerButton'
import CustomersTable from '../../components/customers/CustomersTable'
import { ScreenHeader } from '../../layout/ScreenHeader'

export default function Customers() {
	return (
		<>
			<ScreenHeader>
				<h1>Customers</h1>
				<div className="spacer fill"></div>
				<AddCustomerButton />
			</ScreenHeader>
			<main>
				<div className="spacer m"></div>
				<CustomersTable />
			</main>
		</>
	)
}
