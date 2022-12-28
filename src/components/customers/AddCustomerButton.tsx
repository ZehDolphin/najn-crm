import React, { useEffect, useState } from 'react'
import { Button, Form, Input, message, Modal } from 'antd'
import { NewCustomerSearchField } from './NewCustomerSearchField'
import { EniroCompany } from '../../lib/companies/TemporaryCompany'
import { addCustomer, Customer } from '../../lib/customers/Customers'
import {
	cleanDigitString,
	validateOrganisationNumber,
} from '../../lib/companies/ValidateOrgNr'
import URLInput from '../URLInput'

export default function AddCustomerButton() {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [loading, setLoading] = useState(false)

	const [customer, setCustomer] = useState<Customer>({ name: '', org: '' })
	const [messageApi, contextHolder] = message.useMessage()

	const handleOk = async () => {
		if (customer.name == '')
			return messageApi.error("Customer name can't be empty")

		if (customer.org == '')
			return messageApi.error("Organization number can't be empty")

		if (validateOrganisationNumber(customer.org) === false)
			return messageApi.error('Invalid organization number')

		try {
			await addCustomer(customer)
		} catch (e) {
			if (e.message === 'Customer exists')
				return messageApi.error(
					'A customer with the same organization number already exists!'
				)
			throw e
		}

		messageApi.info(`${customer.name} has been added!`)
		setCustomer({ name: '', org: '' })
		setIsModalOpen(false)
	}

	const handleCancel = () => {
		setCustomer({ name: '', org: '' })
		setIsModalOpen(false)
	}

	const selectedCompany = (eniroData: EniroCompany) => {
		const c: Customer = {
			eniroData,
			org: eniroData.organisationNumber,
			name: eniroData.name,
		}
		const description = eniroData.products.find(
			(p) => p.name == 'company_description'
		)
		if (description)
			c.description = description.text.join(` `).replaceAll('#nl#', ' ')

		const website = eniroData.products.find((p) => p.name == 'homepage')
		if (website) c.website = website.url

		setCustomer(c)
	}

	return (
		<>
			{contextHolder}
			<Button type="primary" onClick={() => setIsModalOpen(true)}>
				Add Customer
			</Button>
			<Modal
				title="Add Customer"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				okText={'Add'}
				confirmLoading={loading}
			>
				<div className="spacer s"></div>
				<Form
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					onFinish={handleOk}
					//   onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item label="Company Name">
						<NewCustomerSearchField
							value={customer.name}
							onChange={(name) =>
								setCustomer((c) => ({ ...c, name: name }))
							}
							onSelect={selectedCompany}
						/>
					</Form.Item>
					<Form.Item label="Org. Number">
						<Input
							placeholder="Organization Number"
							value={customer.org || ''}
							onChange={(e) => {
								let val = cleanDigitString(e.target.value)
								setCustomer((c) => ({
									...c,
									org: val,
								}))
							}}
							status={
								validateOrganisationNumber(customer.org)
									? ''
									: 'error'
							}
						/>
					</Form.Item>
					<Form.Item label="Description">
						<Input.TextArea
							rows={4}
							placeholder="Customer short description"
							autoSize={{ minRows: 4, maxRows: 6 }}
							value={customer.description || ''}
							onChange={(e) =>
								setCustomer((c) => ({
									...c,
									description: e.target.value,
								}))
							}
						/>
					</Form.Item>

					<Form.Item label="Website">
						<URLInput
							url={customer.website}
							onChange={(url) => {
								setCustomer((c) => ({
									...c,
									website: url,
								}))
							}}
						/>
					</Form.Item>
				</Form>
			</Modal>
		</>
	)
}
