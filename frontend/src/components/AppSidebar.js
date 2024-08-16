import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CSidebar, CSidebarBrand, CSidebarFooter, CSidebarHeader, CSidebarToggler } from '@coreui/react';
import AppSidebarNav from './AppSidebarNav';
import logo from '../assets/brand/logo_bg_white.png'; // Ensure the path is correct

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);
  const [navigation, setNavigation] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/sidebar')
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`Error fetching menu: ${text}`);
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('Fetched navigation data:', data);
        setNavigation(data);
      })
      .catch(error => console.error('Error fetching menu:', error));
  }, []);


  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible });
      }}
    >
      <CSidebarHeader className="d-flex align-items-center justify-content-center">
        <CSidebarBrand to="/">
          <img src={logo} alt="Admin Logo" style={{ width: '100%', height: 'auto' }} />
        </CSidebarBrand>
      </CSidebarHeader>
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
