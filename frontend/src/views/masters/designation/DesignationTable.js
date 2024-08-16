import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'datatables.net-dt/css/dataTables.dataTables.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import $ from 'jquery'
import "datatables.net";

export const DesignationTable = ({ onEdit, refresh, onShowToast }) => {

    const [designation, setDesignation] = useState([]);
    useEffect(() => {
        const fetchDesignation = async () => {

            try {
                const response = await axios.get("http://localhost:5000/api/designation");
                $('#DesignationTable').DataTable().destroy();
                setDesignation(response.data);
            } catch (error) {
                console.error("Error fetching designation:", error);
            }
        };

        fetchDesignation();
    }, [refresh]);


    useEffect(() => {

        $("#DesignationTable").DataTable();

    }, [designation]);
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/designation/${id}`);
            setDesignation(designation.filter((designation) => designation.id !== id));
            onShowToast('designation deleted successfully');
        } catch (error) {
            console.error("Error deleting designation:", error);
            onShowToast('Error deleting designation');

        }
    };

    return (
        <div>
            <table id="DesignationTable" className="display">
                <thead>
                    <tr>
                        <th>DesignationId</th>
                        <th>Designation Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {designation.map((designation) => (
                        <tr key={designation.id}>
                            <td>{designation.designation_id}</td>
                            <td>{designation.designation_name}</td>
                            <td>
                                <button
                                    onClick={() => onEdit(designation)}
                                    className="btn btn-warning mx-2"
                                >
                                    <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                                </button>
                                <button
                                    onClick={() => handleDelete(designation.id)}
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
