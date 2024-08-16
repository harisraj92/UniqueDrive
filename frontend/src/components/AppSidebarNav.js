import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { CBadge, CSidebarNav, CNavGroup, CNavItem } from '@coreui/react';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

const AppSidebarNav = ({ items }) => {
  const renderMenu = (items) => {
    return items.map((item, index) => {
      if (item.items && item.items.length > 0) {
        return (
          <CNavGroup key={index} toggler={item.displayName}>
            {renderMenu(item.items)}
          </CNavGroup>
        );
      } else {
        return (
          <CNavItem key={index}>
            <NavLink to={item.to} className="nav-link">
              {item.icon && item.icon}
              {item.displayName}
              {item.badge && <CBadge color={item.badge.color} className="ms-auto">{item.badge.text}</CBadge>}
            </NavLink>
          </CNavItem>
        );
      }
    });
  };

  return (
    <CSidebarNav as={SimpleBar}>
      <ul className="sidebar-nav">
        {renderMenu(items)}
      </ul>
    </CSidebarNav>
  );
};

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    id: PropTypes.number,
    displayName: PropTypes.string.isRequired,
    to: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object),
  })).isRequired,
};

export default AppSidebarNav;
