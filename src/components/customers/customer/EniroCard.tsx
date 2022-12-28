import { LinkOutlined } from '@ant-design/icons'
import { Button, Card, Space, Tag } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { Customer } from '../../../lib/customers/Customers'

export default function EniroCard({ customer }: { customer: Customer }) {
	const eniro = customer.eniroData

	const logo = eniro.products.find((p) => p.name == 'logo')
	const about = eniro.products.find((p) => p.name == 'company_description')
	const links = eniro.products.filter((p) => p.name == 'deeplink')
	const email = eniro.products.find((p) => p.name == 'email')
	const phone = eniro.phones[0]
	const website = customer.website

	return (
		<Style>
			<Space size={'middle'}>
				<img
					className="logo"
					src={
						logo
							? logo.image
							: `data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==`
					}
					width={200}
					height={175}
				/>
				<Space direction="vertical" size={4}>
					<div className="name-wrapper">
						<div className="title">{customer.name}</div>
						<div className="org">
							{customer.eniroData.organisationNumber}
						</div>
					</div>
					{website && (
						<a href={website} target="_blank">
							{new URL(website).hostname}
						</a>
					)}
					{email && (
						<a href={`mailto:${email.link}`} target="_blank">
							{email.link}
						</a>
					)}
					{phone && (
						<a href={`tel:${phone.number}`} target="_blank">
							{phone.number}
						</a>
					)}
					<Space wrap={true}>
						{eniro.categories.map((cat) => (
							<Tag>{cat.name}</Tag>
						))}
					</Space>
				</Space>
			</Space>

			<div className="spacer s"></div>

			{about && (
				<>
					<h2>Om företaget</h2>
					<p className="about">
						{about.text.join(' ').replaceAll('#nl#', ' ')}
					</p>
				</>
			)}

			{links?.length != 0 && (
				<>
					<h2>Utvalda länkar</h2>
					<Space wrap={true}>
						{links.map((link) => {
							return (
								<a href={link.url} target="_blank">
									<Button>
										{link.label} <LinkOutlined />
									</Button>
								</a>
							)
						})}
					</Space>
				</>
			)}

			{/* <pre>{JSON.stringify(customer.eniroData, null, 4)}</pre> */}
		</Style>
	)
}

const Style = styled(Card)`
	.name-wrapper {
		.title {
			font-size: 24px;
			font-weight: 500;
		}
		.org {
			font-size: 14px;
			margin-top: -8px;
		}
	}

	.logo {
		object-fit: contain;
		border-radius: 5px;
		border: solid 1px lightgray;
		padding: 0.5em;
	}
`
