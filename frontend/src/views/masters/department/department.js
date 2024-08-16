import React, { useState } from 'react';

import DepartmentForm from './DepartmentForm';
import { DepartmentTable } from './DepartmentTable';
import ToastNotification from './ToastNotification';
import 'bootstrap/dist/css/bootstrap.min.css';

import $ from 'jquery'

import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'

const Department = () => {

    const [editingDepartments, setEditingDepartments] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [showForm, setShowForm] = useState(false);

    const handleEdit = (department) => {
        setEditingDepartments(department);
        setShowForm(true);
    };

    const handleSave = () => {
        setEditingDepartments(null);
        setShowForm(false);
        setRefresh(!refresh); // Toggle the refresh state to trigger table update
    };

    const handleCancel = () => {
        setEditingDepartments(null);
        setShowForm(false);
    };

    const handleShowToast = (message) => {
        setToastMessage(message);
        setShowToast(true);
    };

    const handleAddDepartments = () => {
        setEditingDepartments(null);
        setShowForm(true);
    };


    return (
        <div>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>Department Master</strong>
                        </CCardHeader>
                        <CCardBody>
                            <button className="btn btn-primary mb-3" onClick={handleAddDepartments}>Add New</button>
                            {showForm ? (
                                <DepartmentForm
                                    departments={editingDepartments}
                                    onSave={handleSave}
                                    onCancel={handleCancel}
                                    onShowToast={handleShowToast} />
                            ) : (
                                <DepartmentTable onEdit={handleEdit} refresh={refresh} onShowToast={handleShowToast} />
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

export default Department
