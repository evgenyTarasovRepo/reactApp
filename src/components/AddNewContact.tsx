import { useState, useCallback } from "react";
import { AddContactTemplate } from "../models/models";
import TextField from '@mui/material/TextField'; 
import Button from '@mui/material/Button';
import { Container, Alert } from "@mui/material";



interface AddNewContactProps {
    onSubmitContact: (contact: AddContactTemplate) => Promise<void>,
}

function AddNewContact({onSubmitContact}:AddNewContactProps){
    const[values, setValues] = useState<AddContactTemplate>({
        name: '',
        lastName: '',
    });
    const[isAlert, setAlert] = useState(false);

    const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setValues((oldValues) => ({
            ...oldValues,
            [event.target.name]: event.target.value,
        }))
        
    }, []);

    const onSubmit = async () => {
        if(values.name !== '' && values.lastName !== '') {
            await onSubmitContact(values);
            setAlert(false);
        } else{ 
            setAlert(true);
        }
       
        setValues({
            name: '',
            lastName: '',
           });
       
    };
    
    return(
        
        <div className="addContactForm">
            <Container>{isAlert && <Alert onClose={() => setAlert(false)} severity="info" >Name and LastName cannot be an empty!</Alert>}</Container>
            <Container sx={{mt: 1}}>  
                <TextField id="outlined-basic" label="Name" variant="outlined" value={values.name} type="text" onChange={onChange} name="name"/>
                <TextField sx={{marginLeft: 1}} id="filled-basic" label="Last name" variant="filled" value={values.lastName} type="text" onChange={onChange}  name="lastName"/>
                <Button sx={{ ml: 1,  mt: 1,  width: 150, height: 40 }} variant="contained" color="success" onClick={onSubmit}>Add contact</Button>
            </Container>
        </div>
    );
};



  export default AddNewContact;