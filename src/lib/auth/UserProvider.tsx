import { onAuthStateChanged, User } from 'firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'

const context = createContext<{
	user?: User
}>(null)

export default function UserProvider({
	children,
	onUserChange,
}: {
	children: any
	onUserChange?: Function
}) {
	const [user, setUser] = useState<User>()
	const navigate = useNavigate()

	useEffect(() => {
		onUserChange && onUserChange(user)
	}, [user])

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user)
			} else {
				setUser(undefined)
				navigate('/login')
			}
		})
	}, [])

	return (
		<context.Provider
			value={{
				user,
			}}
		>
			{children}
		</context.Provider>
	)
}

export function useUser() {
	let { user } = useContext(context)
	return user
}
