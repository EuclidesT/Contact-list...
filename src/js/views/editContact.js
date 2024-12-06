import React, { useState, useContext, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const EditContact = () => {
    const { id } = useParams();
    const { store, actions } = useContext(Context);
    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); // Hook para navegación

    useEffect(() => {
        const contactToEdit = store.contactList.find(contact => contact.id === parseInt(id));
        if (contactToEdit) {
            setContact(contactToEdit);
        }
    }, [id, store.contactList]);

    const validate = () => {
        let tempErrors = {};
        tempErrors.name = contact.name ? "" : "This field is required.";
        tempErrors.email = contact.email ? "" : "This field is required.";
        tempErrors.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contact.email) ? "" : "Email is not valid.";
        tempErrors.phone = contact.phone ? "" : "This field is required.";
        tempErrors.address = contact.address ? "" : "This field is required.";
        setErrors(tempErrors);
        return Object.values(tempErrors).every(x => x === "");
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setContact({ ...contact, [name]: value });
    };

    const handleSubmit = async () => {
        if (validate()) {
            // Actualiza el contacto
            await actions.updateContact(id, contact.name, contact.email, contact.phone, contact.address);

            // Redirige al Home después de guardar
            navigate("/");  // Redirige al home después de guardar los cambios

        }
    };

    return (
        <div className="container justify-content-center">
            <h1>Edit Contact</h1>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Full Name</span>
                <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={handleChange}
                    value={contact.name}
                    placeholder="Add Full Name"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                />
                {errors.name && <p className="text-danger">{errors.name}</p>}
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Email</span>
                <input
                    type="email"
                    className="form-control"
                    name="email"
                    onChange={handleChange}
                    value={contact.email}
                    placeholder="Add Email Address"
                    aria-label="Email"
                    aria-describedby="basic-addon1"
                />
                {errors.email && <p className="text-danger">{errors.email}</p>}
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Phone</span>
                <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    onChange={handleChange}
                    value={contact.phone}
                    placeholder="Add Phone Number"
                    aria-label="Phone"
                    aria-describedby="basic-addon1"
                />
                {errors.phone && <p className="text-danger">{errors.phone}</p>}
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Address</span>
                <input
                    type="text"
                    className="form-control"
                    name="address"
                    onChange={handleChange}
                    value={contact.address}
                    placeholder="Add Home Address"
                    aria-label="Address"
                    aria-describedby="basic-addon1"
                />
                {errors.address && <p className="text-danger">{errors.address}</p>}
            </div>
            <div className="button-group">
                <button className="btn btn-success" onClick={handleSubmit}>
                    Guardar Cambios
                </button>
                <Link to="/" className="btn btn-secondary mt-3">
                    <span>Ver Contactos</span>
                </Link>
            </div>    
        </div>
    );
};

export default EditContact;