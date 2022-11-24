import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { message, Space, Table, TableColumnsType } from 'antd'

export interface Todo {
	id: string
	added: any
	todo: string
}

const deleteTodo = async (id: string) => {
	await deleteDoc(doc(db, 'todos', id))
	// message.info('Todo was deleted!')
}

const columns: TableColumnsType<Todo> = [
	{
		title: 'Todo',
		dataIndex: 'todo',
		key: 'todo',
		render: (text) => <div>{text}</div>,
	},
	{
		title: 'Author',
		dataIndex: 'user',
		key: 'user',
		render: (text) => <div>{text.split('@')[0]}</div>,
	},
	{
		title: 'Time',
		dataIndex: 'added',
		key: 'added',
		render: (text) => (
			<div>
				{new Date(text.seconds * 1000 + text.nanoseconds / 1000)
					.toString()
					.substring(4, 24)}
			</div>
		),
	},
]

const TodosTable = ({}) => {
	const [todos, setTodos] = useState([])

	useEffect(() => {
		const unsub = onSnapshot(collection(db, 'todos'), (snap) => {
			setTodos(
				snap.docs
					.map((doc) => ({
						...doc.data(),
						id: doc.id,
					}))
					.sort((a: any, b: any) => b.added - a.added)
			)
		})

		return () => unsub()
	}, [])

	return (
		<Style>
			<Table columns={columns} dataSource={todos} pagination={false} />
		</Style>
	)
}

const Style = styled.div``

TodosTable.propTypes = {}

export { TodosTable }
