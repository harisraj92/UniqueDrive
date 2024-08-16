import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'

import InnerSubMenu from './InnerSubMenu'

const IndexInnerSubMenu = () => {
    return (
        <div>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Inner Sub Menu</strong>
                        </CCardHeader>
                        <CCardBody>
                            <InnerSubMenu />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    )
}

export default IndexInnerSubMenu
