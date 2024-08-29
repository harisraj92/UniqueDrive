import React, { useState } from 'react';
import CompanyTable from './CompanyTable';
import CompanyForm from './CompanyForm';
import ToastNotification from './ToastNotification';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react';

const Company = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (company) => {
    setSelectedCompany(company);
    setShowForm(true);
  };

  const handleFormSubmit = () => {
    setSelectedCompany(null);
    setShowForm(false);
    setRefresh(!refresh);
  };

  const handleCancel = () => {
    setSelectedCompany(null);
    setShowForm(false);
  };

  const handleShowToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const handleAddCompanyMaster = () => {
    setSelectedCompany(null);
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
              {showForm ? (
                <CompanyForm
                  company={selectedCompany}
                  onSave={handleFormSubmit}
                  onCancel={handleCancel}
                  onShowToast={handleShowToast}
                />
              ) : (
                <CompanyTable
                  onEdit={handleEdit}
                  refresh={refresh}
                  onShowToast={handleShowToast}
                />
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
  );
};

export default Company;
