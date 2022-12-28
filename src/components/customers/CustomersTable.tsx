import React from 'react'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Customer, useCustomers } from '../../lib/customers/Customers'
import { Link } from 'react-router-dom'

const columns: ColumnsType<Customer> = [
	{
		title: 'Name',
		dataIndex: 'name',
		render: (name, customer) => (
			<Link to={`/customers/${customer.id}`}>{name}</Link>
		),
		width: '20%',
	},
	{
		title: 'Org. Nr.',
		dataIndex: 'org',
		width: '20%',
	},
]

const CustomersTable: React.FC = () => {
	const customers = useCustomers()

	return (
		<>
			<Table
				pagination={{
					disabled: true,
					hideOnSinglePage: true,
				}}
				columns={columns}
				rowKey={(record) => record.org}
				dataSource={customers}
				loading={customers.length == 0}
			/>
		</>
	)
}

export default CustomersTable
