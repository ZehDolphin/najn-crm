import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { AutoComplete } from 'antd'
import {
	EniroCompany,
	getCompanyByName,
	search,
} from '../../lib/companies/TemporaryCompany'

interface Params {
	onSelect?: (company: EniroCompany) => void
	onChange?: (companyName: string) => void
	onFailedSearch?: () => void
	value?: string
}

const NewCustomerSearchField = ({
	onSelect,
	onChange,
	onFailedSearch,
	value,
}: Params) => {
	const [_value, setValue] = useState(value || '')
	const [options, setOptions] = useState<{ value: string }[]>([])

	useEffect(() => {
		setValue(value)
		onSearch(value)
	}, [value])

	const onSearch = async (searchText: string) => {
		try {
			if (!searchText) return setOptions([])
			let companies = await search(searchText)
			setOptions(
				companies.map((company: any) => ({ value: company.name }))
			)
		} catch (e) {
			setOptions([])
			onFailedSearch()
		}
	}

	const _onSelect = async (companyName: string) => {
		if (onSelect == undefined) return
		let company = await getCompanyByName(companyName)
		onSelect(company)
	}

	const _onChange = (data: string) => {
		setValue(data)
		if (onChange == undefined) return
		onChange(data)
	}

	return (
		<AutoComplete
			value={_value}
			options={options}
			onSelect={_onSelect}
			onSearch={onSearch}
			onChange={_onChange}
			placeholder="Company Name"
		/>
	)
}

NewCustomerSearchField.propTypes = {}

export { NewCustomerSearchField }
