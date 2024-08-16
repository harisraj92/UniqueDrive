import React from 'react'
import MainMenu from './MainMenu'

import 'bootstrap/dist/css/bootstrap.min.css';


import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'



const IndexMainMenu = () => {
    return (
        <div>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Main Menu</strong>
                        </CCardHeader>
                        <CCardBody>
                            <MainMenu />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    )
}

export default IndexMainMenu
