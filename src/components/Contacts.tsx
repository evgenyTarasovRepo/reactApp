import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ContactTemplate, AddContactTemplate } from '../models/models';
import api from '../utils/api';
import {
   TableContainer, 
   Table,
   TableHead, 
   TableBody, 
   TableRow, 
   TableCell, 
   Paper, 
   TextField,
   createTheme,
   Container,
   Dialog,
   DialogTitle,
   DialogContent,
   DialogContentText,
   DialogActions,
   Pagination,
   } from '@mui/material';
import Button from '@mui/material/Button';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { green, lightBlue } from '@mui/material/colors';


interface ContactsProps{
  contacts: ContactTemplate[],
  onRemoveContact: (id:number)=> void,
  fetchAllPaginateContacts: (search: string, page: number) => Promise<[ContactTemplate[] | undefined, number | undefined]>
  // onSearchContact: (name:string) => Promise<void>
  // onPaginate: (page: number, limit: number) => Promise<ContactTemplate[]>
}

function Contacts({
  contacts,
  onRemoveContact,
  fetchAllPaginateContacts
  // onSearchContact,
  // onPaginate
}:ContactsProps){

  const[openDialog, setOppenDialog] = useState <boolean>(false);
  const[idToRemove, setIdToRemove] = useState<number>(0);
  const[query, setQuery] = useState<string>('');
  const[page, setPage] = useState<number>(1);
  const[pageQty, setPagQty] = useState<number> (Math.ceil(0));
  
  
  // const[searchParams, setSearchParams] = useSearchParams({});
  // const contactQueryName = searchParams.get('name') || '';

  const handleOnSearchChange = async (evt:any) => {
    // let searchValue:string = evt.target.value;
    // setQuery(searchValue);
    // console.log(query)
    // let res = await fetchAllContacts(searchValue, page);
    // pageQty = Math.ceil(Number(res[1]) / 5);
    // console.log(page);
    // setSearchParams({name: searchValue});
    
    // if(searchValue === '') await onSearchContact(contactQueryName);
    
    // await onSearchContact(contactQueryName);
   };

  // const handleSearchBtn = async () => {
  //   await onSearchContact(contactQueryName);
  // };
  //: React.ChangeEvent<HTMLInputElement>

  const onSubmit = async (evt:any) => {
    await onRemoveContact(idToRemove);
    setOppenDialog(false); 
  };

  const dialogOpen = (evt:any) => {
    const curId = evt.target.getAttribute('data-id');
    setIdToRemove(Number(curId));
    setOppenDialog(true);
  };

  const dialogClose = () => {
    setOppenDialog(false);
  };


  useEffect(() => {
    async function getContacts() {
      let res = await fetchAllPaginateContacts(query, page);
      setPagQty(Math.ceil(Number(res[1]) / 5));
    }
    getContacts();
  }, [page, query]);

  return(
    <div>
      <Container>
        <Container>
          <TextField 
          id="outlined-search" 
          label="Search field"  type="search" name="search"  
          onChange={(evt:any) => {setQuery(evt.target.value)}}/>
        </Container>
        

        <TableContainer component={Paper} sx={{height: 405}}>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell sx={{fontWeight: 'bold', fontSize: 20}} >ID</TableCell>
                <TableCell sx={{fontWeight: 'bold', fontSize: 20}} >Name</TableCell>
                <TableCell sx={{fontWeight: 'bold', fontSize: 20}} align='center'>Last name</TableCell>
                <TableCell sx={{fontWeight: 'bold', fontSize: 20}} align='right'>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map(contact => (
                <TableRow key={contact.id} sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                  <TableCell width='100px'><Link to={`/contacts/${contact.id}`}>{contact.id}</Link></TableCell>
                  <TableCell width='100px'>{contact.name}</TableCell>
                  <TableCell width='100px' align='center'>{contact.lastName}</TableCell>
                  <TableCell width='10px'><Button sx={{width: 90}} variant="contained" color="primary" onClick={dialogOpen} data-id={contact.id}>Remove</Button></TableCell>
                  <TableCell width='10px'><Button sx={{width: 90}} variant="contained" color="primary" component={Link} to={`/contacts/${contact.id}/edit`}>Edit</Button></TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
           
          </Table>
          
        </TableContainer>
        <Pagination page={page} onChange={(_, num) =>{setPage(num)}} sx={{ml: 50, mt: 2}} count={pageQty} variant="outlined" shape="rounded" />
        <Dialog
        open={openDialog}
        onClose={dialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Remove"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to permanently remove this contact?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={dialogClose}>Disagree</Button>
          <Button onClick={onSubmit} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
        
      </Container>
    </div>
  );

  };

export default Contacts;