import React from 'react';
import { NavLink } from 'react-router-dom'

const LogoutContainer = (props) => {
    return (
        <ul className="logout-details">
            <li>
                <NavLink to="/admin" className="first-atag" onClick={props.showLogout}>
                    <i class="uil uil-home"></i>
                    <span>Admin</span>
                </NavLink>
            </li>
            <li>
                <NavLink to="/userprofile" className="first-atag" onClick={props.showLogout}>
                    <i class="uil uil-user"></i>
                    <span>Profile</span>
                </NavLink>
            </li>
            <li>                               
                <a href="#" className="last-atag" onClick={props.showLogout}>
                    <i class="uil uil-signout"></i>
                    <span>Logout</span>
                </a>
            </li>
        </ul>
    )
}

export default LogoutContainer;