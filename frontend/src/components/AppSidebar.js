import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CSidebar, CSidebarBrand, CSidebarFooter, CSidebarHeader, CSidebarToggler } from '@coreui/react';
import AppSidebarNav from './AppSidebarNav';
import logo from '../assets/brand/logo_bg.png'; // Ensure the path is correct

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);
  const [navigation, setNavigation] = useState([]);

  // Function to convert displayName to a path-friendly format
  function generatePath(displayName) {
    return displayName.toLowerCase().replace(/\s+/g, '');
  }

  // Function to recursively add the "to" field based on the displayName and type
  const addPaths = (menus, parentPath = '') => {
    return menus.map(menu => {
      let newPath = parentPath;

      if (menu.type === 'main') {
        newPath = `/${generatePath(menu.displayName)}`;
      } else {
        newPath = `${parentPath}/${generatePath(menu.displayName)}`;
      }

      // Ensure that no double slashes are added
      newPath = newPath.replace(/\/+/g, '/');

      return {
        ...menu,
        to: newPath,
        items: menu.items ? addPaths(menu.items, newPath) : undefined
      };
    });
  };

  useEffect(() => {
    // Retrieve the selectedMenus from localStorage
    const storedMenus = JSON.parse(localStorage.getItem('selectedMenus'));
    if (storedMenus) {
      const menusWithPaths = addPaths(storedMenus);
      setNavigation(menusWithPaths);
    } else {
      console.error('No selectedMenus found in localStorage.');
    }
  }, []);

  return (
    <CSidebar className="border-end bg-info"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible });
      }}
    >
      <CSidebarHeader className="d-flex align-items-center justify-content-center border-bottom p-0">
        <CSidebarBrand to="/">
          <img src={logo} alt="Admin Logo" style={{ width: '100%', height: 'auto' }} />
        </CSidebarBrand>
      </CSidebarHeader>
      {/* Pass the hierarchical navigation structure directly to AppSidebarNav */}
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="d-flex align-items-center justify-content-center">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  );
};

export default AppSidebar;
