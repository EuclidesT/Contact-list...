import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";


const NewContact = () => {

    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });
    const { store, actions } = useContext(Context);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setContact({ ...contact, [name]: value });
    };

    return (
        <div className="container justify-content-center">
            <h1> Add a new Contact</h1>
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
            </div>

            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">Phone</span>
                <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    onChange={handleChange}
                    value={contact.phone}
                    placeholder="Add Phone Address"
                    aria-label="Phone"
                    aria-describedby="basic-addon1"
                />
            </div>

            <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">address</span>
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
            </div>
            <div className="button-group">
                <button className="btn btn-success"
                    onClick={() => {
                        console.log(contact)
                        actions.saveContact(contact.name, contact.email, contact.phone, contact.address);
                    }}
                >
                    Guardar Contacto
                </button>

                <Link to="/" className="btn btn-secondary mt-3">
                    Ver Contactos
                </Link>
            </div>
        </div>
    );
};

export default NewContact;