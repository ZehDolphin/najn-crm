import React, { useState, MouseEvent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button, Form, Input, message, Modal } from 'antd'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase'
import { User } from 'firebase/auth'

function TodoInput({ user }: { user: User }) {
	const [form] = Form.useForm()

	const [todo, setTodo] = useState('')
	const [loading, setLoading] = useState(false)

	const addTodo = async (e: MouseEvent<HTMLElement>) => {
		e.preventDefault()
		setLoading(true)
		try {
			await addDoc(collection(db, 'todos'), {
				todo: todo,
				added: new Date(),
				user: user.email,
			})
			setTodo('')
			message.info('Your todo has been added!')
		} catch (e) {
			console.error('Error adding document ', e)
			Modal.error({
				title: 'Something went wrong',
				content:
					'Looks like your todo could not be added, try again later!',
			})
		}
		setLoading(false)
	}

	return (
		<StyledForm form={form} onFinish={addTodo}>
			<Form.Item rules={[{ required: true }]}>
				<Input
					type="text"
					placeholder="What do you have to do today?"
					value={todo}
					onChange={(e) => setTodo(e.target.value)}
				/>
			</Form.Item>

			<Form.Item>
				<Button
					loading={loading}
					type="primary"
					htmlType="submit"
					onClick={addTodo}
				>
					Submit
				</Button>
			</Form.Item>
		</StyledForm>
	)
}

const StyledForm = styled(Form)`
	display: flex;

	.ant-form-item {
		margin-right: 1rem;
	}
`

TodoInput.propTypes = {}

export { TodoInput }
