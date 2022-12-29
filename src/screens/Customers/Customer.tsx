import { Breadcrumb, Card, Space, Spin, Tabs, Timeline } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import AddCommentButton from '../../components/customers/customer/AddCommentButton'
import EniroCard from '../../components/customers/customer/EniroCard'
import HistoryCard from '../../components/customers/customer/HistoryCard'
import Loader from '../../layout/Loader'
import { ScreenHeader } from '../../layout/ScreenHeader'
import { useCustomer } from '../../lib/customers/Customers'

export default function Customer(props: any) {
	const { id } = useParams()
	const customer = useCustomer(id)

	if (!customer) return <Loader />

	return (
		<>
			<Space direction="vertical" size="large" style={{ width: '100%' }}>
				<Breadcrumb>
					<Breadcrumb.Item>
						<Link to="/customers">Customers</Link>
					</Breadcrumb.Item>
					<Breadcrumb.Item>{customer.name}</Breadcrumb.Item>
				</Breadcrumb>

				<ScreenHeader>
					<h1 style={{ fontSize: '28px' }}>{customer.name}</h1>
					<div className="spacer fill"></div>
					<AddCommentButton customer={customer} />
				</ScreenHeader>

				<Tabs
					defaultActiveKey="1"
					// onChange={onChange}
					items={[
						{
							label: `Activity`,
							key: '1',
							children: <HistoryCard customer={customer} />,
						},
						customer.eniroData && {
							label: `Eniro`,
							key: '2',
							children: <EniroCard customer={customer} />,
						},
					]}
				/>
			</Space>
		</>
	)
}
