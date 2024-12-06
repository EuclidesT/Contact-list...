import toast, { Toaster } from "react-hot-toast";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contactList: [],
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			updateContact: async (id, name, email, phone, address) => {
				const store = getStore(); // Usamos getStore para acceder al estado actual

				// Hacer una solicitud PUT a la API para actualizar el contacto en el servidor
				try { 
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/PedroG/contacts/${id}`, { 
						method: "PUT", 
						headers: { 
							"Content-Type": "application/json" 
						}, 
						body: JSON.stringify({ 
							name: name, 
							email: email, 
							phone: phone, 
							address: address 
						}) 
					}); 
					if (!response.ok) { 
						throw new Error("Network response was not ok"); 
					} 
					
					const data = await response.json(); 
					console.log("Contact updated successfully:", data); 
					
					// Actualizar el estado local con la lista de contactos modificada 
					const updatedContactList = store.contactList.map(contact => { 
						if (contact.id === parseInt(id)) { 
							return { 
								...contact, 
								name: name, 
								email: email, 
								phone: phone, 
								address: address 
							}; 
						} 
						return contact; 
					}); 
					
					setStore({ 
						...store, 
						contactList: updatedContactList 
					}); 
				} catch (error) { 
					console.error("There was a problem with the updateContact operation:", error); 
				} 
			},


			loadContacts: async () => {
				try {
					const response = await fetch("https://playground.4geeks.com/contact/agendas/PedroG", {
						method: "GET"
					});
					if (!response.ok) {
						throw new Error('Failed to load contacts');
					}
					const data = await response.json();
					setStore({ contactList: data.contacts });
				} catch (error) {
					toast.error("Error loanding contacts");
					console.error('Error loanding contacts:', error);
				}
			},
			// Guarda un nuevo contacto en la API
			saveContact: async (name, email, phone, address) => {
				try {
					const response = await fetch("https://playground.4geeks.com/contact/agendas/PedroG/contacts", {
						method: "POST",
						headers: {
							"Content-Type": "application/json"
						},
						body: JSON.stringify({
							name: name,
							email: email,
							phone: phone,
							address: address
						})
					});

					if (!response.ok) {
						throw new Error('Failed to save contact');
					}
					const data = await response.json();
					getActions().loadContacts();
					toast.success("Contacto Guardado");
				} catch (error) {
					toast.error("Contacto No Guardado");
					console.error('Error saving contact:', error);
				}
			},

			// Elimina un Contacto
			deleteContact: async (id) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/PedroG/contacts/${id}`, {
						method: "DELETE"
					});
					if (!response.ok) {
						throw new Error('Failed to delete contact');
					}
					getActions().loadContacts();
					toast.success("Contacto Eliminado");
				} catch (error) {
					toast.error("Contacto No Eliminado");
					console.error('Error deleting contact:', error);
				}
			},

			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},

			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
