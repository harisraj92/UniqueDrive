import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LeaveTable = ({ onEdit, refresh }) => {
    const [leaves, setLeaves] = useState([]);

    useEffect(() => {
        loadTableData();
    }, [refresh]);

    const loadTableData = () => {
        axios.get('http://localhost:5000/api/leaves')
            .then(response => {
                setLeaves(Array.isArray(response.data) ? response.data : []);
            })
            .catch(error => {
                console.error('Error fetching leave data:', error);
                setLeaves([]);
                toast.error('Failed to load leave data.');
            });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/leave/${id}`)
            .then(() => {
                toast.success('Leave data deleted successfully!');
                loadTableData();  // Reload the data after deletion
            })
            .catch(error => {
                console.error('Error deleting leave:', error);
                toast.error('Failed to delete leave data.');
            });
    };

    return (
        <div className="table-responsive">
            <table className="table table-hover table-bordered">
                <thead className="thead-light">
                    <tr>
                        <th>Leave Type</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {leaves.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="text-center">No data available</td>
                        </tr>
                    ) : (
                        leaves.map((leave, index) => (
                            <tr key={index}>
                                <td>{leave.leaveType}</td>
                                <td>{leave.leaveDescription}</td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm mr-2"
                                        onClick={() => onEdit(leave)}
                                    >
                                        <FontAwesomeIcon icon={faEdit} /> {/* Edit Icon */}
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(leave.id)}
                                    >
                                        <FontAwesomeIcon icon={faTrash} /> {/* Delete Icon */}
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            <ToastContainer />
        </div>
    );
};

export default LeaveTable;
