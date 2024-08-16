import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'


import SubMenu from './SubMenu';

const IndexSubMenu = () => {
    return (
        <div>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Main Menu</strong>
                        </CCardHeader>
                        <CCardBody>
                            <SubMenu />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    )
}

export default IndexSubMenu
