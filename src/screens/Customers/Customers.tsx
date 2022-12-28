import { Button } from 'antd'
import React from 'react'
import styled from 'styled-components'
import AddCustomerButton from '../../components/customers/AddCustomerButton'
import { ScreenHeader } from '../../layout/ScreenHeader'

export default function Customers() {
	return (
		<>
			<ScreenHeader>
				<h1>Customers</h1>
				<div className="spacer fill"></div>
				<AddCustomerButton />
			</ScreenHeader>
		</>
	)
}
