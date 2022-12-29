import React, { useEffect, useRef, useState } from 'react'
import { Button, Form, Input, message, Modal, notification } from 'antd'
import { addCustomerEvent, Customer } from '../../../lib/customers/Customers'
import { FormOutlined } from '@ant-design/icons'

export default function AddCommentButton({ customer }: { customer: Customer }) {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [loading, setLoading] = useState(false)
	const [content, setContent] = useState('')

	const [messageApi, contextHolder] = message.useMessage()

	const handleOk = async () => {
		if (content == '') return messageApi.error("The comment can't be empty")

		setLoading(true)
		await addCustomerEvent(customer, {
			type: 'comment',
			content: content,
		} as any)
		setContent('')
		setLoading(false)
		setIsModalOpen(false)
	}

	const handleCancel = () => {
		setIsModalOpen(false)
	}

	return (
		<>
			{contextHolder}
			<Button type="primary" onClick={() => setIsModalOpen(true)}>
				Add Comment <FormOutlined />
			</Button>
			<Modal
				title="Add Comment"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				okText={'Comment'}
				confirmLoading={loading}
			>
				<div className="spacer s"></div>
				<Form
					// labelCol={{ span: 8 }}
					// wrapperCol={{ span: 16 }}
					onFinish={handleOk}
					//   onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item>
						<Input.TextArea
							rows={4}
							placeholder="Customer short description"
							autoSize={{ minRows: 4, maxRows: 6 }}
							value={content}
							onChange={(e) => setContent(e.target.value)}
						/>
					</Form.Item>
				</Form>
			</Modal>
		</>
	)
}
