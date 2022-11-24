import { Button, Form, Input } from 'antd'
import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { auth } from '../firebase'
import { loginEmailAndPassword } from '../lib/auth/Login'

export default function Login() {
	const navigate = useNavigate()

	const onSubmit = (e: any) => {
		loginEmailAndPassword(e.email, e.password, () => {
			navigate('/')
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
				<h1>Login</h1>

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
						Login
					</Button>
				</Form.Item>
				<a onClick={() => navigate('/signup')}>Create an account</a>
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
