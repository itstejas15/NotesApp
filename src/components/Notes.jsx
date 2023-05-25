import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Notes() {
	const [data, setData] = useState([])
	async function getData() {
		const response = await fetch("http://localhost:5000/users")
		const result = await response.json()
		if (!response.ok) {
			console.log(result.error)
		}
		if (response.ok) {
			setData(result)
		}
	}
	useEffect(() => {
		getData()
	}, [])

	async function handleDelete(id) {
		const response = await fetch(`http://localhost:5000/userdelete/${id}`, {
			method: "DELETE",
		})
		const result1 = await response.json()
		if (!response.ok) {
			console.log(result1.error)
		}
		if (response.ok) {
			console.log("deleted", response.ok)
			setTimeout(() => {
				getData()
			}, 100)
		}
	}

	return (
		<div className='container' style={{ padding: "15px" }}>
			<div className='row gap-3 ms-xl-5'>
				{data?.map((ele) => (
					<div key={ele._id} className='col-10 col-md-5 col-xl-3 mb-3 mb-sm-0'>
						<div className='card'>
							<div className='card-body'>
								<h5 className='card-title'>
									{/* Note title */}
									{ele?.title}
								</h5>
								<p className='card-text'>
									{/* Some quick example text to build on the card title and make up the bulk of the card's content. */}
									{ele?.content}
								</p>
								<Link to='#' className='card-link btn btn-danger btn-sm' onClick={() => handleDelete(ele?._id)}>
									Delete
								</Link>
								<Link to={`/update/${ele._id}`} className='card-link btn btn-info btn-sm'>
									Edit
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Notes
