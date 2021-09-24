import React, { useState }  from 'react';
import {Link} from "react-router-dom";
import {AiOutlineClose, FaBars} from "react-icons/all";
import { NavbarItems} from "./Navitem";
import './Navbar.css';
import { IconContext } from 'react-icons'

export default function DrawerMenu(){

    let [visible, setVisible] = useState(false);

    const showSidebar = () => setVisible(!visible);

    return(
        <>
          <IconContext.Provider value={{color: '#fff'}}>
            <div className="navbar">
                <Link to='#' className = 'menu-bars'>
                    < FaBars onClick={showSidebar} />
                </Link>
            </div>
            <nav className={visible ? 'nav-menu active' : 'nav-menu'} >
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className="navbar-toggle">
                        <Link to="#" className='menu-bars'>
                            <AiOutlineClose />
                        </Link>
                    </li>
                    {NavbarItems.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.url}>
                                    {item.icon}
                                  <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
          </IconContext.Provider>
        </>
    )
}
