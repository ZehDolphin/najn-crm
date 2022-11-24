import React from 'react'
import 'antd/dist/reset.css'

import Todos from './screens/Todos'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Signup from './screens/Signup'
import Login from './screens/Login'
import UserProvider from './lib/auth/UserProvider'

function App() {
	return (
		<Router>
			<UserProvider>
				<div
					style={{
						margin: 'auto',
						maxWidth: 1000,
						padding: '1rem 2rem',
					}}
				>
					<Routes>
						<Route path="/signup" element={<Signup />} />
						<Route path="/login" element={<Login />} />
						<Route path="/" element={<Todos />} />
					</Routes>
				</div>
			</UserProvider>
		</Router>
	)
}

export default App
