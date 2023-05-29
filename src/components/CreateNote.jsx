import { useState } from "react"
import { useNavigate } from "react-router-dom"

function CreateNote() {
	const [input, setInput] = useState({
		title: "",
		content: "",
	})
	const navigate = useNavigate()
	const [error, setError] = useState("")

	function handleChange(e) {
		const { name, value } = e.target

		setInput((prevInput) => {
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
			setError("Please fill both: title and content")
		} else {
			const newNote = {
				title: input.title,
				content: input.content,
			}
			const response = await fetch("https://notes-app-backend-black.vercel.app/user", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newNote),
			})
			const result = await response.json()
			if (response.ok) {
				navigate("/notes")
			} else {
				console.log(result)
				setError(result.error)
			}
		}
	}

	return (
		<div className='container'>
			<h1>Create Notes</h1>
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
					ADD NOTE
				</button>
			</form>
		</div>
	)
}

export default CreateNote
