import { useState } from "react"
import { useNavigate } from "react-router-dom"

function CreateNote() {
	const [input, setUInput] = useState({
		title: "",
		content: "",
	})
	const navigate = useNavigate()
	const [error, setError] = useState("")

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
			setError("Please fill both: title and content")
		} else {
			const newNote = {
				title: input.title,
				content: input.content,
			}
			console.log(newNote)
			const response = await fetch("http://localhost:5000/user", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newNote),
			})
			const result = await response.json()
			if (!response.ok) {
				console.error(result.error)
				setError(result.error)
			}
			if (response.ok) {
				console.log(result)
				navigate("/notes")
				setError("")
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
