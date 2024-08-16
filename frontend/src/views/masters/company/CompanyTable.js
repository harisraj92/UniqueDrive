import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'datatables.net-dt/css/dataTables.dataTables.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import $ from 'jquery'
import "datatables.net";

import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'

const CompanyTable = ({ onEdit, refresh, onShowToast }) => {

    const [company_master, setCompany_master] = useState([]);

    useEffect(() => {
        const fetchCompany_masters = async () => {

            try {

                const response = await axios.get("http://localhost:5000/api/company_master");
                $('#companyTable').DataTable().destroy();
                setCompany_master(response.data);
            } catch (error) {
                console.error("Error fetching Company_master:", error);
            }
        };

        fetchCompany_masters();
    }, [refresh]);

    useEffect(() => {

        $("#companyTable").DataTable();

    }, [company_master]);
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/company_master/${id}`);
            setCompany_master(company_master.filter((company_master) => company_master.id !== id));
            onShowToast('company_master deleted successfully');
        } catch (error) {
            console.error("Error deleting company_master:", error);
            onShowToast('Error deleting company_master');

        }
    };

    return (
        <div>
            <table id="companyTable" className="display">
                <thead>
                    <tr>
                        <th>cId</th>
                        <th>cCode</th>
                        <th>cName</th>
                        <th>cAddress</th>
                        <th>cLocation</th>
                        <th>cState</th>
                        <th>cCity</th>
                        <th>cPincode</th>
                        <th>cEmail</th>
                        <th>cNOP</th>
                        <th>cActive</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {company_master.map((company_master) => (
                        <tr key={company_master.id}>
                            <td>{company_master.cId}</td>
                            <td>{company_master.cCode}</td>
                            <td>{company_master.cName}</td>
                            <td>{company_master.cAddress}</td>
                            <td>{company_master.cLocation}</td>
                            <td>{company_master.cState}</td>
                            <td>{company_master.cCity}</td>
                            <td>{company_master.cPincode}</td>
                            <td>{company_master.cEmail}</td>
                            <td>{company_master.cNOP}</td>
                            <td>{company_master.cActive}</td>

                            <td>
                                <button
                                    onClick={() => onEdit(company_master)}
                                    className="btn btn-warning mx-2"
                                >
                                    <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                                </button>
                                <button
                                    onClick={() => handleDelete(company_master.id)}
                                    className="btn btn-danger"
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CompanyTable
