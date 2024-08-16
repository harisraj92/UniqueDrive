import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'datatables.net-dt/css/dataTables.dataTables.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import $ from 'jquery'
import "datatables.net";

export const DepartmentTable = ({ onEdit, refresh, onShowToast }) => {

    const [departments, setDepartments] = useState([]);
    useEffect(() => {
        const fetchDepartments = async () => {

            try {
                const response = await axios.get("http://localhost:5000/api/departments");
                $('#DepartmentTable').DataTable().destroy();
                setDepartments(response.data);
            } catch (error) {
                console.error("Error fetching departments:", error);
            }
        };

        fetchDepartments();
    }, [refresh]);


    useEffect(() => {

        $("#DepartmentTable").DataTable();

    }, [departments]);
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/departments/${id}`);
            setDepartments(departments.filter((departments) => departments.id !== id));
            onShowToast('Department deleted successfully');
        } catch (error) {
            console.error("Error deleting Department:", error);
            onShowToast('Error deleting Department');

        }
    };

    return (
        <div>
            <table id="DepartmentTable" className="display">
                <thead>
                    <tr>
                        <th>DId</th>
                        <th>Department Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map((departments) => (
                        <tr key={departments.id}>
                            <td>{departments.d_id}</td>
                            <td>{departments.d_name}</td>
                            <td>
                                <button
                                    onClick={() => onEdit(departments)}
                                    className="btn btn-warning mx-2"
                                >
                                    <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                                </button>
                                <button
                                    onClick={() => handleDelete(departments.id)}
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
