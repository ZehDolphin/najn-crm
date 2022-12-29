import {
	ClockCircleOutlined,
	CommentOutlined,
	SearchOutlined,
	SmileOutlined,
} from '@ant-design/icons'
import { Button, Card, Empty, Result, Timeline } from 'antd'
import React from 'react'
import styled from 'styled-components'
import Loader from '../../../layout/Loader'
import { Customer, useCustomerEvents } from '../../../lib/customers/Customers'
import { parseFirebaseDate, readableDate } from '../../../lib/util/Util'

export default function HistoryCard({ customer }: { customer: Customer }) {
	const events = useCustomerEvents(customer.id)
	// const events = false

	return (
		<Card>
			<h1>Activity</h1>

			{events && events.length == 0 && (
				<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
			)}

			{events && events.length != 0 && (
				<Style>
					<div className="spacer m"></div>

					{events.map((event) => {
						if (event.type == 'event') {
							return (
								<Timeline.Item>
									<div className="time">
										{readableDate(
											parseFirebaseDate(event.time)
										)}{' '}
										- {event.author_name}
									</div>
									<div className="content">
										{event.content}
									</div>
								</Timeline.Item>
							)
						}

						if (event.type == 'comment') {
							return (
								<Timeline.Item dot={<CommentOutlined />}>
									<div className="time">
										{readableDate(
											parseFirebaseDate(event.time)
										)}{' '}
										- {event.author_name}
									</div>
									<div className="content comment">
										{event.content}
									</div>
								</Timeline.Item>
							)
						}
					})}
				</Style>
			)}

			{!events && <Loader height={200} />}
		</Card>
	)
}

const Style = styled(Timeline)`
	/* max-height: 500px;
	overflow: auto;
	padding: 1rem; */

	.empty-line {
		height: 10px;
		position: relative;

		&:after {
			content: '';
			position: absolute;
			top: 0px;
			left: -1px;
			width: 2px;
			height: 10px;
			background: rgba(5, 5, 5, 0.06);
		}
	}
	.ant-timeline-item-content {
		.time {
			font-size: 12px;
			opacity: 0.75;
		}

		.comment {
			display: inline-block;
			background-color: #eee;
			padding: 0.5rem;
			border-radius: 5px;
		}
	}
`
