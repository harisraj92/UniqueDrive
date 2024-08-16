import React, { useState } from 'react';

import DesignationForm from './DesignationForm';
import { DesignationTable } from './DesignationTable';
import ToastNotification from '../company/ToastNotification';
import 'bootstrap/dist/css/bootstrap.min.css';

import $ from 'jquery'

import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'

const Designation = () => {

    const [editingDesignation, setEditingDesignation] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleEdit = (designation) => {
        setEditingDesignation(designation);
        setShowForm(true);
    };

    const handleSave = () => {
        setEditingDesignation(null);
        setShowForm(false);
        setRefresh(!refresh); // Toggle the refresh state to trigger table update
    };

    const handleCancel = () => {
        setEditingDesignation(null);
        setShowForm(false);
    };

    const handleShowToast = (message) => {
        setToastMessage(message);
        setShowToast(true);
    };

    const handleAddDesignation = () => {
        setEditingDesignation(null);
        setShowForm(true);
    };


    return (
        <div>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Designation Master</strong>
                        </CCardHeader>
                        <CCardBody>
                            <button className="btn btn-primary mb-3" onClick={handleAddDesignation}>Add New</button>
                            {showForm ? (
                                <DesignationForm
                                    designation={editingDesignation}
                                    onSave={handleSave}
                                    onCancel={handleCancel}
                                    onShowToast={handleShowToast} />
                            ) : (
                                <DesignationTable onEdit={handleEdit} refresh={refresh} onShowToast={handleShowToast} />
                            )}
                            <ToastNotification
                                show={showToast}
                                onClose={() => setShowToast(false)}
                                message={toastMessage}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    )
}

export default Designation
