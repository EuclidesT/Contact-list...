import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<div className="ml-auto">
				<Link to="/new-contact">
					<button className="btn btn-success">Add a new Contact</button>
				</Link>
			</div>
		</nav>
	);
};
