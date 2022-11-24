import React, { ReactNode } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ScreenHeader = ({ children }: { children: ReactNode }) => {
	return <Style>{children}</Style>
}

const Style = styled.div`
	display: flex;
	align-items: center;
	min-height: 40px;

	* {
		margin: 0;
	}
`

export { ScreenHeader }
