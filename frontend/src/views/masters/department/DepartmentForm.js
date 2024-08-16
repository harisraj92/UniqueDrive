import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DepartmentForm = ({ departments, onSave, onCancel, onShowToast }) => {
    const [formData, setFormData] = useState({ d_id: '', d_name: '' });

    useEffect(() => {
        if (departments) {
            setFormData(departments);
        } else {
            setFormData({ d_id: '', d_name: '' });
        }
    }, [departments]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (departments) {
                await axios.put(`http://localhost:5000/api/departments/${departments.id}`, formData);
                onShowToast('department updated successfully');
            } else {
                await axios.post('http://localhost:5000/api/departments', formData);
                onShowToast('department added successfully');
            }
            onSave();
        } catch (error) {
            console.error('Error saving department:', error);
            onShowToast('Error saving department');
        }
    };

    const handleCancel = () => {
        setFormData({ d_id: '', d_name: '' }); // Reset form fields
        onCancel(); // Call onCancel to perform any additional actions
    };

    return (
        <div>
            <h6>{departments ? 'Edit department' : 'Add department'}</h6>
            <form onSubmit={handleSubmit}>
                <div className='row g-3'>


                    <div className="form-group col-md-6">
                        <label htmlFor="d_id">Department ID:</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="d_id"
                            name="d_id"
                            value={formData.d_id}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="d_name">Demartment Name:</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="d_name"
                            name="d_name"
                            value={formData.d_name}
                            onChange={handleChange}
                        />
                    </div>


                    <div className='form-group'>
                        <button type="submit" className="btn btn-primary me-2">
                            Save
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                    </div>

                </div>
            </form>
        </div>
    )
}

export default DepartmentForm
