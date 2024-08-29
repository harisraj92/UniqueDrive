import React, { useState } from 'react';
import LeaveTable from './LeaveTable';
import LeaveForm from './LeaveForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CCard, CCardBody, CCardHeader, CButton, CCol, CRow } from '@coreui/react';

const LeaveMaster = () => {
    const [showForm, setShowForm] = useState(false);
    const [editData, setEditData] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const handleFormToggle = () => {
        setShowForm(!showForm);
        setEditData(null);  // Reset edit data when toggling the form
    };

    const handleEdit = (data) => {
        setEditData(data);  // Set the data to be edited
        setShowForm(true);  // Show the form for editing
    };

    const handleSave = () => {
        setShowForm(false);  // Hide the form after saving
        setRefresh(!refresh);  // Trigger a refresh for the table data
        toast.success('Leave saved successfully!');  // Show success notification
    };

    const handleCancel = () => {
        setShowForm(false);  // Hide the form when canceling
        setEditData(null);  // Clear any edit data
    };

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Leave Master</strong>
                    </CCardHeader>
                    <CCardBody>
                        {!showForm ? (
                            <>
                                <CButton color="primary" className="mb-3" onClick={handleFormToggle}>
                                    Add New
                                </CButton>
                                <LeaveTable onEdit={handleEdit} refresh={refresh} />
                            </>
                        ) : (
                            <LeaveForm
                                onFormSubmit={handleSave}
                                onCancel={handleCancel}
                                editData={editData}
                            />
                        )}
                        <ToastContainer />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default LeaveMaster;
