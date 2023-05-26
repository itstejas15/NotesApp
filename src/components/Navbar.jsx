import { Link } from "react-router-dom"
import React from "react"
import "./Navbar.css"
function Navbar() {
	return (
		<nav className='navbar bg-dark container'>
			<h4>
				<Link to='/notes' className='link mx-sm-4 some-class'>
					All Notes
				</Link>
			</h4>
			<h4>
				<Link to='/create' className='link some-class'>
					Create Notes
				</Link>
			</h4>
			<h4>
				<Link to='/' className='link mx-sm-4 some-class'>
					Home
				</Link>
			</h4>
		</nav>
	)
}

export default Navbar
