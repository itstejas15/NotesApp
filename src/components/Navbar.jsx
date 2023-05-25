import { Link } from "react-router-dom"
import React from "react"
import "./Navbar.css"
function Navbar() {
	return (
		<nav className='navbar bg-dark container'>
			<h4>
				<Link to='/notes' className="link mx-4">Notes</Link>Notes
			</h4>
			<h4>
				<Link to='/create' className="link">Create Note</Link>Create Note
			</h4>
			<h4>
				<Link to='/' className="link mx-4">Home</Link>
			</h4>
		</nav>
	)
}

export default Navbar;
