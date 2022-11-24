import { Button } from 'antd'
import { onAuthStateChanged, signOut, User } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TodoInput } from '../components/TodoInput'
import { TodosTable } from '../components/TodosTable'
import { auth } from '../firebase'
import { useUser } from '../lib/auth/UserProvider'

export default function Todos() {
	const user = useUser()

	if (!user) return

	return (
		<>
			<h1>Welcome {user ? user.email : '- '}!</h1>
			<br />
			<TodoInput user={user} />
			<br />
			<TodosTable />
			<br />
			<br />
			<Button danger={true} onClick={() => signOut(auth)}>
				Logout
			</Button>
		</>
	)
}
