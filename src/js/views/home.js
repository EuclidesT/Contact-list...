import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";
import ContactCard from "../component/contactCard";
import { Context } from "../store/appContext";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	useEffect(() => {
		actions.loadContacts();
	}, []);

	const handleEdit = (id) => {
		// Redirige al usuario a la página de edición del contacto
		navigate(`/edit-contact/${id}`);
	};

	const handleDelete = (id) => {
		actions.deleteContact(id);
	};

	const handleAddContact = () => {
		// Redirige a la vista de crear un nuevo contacto
		navigate("/add-contact");
	};

	return (
		<div className="text-center mt-5">
			<div className="container">
				{/* Botón para redirigir a la página de agregar contacto */}
				{/* <button className="btn btn-primary mb-4" onClick={handleAddContact}>
					Add New Contact
				</button> */}

				{store.contactList.length > 0 ? (
					store.contactList.map((item) => {
						return (
							<div key={item.id} className="contact-card-container">
								{/* Mostrar cada tarjeta de contacto */}
								<ContactCard
									key={item.id}
									imagen={item.imagen}
									fullName={item.name}
									address={item.address}
									phone={item.phone}
									email={item.email}
									onEdit={() => handleEdit(item.id)}
									onDelete={() => handleDelete(item.id)}
								/>

								{/* Botones de Editar y Eliminar */}
								<div className="contact-actions">
									<button
										className="btn btn-warning"
										onClick={() => handleEdit(item.id)} // Llama a handleEdit con el id
									>
										Edit
									</button>
									<button
										className="btn btn-danger"
										onClick={() => handleDelete(item.id)}
									>
										Delete
									</button>
								</div>
							</div>
						);
					})
				) : (
					<p>No contacts available.</p>
				)}
			</div>
		</div>
	);
};