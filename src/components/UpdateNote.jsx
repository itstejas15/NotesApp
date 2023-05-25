import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const UpdateNote = () => {
	const [input, setUInput] = useState({
		title: "",
		content: "",
	})
	const [error, setError] = useState("")
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
		setError("")
	}

	const handleClick = async (e) => {
		e.preventDefault()
		if (!input.title || !input.content) {
			setError("title and content can not be empty")
		} else {
		const newNote = {
			title: input.title,
			content: input.content,
		}
		const response = await fetch(`http://localhost:5000/userupdate/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newNote),
		})
		const result = await response.json()
		if (!response.ok) {
			console.log(result)
			setError(result.error)
		}
		if (response.ok) {
			navigate("/notes")
			setError("")
		}
	}
	}

	async function getSingleNote() {
		const response = await fetch(`http://localhost:5000/users/${id}`)
		const result = await response.json()
		if (!response.ok) {
			setError(result.error)
		}
		if (response.ok) {
			setUInput({ title: result.title, content: result.content })
		}
	}

	useEffect(() => {
		getSingleNote()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className='container'>
			<h1>Edit Note</h1>
			{error && <div className='alert alert-danger'> {error} </div>}
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
