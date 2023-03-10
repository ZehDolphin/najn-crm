import React, { useState } from 'react'
import 'antd/dist/reset.css'
import './style.scss'

import Customers from './screens/Customers/Customers'
import {
	Route,
	BrowserRouter as Router,
	Routes,
	RouteProps,
} from 'react-router-dom'
import Signup from './screens/Signup'
import Login from './screens/Login'
import UserProvider from './lib/auth/UserProvider'
import Dashboard from './screens/Dashboard'
import { Layout } from './layout/Layout'
import Customer from './screens/Customers/Customer'

function App() {
	const [user, setUser] = useState()

	return (
		<Router>
			<UserProvider onUserChange={setUser}>
				<Layout>
					<Routes>
						<Route path="/login" element={<Login />} />
						{user && (
							<>
								<Route path="/" element={<Dashboard />} />
								<Route
									path="/customers"
									element={<Customers />}
								/>
								<Route
									path="/customers/:id"
									element={<Customer />}
								/>
							</>
						)}
					</Routes>
				</Layout>
			</UserProvider>
		</Router>
	)
}

export default App
