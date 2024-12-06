import React from "react";
import PropTypes from "prop-types";


const ContactCard = ({ imagen, fullName, address, phone, email, onEdit, onDelete }) => {
    return (
        <div className="contact-card container border-2 d-flex gap-3 justify-content-between aling-items-center">
            <div className="contact-image-container">
                <img src={imagen || "https://raw.githubusercontent.com/EuclidesT/Contact-list.../refs/heads/master/Chica.jpg"} alt="Contact avatar" className="contact-image" />
            </div>
            <div>
                <p>{fullName}</p>
                <p>{address}</p>
                <p>{phone}</p>
                <p>{email}</p>
            </div>
        </div>
    );
};

// Validación de props 

ContactCard.propTypes = {
    imagen: PropTypes.string,
    fullName: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default ContactCard;