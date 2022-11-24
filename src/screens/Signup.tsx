import { Button, Checkbox, Form, Input } from 'antd'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { auth } from '../firebase'

export default function Signup() {
	const navigate = useNavigate()

	const onSubmit = async (e: any) => {
		await createUserWithEmailAndPassword(auth, e.email, e.password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user
				console.log(user)
				navigate('/login')
				// ...
			})
			.catch((error) => {
				const errorCode = error.code
				const errorMessage = error.message
				console.log(errorCode, errorMessage)
				// ..
			})
	}

	return (
		<Style>
			<br />
			<br />
			<br />
			<br />
			<br />
			<Form
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 24 }}
				initialValues={{ remember: true }}
				onFinish={onSubmit}
				autoComplete="off"
			>
				<h1>Signup</h1>

				<Form.Item
					name="email"
					rules={[
						{
							required: true,
							message: 'Please enter an email!',
						},
					]}
				>
					<Input type="email" autoComplete="off" />
				</Form.Item>

				<Form.Item
					name="password"
					rules={[
						{
							required: true,
							message: 'Please add a password!',
						},
					]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 0, span: 16 }}>
					<Button type="primary" htmlType="submit">
						Create account
					</Button>
				</Form.Item>
			</Form>
		</Style>
	)
}

const Style = styled.section`
	form {
		margin: auto;
		max-width: 20rem;
	}
`
