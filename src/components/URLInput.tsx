import React, { useEffect, useState } from 'react'
import { Cascader, Input, Select, Space } from 'antd'
const { Option } = Select

export default function URLInput({
	url,
	onChange,
}: {
	url: string | undefined
	onChange?: (url: string) => void
}) {
	let _url: URL | undefined = undefined
	try {
		_url = new URL(url)
	} catch (e) {}

	const [protocol, setProtocol] = useState((_url?.protocol || 'http:') + '//')
	const [host, setHost] = useState(_url?.host || '')

	const _onChange = (protocol: string, host: string) => {
		setProtocol(protocol)
		setHost(host)
		onChange && onChange(`${protocol}${host}`)
	}

	useEffect(() => {
		setProtocol((_url?.protocol || 'http:') + '//')
		setHost(_url?.host || '')
	}, [_url])

	return (
		<Space direction="vertical">
			<Input
				addonBefore={
					<Select
						value={protocol}
						onChange={(e) => _onChange(e, host)}
					>
						<Option value="http://">http://</Option>
						<Option value="https://">https://</Option>
					</Select>
				}
				value={host}
				onChange={(e) => _onChange(protocol, e.target.value)}
			/>
		</Space>
	)
}
