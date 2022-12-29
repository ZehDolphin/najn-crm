import { Breadcrumb, Button, Space, Table } from 'antd'
import React from 'react'
import styled from 'styled-components'
import AddCustomerButton from '../../components/customers/AddCustomerButton'
import CustomersTable from '../../components/customers/CustomersTable'
import { ScreenHeader } from '../../layout/ScreenHeader'

export default function Customers() {
	return (
		<Space direction="vertical" size="large" style={{ width: '100%' }}>
			<Breadcrumb>
				<Breadcrumb.Item>Customers</Breadcrumb.Item>
			</Breadcrumb>
			<ScreenHeader>
				<h1 style={{ fontSize: '28px' }}>Customers</h1>
				<div className="spacer fill"></div>
				<AddCustomerButton />
			</ScreenHeader>
			<main>
				<div className="spacer m"></div>
				<CustomersTable />
			</main>
		</Space>
	)
}
