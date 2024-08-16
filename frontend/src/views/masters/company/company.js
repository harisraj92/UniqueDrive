import React, { useState } from 'react';

import CompanyForm from './CompanyForm';
import CompanyTable from './CompanyTable';
import ToastNotification from './ToastNotification';
import 'bootstrap/dist/css/bootstrap.min.css';

import $ from 'jquery'

import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'

const Company = () => {

  const [editingCompanyMaster, setEditingCompanyMaster] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showForm, setShowForm] = useState(false);


  const handleEdit = (company_master) => {
    setEditingCompanyMaster(company_master);
    setShowForm(true);
  };

  const handleSave = () => {
    setEditingCompanyMaster(null);
    setShowForm(false);
    setRefresh(!refresh); // Toggle the refresh state to trigger table update
  };

  const handleCancel = () => {
    setEditingCompanyMaster(null);
    setShowForm(false);
  };

  const handleShowToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const handleAddCompanyMaster = () => {
    setEditingCompanyMaster(null);
    setShowForm(true);
  };

  return (
    <div>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Company Master</strong>
            </CCardHeader>
            <CCardBody>
              <button className="btn btn-primary mb-3" onClick={handleAddCompanyMaster}>Add New</button>
              {showForm ? (
                <CompanyForm
                  company_master={editingCompanyMaster}
                  onSave={handleSave}
                  onCancel={handleCancel}
                  onShowToast={handleShowToast} />
              ) : (
                <CompanyTable onEdit={handleEdit} refresh={refresh} onShowToast={handleShowToast} />
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

export default Company
