import React from 'react'
import { BiBarChartSquare, BiLogOut, BiNotepad } from "react-icons/all";

export const NavbarItems = [
    {
        title: 'To Do',
        url: '/',
        icon: <BiNotepad />,
        cName: 'nav-text'
    },
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: <BiBarChartSquare />,
        cName: 'nav-text'
    },
    {
        title: 'Logout',
        url: '/logout',
        icon: <BiLogOut />,
        cName: 'nav-text'
    }
]
