import {
	TeamOutlined,
	UserOutlined,
	DashboardOutlined,
} from '@ant-design/icons'
import { Button, MenuProps } from 'antd'

import React, { ReactNode, useState } from 'react'

import { Layout as AntdLayout, Menu } from 'antd'
import { HistoryRouterProps, useLocation, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useUser } from '../lib/auth/UserProvider'
import styled from 'styled-components'
const { Content, Sider } = AntdLayout

type MenuItem = Required<MenuProps>['items'][number]

const items: MenuItem[] = [
	{
		icon: <DashboardOutlined />,
		label: 'Dashboard',
		key: '/',
	},
	{
		icon: <TeamOutlined />,
		label: 'Customers',
		key: '/customers',
	},
]

const Layout = ({ children }: { children: ReactNode }) => {
	const [collapsed, setCollapsed] = useState(false)

	const navigate = useNavigate()
	const location = useLocation()

	const onSelect = (e: any) => {
		navigate(e.key)
	}

	const user = useUser()
	if (!user) return

	return (
		<Style style={{ minHeight: '100vh' }}>
			<Sider
				collapsible
				collapsed={collapsed}
				onCollapse={(value) => setCollapsed(value)}
			>
				<Menu
					theme="dark"
					selectedKeys={[location.pathname]}
					mode="inline"
					items={items}
					onSelect={onSelect}
				/>

				<div className="bottom">
					<Button onClick={() => signOut(auth)}>Logout</Button>
				</div>
			</Sider>
			<AntdLayout className="site-layout">
				<Content
					style={{
						margin: '0 16px',
						padding: 24,
						paddingTop: 36,
						minHeight: 360,
					}}
				>
					{children}
				</Content>
			</AntdLayout>
		</Style>
	)
}

const Style = styled(AntdLayout)`
	.ant-layout-sider-children {
		display: flex;
		flex-direction: column;

		.bottom {
			margin-top: auto;
			display: flex;
			flex-direction: column;
			padding: 4px;
		}
	}
`

export { Layout }
