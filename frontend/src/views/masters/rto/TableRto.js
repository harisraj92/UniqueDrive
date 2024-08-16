import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const TableRto = ({ data, onDelete, onEdit }) => {
    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/rto_master/${id}`)
            .then(response => {
                toast.success("RTO deleted successfully");
                onDelete(); // Refresh data
            })
            .catch(error => {
                toast.error("Failed to delete RTO");
            });
    };

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>City</th>
                    <th>RTO Name</th>
                    <th>RTO Address</th>
                    <th>RTO Phone No</th>
                    <th>Serial No</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td>{item.city_name}</td>
                        <td>{item.rto_name}</td>
                        <td>{item.rto_address}</td>
                        <td>{item.rto_phoneno}</td>
                        <td>{item.serial_no}</td>
                        <td>
                            <button className="btn btn-warning" onClick={() => onEdit(item)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
            <ToastContainer />
        </table>
    );
};

export default TableRto;
