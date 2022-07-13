import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const SubMenu = ( {item} ) => {

    const [subnav, setSubnav] = useState(false)
    const showSubnav = () => setSubnav(!subnav)

    return (
        <li>
            <div className="icon-links">
                <a>
                    {item.icon}
                    <span className="link_name">{item.title}</span>
                </a>
                <div onClick={item.subNav && showSubnav} >
                    {item.subNav && subnav ? item.iconOpened : item.subNav ? item.iconClosed: null}
                </div>
            </div>
            <ul className="sub-menu">
                <li><a className="link_name" href="#">{item.title}</a></li>
                { subnav && item.subNav.map((item, index) => {
                    return (
                        <li key={index}><NavLink to={item.path} key={index}>{item.title}</NavLink></li>
                    )
                })}
            </ul>
        </li>
    );
}

export default SubMenu;