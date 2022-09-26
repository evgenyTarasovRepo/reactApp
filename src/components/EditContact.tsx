import { Button, Container, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { AddContactTemplate } from "../models/models";
import api from "../utils/api";

export default function EditContact() {
    const {contactId} = useParams();
    const navigate = useNavigate();
    const [id, setId] = useState<number>(Number(contactId));
    const[contactForUpdate, setContactForUpdate] = useState<AddContactTemplate>({
        name: '',
        lastName: ''
      });
      

    const goBack = () => {navigate(-1)};  

    const getContactForUpdate = async (evt: any) => {
    
        const c: AddContactTemplate | undefined = await api.getContactById(id);
        
        if(c !== undefined) {
          setContactForUpdate({
            name: c.name,
            lastName: c.lastName
          });
        }
      };

      const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setContactForUpdate((oldValues) => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }))
        
    }, []);

      const editContact = async() => {
        await api.editContact(id, contactForUpdate);
        setContactForUpdate({
          name: '',
          lastName: ''
        });
      }
     
      useEffect(()=>{
        getContactForUpdate(id);
      }, [contactId]);

    return(
        <Container sx={{minHeight: 400, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
           
            <Container sx={{width: 800, display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                <Button variant="contained" onClick={goBack}>Go Back</Button>
                <TextField id="outlined-basic" label="Name" variant="outlined" value={contactForUpdate.name} onChange={onChange} type="text"  name="name"/>
                <TextField  id="filled-basic" label="Last name" variant="filled" value={contactForUpdate.lastName} onChange={onChange} type="text"   name="lastName"/>
                <Button sx={{ width: 150, height: 40 }} onClick={editContact} variant="contained" color="success" component={Link} to='/'>Update</Button>
            </Container>
        </Container>
    );
}