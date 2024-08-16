import React, { useState, useEffect } from 'react';
import FormRto from './FormRto';
import TableRto from './TableRto';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'

const Rto = () => {
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [rtoData, setRtoData] = useState([]);
    const [filteredRtoData, setFilteredRtoData] = useState([]);
    const [isAddRtoEnabled, setIsAddRtoEnabled] = useState(false);
    const [showFormRto, setShowFormRto] = useState(false);
    const [editRtoData, setEditRtoData] = useState(null);
    useEffect(() => {
        axios.get('http://localhost:5000/api/cities')
            .then(response => {
                setCities(response.data);
            })
            .catch(error => {
                toast.error("Failed to fetch cities");
            });

        fetchRtoData();
    }, []);

    const fetchRtoData = () => {
        axios.get('http://localhost:5000/api/rto_master')
            .then(response => {
                setRtoData(response.data);
                setFilteredRtoData(response.data);
            })
            .catch(error => {
                toast.error("Failed to fetch RTO data");
            });
    };

    const handleCityChange = (e) => {
        const cityCode = e.target.value;
        setSelectedCity(cityCode);
        if (cityCode) {
            const filteredData = rtoData.filter(rto => rto.city_code === parseInt(cityCode));
            setFilteredRtoData(filteredData);
            setIsAddRtoEnabled(true);
        } else {
            setFilteredRtoData(rtoData);
            setIsAddRtoEnabled(false);
        }
        setShowFormRto(false); // Hide the form when city changes
        setEditRtoData(null); // Reset edit data when city changes
    };

    const handleAddRtoClick = () => {
        setShowFormRto(true);
        setEditRtoData(null); // Reset edit data when adding new RTO
    };

    const handleEditRtoClick = (rto) => {
        setShowFormRto(true);
        setEditRtoData(rto); // Set the data to be edited
    };

    const handleDataRefresh = () => {
        fetchRtoData();
        if (selectedCity) {
            const filteredData = rtoData.filter(rto => rto.city_code === parseInt(selectedCity));
            setFilteredRtoData(filteredData);
        }
    };

    const closeModal = () => {
        setShowFormRto(false);
    };

    const selectedCityName = cities.find(city => city.city_code === parseInt(selectedCity))?.city_name;

    return (
        <div>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader>
                            <strong>RTO Master</strong>
                        </CCardHeader>
                        <CCardBody>
                            <div className="form-group">
                                <label htmlFor="city">Select City</label>
                                <select id="city" className="form-control" onChange={handleCityChange}>
                                    <option value="">Select City</option>
                                    {cities.map(city => (
                                        <option key={city.id} value={city.city_code}>{city.city_name}</option>
                                    ))}
                                </select>
                            </div>
                            <button className="btn btn-primary" disabled={!isAddRtoEnabled} onClick={handleAddRtoClick}>Add RTO</button>
                            <TableRto data={filteredRtoData} onDelete={handleDataRefresh} onEdit={handleEditRtoClick} />
                            <ToastContainer />

                            {/* Modal for FormRto */}
                            {showFormRto && (
                                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title">{editRtoData ? `Edit RTO for ${selectedCityName}` : `Add RTO for ${selectedCityName}`}</h5>
                                                <button type="button" className="btn-close" onClick={() => setShowFormRto(false)}></button>
                                            </div>
                                            <div className="modal-body">
                                                <FormRto cityCode={selectedCity} editData={editRtoData} onRefresh={handleDataRefresh} onClose={closeModal} />
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" onClick={() => setShowFormRto(false)}>Close</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    )
}

export default Rto
