import {Routes, Route, Link, Outlet} from 'react-router-dom';
import ContactPage from '../components/ContactPage';
import EditContact from '../components/EditContact';
import Page from '../components/Page';
import Layout from './Layout';

function Navigation(){
    return(
        
        <div>
            <Routes> 
                <Route path='/' element={<Page/>}/>   
                <Route path="contacts/:contactId" element={<ContactPage/>}/>
                <Route path="contacts/:contactId/edit" element={<EditContact/>}/>
            </Routes>
        </div>
        
        
    );
};

export default Navigation;