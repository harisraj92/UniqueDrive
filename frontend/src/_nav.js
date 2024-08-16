import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavGroup,
    name: 'Masters',
    to: '/masters',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Company',
        to: '/masters/company',
      },
      {
        component: CNavItem,
        name: 'Department',
        to: '/masters/department',
      },
      {
        component: CNavItem,
        name: 'Designation',
        to: '/masters/designation',
      },
      {
        component: CNavItem,
        name: 'Rto',
        to: '/masters/rto',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'User Settings',
  },
  {
    component: CNavGroup,
    name: 'Menu Settings',
    to: '/usersettings',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'MainMenu',
        to: '/user_settings/menu_settings/mainmenu',
      },

      {
        component: CNavItem,
        name: 'SubMenu',
        to: '/user_settings/menu_settings/submenu',
      },
      {
        component: CNavItem,
        name: 'InnerSubMenu',
        to: '/user_settings/menu_settings/innersubmenu',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Create Template',
    to: '/user_settings/create_template',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Create New User',
    to: '/user_settings/register_user',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
]

export default _nav
