import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'


import Create_Template from './Create_Template';

const Index_Create_Template = () => {
    return (
        <div>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Create Template</strong>
                        </CCardHeader>
                        <CCardBody>
                            <Create_Template />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    )
}

export default Index_Create_Template
