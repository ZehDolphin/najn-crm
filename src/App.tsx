import React from 'react'
import 'antd/dist/reset.css'

import Customers from './screens/Customers'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Signup from './screens/Signup'
import Login from './screens/Login'
import UserProvider from './lib/auth/UserProvider'
import Dashboard from './screens/Dashboard'

function App() {
	return (
		<Router>
			<UserProvider>
				<Routes>
					<Route path="/signup" element={<Signup />} />
					<Route path="/login" element={<Login />} />
					<Route path="/" element={<Dashboard />} />
					<Route path="/customers" element={<Customers />} />
				</Routes>
			</UserProvider>
		</Router>
	)
}

export default App
