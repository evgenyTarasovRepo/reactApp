import { AddContactTemplate, ContactTemplate } from "../models/models";



const API_URL = 'http://localhost:3004';

const getContacts = async (
  search: string, page: number
): Promise<[ContactTemplate[] | undefined, number | undefined]> => {
  let response = null;
    try{
        if(search === '') {
           response = await fetch(`${API_URL}/contacts/?_page=${page}&_limit=5`);
        } else {
           response = await fetch(`${API_URL}/contacts/?name=${search}&_page=${page}&_limit=5`);
        }
        
        if(!response.ok) throw Error('Data was not recieved!');
        const contactList = await response.json();
        
        return [contactList, Number(response.headers.get('X-Total-Count'))];
      } catch (error) {
        throw(error)
      }
};

const addContact = async (contact: AddContactTemplate): Promise<ContactTemplate | undefined> => {
  try{
      const response = await fetch(`${API_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contact)
      });

      if(!response.ok) throw Error('Error while processing');

      const contactResponse = await response.json();
      return contactResponse;
    } catch (error) {
      console.error(error);
    }
};

const editContact = async(id: number, contact: AddContactTemplate): Promise<ContactTemplate | undefined> => {
  try {
    const response = await fetch(`${API_URL}/contacts/${id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(contact)
    }); 
    
    if(!response.ok) throw Error('Error while processing');

    const contactResponse = await response.json();
    return contactResponse;
  } catch(error) {

  }
}

const removeContactById = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/contacts/${id}`, {
      method: 'DELETE'
    });
    
    if(!response.ok) throw Error('Error while processing');

  } catch(error) {
    console.error(error);
  }
};

const getContactById = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/contacts/${id}`, {
      method: 'GET'
    });

    if(!response.ok) throw Error('Error while processing');

    const contactResponse = await response.json();
    return contactResponse;
  } catch (error) {
    console.error(error);
  };
};

const searchContact = async(name: string) => {
  try {
    const response = await fetch(`${API_URL}/contacts?name=${name}`, {
      method: 'GET'
    });

    if(!response.ok) throw Error('Error while searching!');

    const contactResponse = await response.json();
    
    return contactResponse;
  } catch(error) {
    console.error(error);
  }
};

const getPages = async(page: number, limit: number) => {
  try {
    const response = await fetch(`${API_URL}/contacts?_page=${page}&_limit=${limit}`, {
      method: 'GET'
    });

    if(!response.ok) throw Error('Error while getting paginate!');

    const contactResponse = await response.json();
    return contactResponse;
  } catch(error) {
    console.error(error);
  }
};

const api = {
    // getAllContacts,
    getContacts,
    addContact,
    removeContactById,
    getContactById,
    editContact,
    searchContact,
    getPages
};

export default api;



// const data: Object = getData();
// console.log(data);