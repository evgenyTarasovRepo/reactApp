import { useCallback, useEffect, useState } from "react";
import { ContactTemplate, AddContactTemplate } from "../models/models";
import api from "../utils/api";
import AddNewContact from "./AddNewContact";
import Contacts from "./Contacts";


function Page(){
    const[contacts, setContacts] = useState<any>([]);
    
    
    const onRemoveContact = useCallback(async (id: number)=>{
        await api.removeContactById(id);
        setContacts((oldContacts:any[]) => oldContacts.filter((old) => old.id !== id));
    }, []);
    
    const onSubmitContact = useCallback(async (contact: AddContactTemplate)=>{
        const c = await api.addContact(contact);
        if (c !== undefined) {
            setContacts((oldContacts: any[]) => oldContacts.concat([c]));
        }
    }, []);

    // const onSearchContact = async (name: string) => {
    //     const result:ContactTemplate[] = await api.searchContact(name);
    //     if (result.length === 0) {
    //         // fetchAllContacts();
    //     }
    //     setContacts(result);
    // };

    const fetchAllPaginateContacts = async (name: string, page:number) => {
        const allContacts = await api.getContacts(name, page);
        
        if(allContacts !== undefined) {
            setContacts(allContacts[0]);
        }
        return allContacts;
    };
  

    return(
        <div> 
            <Contacts contacts={contacts} onRemoveContact={onRemoveContact} fetchAllPaginateContacts={fetchAllPaginateContacts} />
            <AddNewContact onSubmitContact={onSubmitContact}/>
        </div>
    );
};
//onSearchContact={onSearchContact} onPaginate={onPaginate}

export default Page;
