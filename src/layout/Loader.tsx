import { Spin } from 'antd'
import React from 'react'

export default function Loader({ height }: { height?: number }) {
	return (
		<div
			style={{
				width: '100%',
				height: '100%',
				minHeight: height,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Spin size="large" />
		</div>
	)
}
