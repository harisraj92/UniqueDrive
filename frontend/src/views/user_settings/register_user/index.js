import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'


import Register_User from './Register_User';

const IndexSubMenu = () => {
    return (
        <div>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Create New User</strong>
                        </CCardHeader>
                        <CCardBody>
                            <Register_User />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    )
}

export default IndexSubMenu
