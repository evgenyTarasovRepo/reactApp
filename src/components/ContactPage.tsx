import React, {  useEffect, useState } from "react";
import api from "../utils/api";
import {ContactTemplate} from '../models/models'
import { Button, Container } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";

export default function ContactPage() {
    let {contactId} = useParams();
    const navigate = useNavigate();
    const [contact, setContact] = useState<ContactTemplate>({
        id: 0,
        name: '',
        lastName: ''
    });

    const goBack = () => {navigate(-1)};

    const getContact =  async (id:number) => {
       const c = await api.getContactById(id);
       setContact(c);
       
    }

    useEffect(() => {
         getContact(Number(contactId));
         console.log(contactId);
    }, [contactId]);
   
    return (
        <Container sx={{minHeight: 500, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Container>
                <Button variant="contained" onClick={goBack}>Go Back</Button>
                <Card sx={{maxWidth: 400, ml: 45}}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image={`https://loremflickr.com/320/240/robot?userId=${contact.id}`}
                            alt={contact.name}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {contact.name} {contact.lastName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
                </Container>
        </Container>
    );
}

