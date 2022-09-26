import React from 'react';
import { NavLink, Outlet} from "react-router-dom";


function Layout() {
    return(
        <div>
            <header>
                <NavLink to='/contacts'>Contacts</NavLink>
                {/* <NavLink to='/getContact'>Get contact</NavLink> */}
            </header>
            
            <Outlet/>

        </div>
    );
}

export default Layout;