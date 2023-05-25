import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const UpdateNote = () => {
	const [input, setUInput] = useState({
		title: "",
		content: "",
	})
	// const [data, setData] = useState([])

	const { id } = useParams()
	const navigate = useNavigate()

	function handleChange(e) {
		const { name, value } = e.target

		setUInput((prevInput) => {
			return {
				...prevInput,
				[name]: value,
			}
		})
	}

	const handleClick = async (e) => {
		e.preventDefault()
		const newNote = {
			name: input.title,
			email: input.content,
			age: "25",
		}
		console.log(newNote)
		const response = await fetch(`http://localhost:5000/userupdate/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newNote),
		})
		const result = await response.json()
		if (!response.ok) {
			console.log(result.error)
		}
		if (response.ok) {
			console.log("updated", result)
			navigate("/notes")
		}
	}

	async function getSingleNote() {
		const response = await fetch(`http://localhost:5000/users/${id}`)
		const result = await response.json()
		if (!response.ok) {
			console.log(result.error)
		}
		if (response.ok) {
			console.log("updated =", result)
			// setData(result)
			setUInput({ title: result.name, content: result.email })
		}
	}

	useEffect(() => {
		getSingleNote()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className='container'>
			<h1>Edit Note</h1>
			<form>
				<div className='form-group' style={{ marginBottom: "10px" }}>
					<input onChange={handleChange} value={input.title} name='title' autoComplete='off' className='form-control' placeholder='add title'></input>
				</div>
				<div className='form-group' style={{ marginBottom: "10px" }}>
					<textarea
						onChange={handleChange}
						value={input.content}
						name='content'
						autoComplete='off'
						className='form-control'
						placeholder='add content'
						style={{ height: "12rem" }}
					></textarea>
				</div>
				<button onClick={handleClick} className='btn btn-lg btn-info'>
					UPDATE NOTE
				</button>
			</form>
		</div>
	)
}

export default UpdateNote
