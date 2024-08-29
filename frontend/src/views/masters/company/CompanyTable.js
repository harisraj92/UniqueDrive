import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

const CompanyTable = ({ onEdit, refresh, onShowToast }) => {
    const [companies, setCompanies] = useState([]);
    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const [filterActive, setFilterActive] = useState('all'); // Default to "All" filter

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/companymaster');
                const data = Array.isArray(response.data) ? response.data : [];
                setCompanies(data);
                applyFilter(data, filterActive); // Apply filter right after fetching
            } catch (error) {
                console.error('Error fetching companies:', error);
                onShowToast('Error fetching companies.');
            }
        };

        fetchCompanies();
    }, [refresh]);

    const applyFilter = (companiesList, filter) => {
        let filtered = companiesList;
        if (filter === 'live') {
            // Show only companies where CompanyActiveStatus is true (or 1)
            filtered = companiesList.filter(company => company.CompanyActiveStatus === true || company.CompanyActiveStatus === 1);
        } else if (filter === 'notLive') {
            // Show only companies where CompanyActiveStatus is false (or 0)
            filtered = companiesList.filter(company => company.CompanyActiveStatus === false || company.CompanyActiveStatus === 0);
        }
        // If 'all' is selected, show all companies, no filtering needed.
        setFilteredCompanies(filtered);
    };

    useEffect(() => {
        applyFilter(companies, filterActive);
    }, [filterActive, companies]);

    const handleDelete = async (CompanyCode) => {
        try {
            await axios.delete(`http://localhost:5000/api/companymaster/${CompanyCode}`);
            const updatedCompanies = companies.filter(company => company.CompanyCode !== CompanyCode);
            setCompanies(updatedCompanies);
            applyFilter(updatedCompanies, filterActive);
            onShowToast('Company deleted successfully.');
        } catch (error) {
            console.error('Error deleting company:', error);
            onShowToast('Error deleting company.');
        }
    };

    const handleStatusToggle = async (company) => {
        try {
            const updatedStatus = !company.CompanyActiveStatus;

            const response = await axios.put(`http://localhost:5000/api/companymaster/${company.CompanyCode}`, {
                CompanyActiveStatus: updatedStatus
            });

            if (response.status === 200) {
                const updatedCompanies = companies.map(comp =>
                    comp.CompanyCode === company.CompanyCode
                        ? { ...comp, CompanyActiveStatus: updatedStatus }
                        : comp
                );
                setCompanies(updatedCompanies);
                applyFilter(updatedCompanies, filterActive); // Re-apply filter after update
                onShowToast('Company status updated successfully.');
            } else {
                console.error('Error updating company status on server.');
                onShowToast('Error updating company status.');
            }
        } catch (error) {
            console.error('Error updating company status:', error);
            onShowToast('Error updating company status.');
        }
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <Button variant="primary" size="sm" onClick={() => onEdit(null)}>
                    Add New
                </Button>
                <div>
                    <Form.Check
                        inline
                        type="radio"
                        id="all"
                        name="statusFilter"
                        label="All"
                        checked={filterActive === 'all'}
                        onChange={() => setFilterActive('all')}
                    />
                    <Form.Check
                        inline
                        type="radio"
                        id="live"
                        name="statusFilter"
                        label="Live"
                        checked={filterActive === 'live'}
                        onChange={() => setFilterActive('live')}
                    />
                    <Form.Check
                        inline
                        type="radio"
                        id="notLive"
                        name="statusFilter"
                        label="Not Live"
                        checked={filterActive === 'notLive'}
                        onChange={() => setFilterActive('notLive')}
                    />
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-bordered table-hover">
                    <thead className="table-primary">
                        <tr>
                            <th>SLNo</th>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Location</th>
                            <th>State</th>
                            <th>Active</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCompanies.length > 0 ? (
                            filteredCompanies.map((company, index) => (
                                <tr key={company.CompanyCode}>
                                    <td>{index + 1}</td>
                                    <td>{company.CompanyCode}</td>
                                    <td>{company.CompanyName}</td>
                                    <td>{company.Address}</td>
                                    <td>{company.Location}</td>
                                    <td>{company.State}</td>
                                    <td>
                                        <Form.Check
                                            type="checkbox"
                                            checked={company.CompanyActiveStatus}
                                            onChange={() => handleStatusToggle(company)}
                                        />
                                    </td>
                                    <td>
                                        <Button className='me-sm-1'
                                            onClick={() => onEdit(company)}
                                            variant="warning"
                                            size="sm"
                                        >
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDelete(company.CompanyCode)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="text-center">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompanyTable;
