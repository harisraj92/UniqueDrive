import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DesignationForm = ({ designation, onSave, onCancel, onShowToast }) => {
    const [formData, setFormData] = useState({ designation_id: '', designation_name: '' });

    useEffect(() => {
        if (designation) {
            setFormData(designation);
        } else {
            setFormData({ designation_id: '', designation_name: '' });
        }
    }, [designation]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (designation) {
                await axios.put(`http://localhost:5000/api/designation/${designation.id}`, formData);
                onShowToast('designation updated successfully');
            } else {
                await axios.post('http://localhost:5000/api/designation', formData);
                onShowToast('designation added successfully');
            }
            onSave();
        } catch (error) {
            console.error('Error saving designation:', error);
            onShowToast('Error saving designation');
        }
    };

    const handleCancel = () => {
        setFormData({ designation_id: '', designation_name: '' }); // Reset form fields
        onCancel(); // Call onCancel to perform any additional actions
    };

    return (
        <div>
            <h6>{designation ? 'Edit designation' : 'Add designation'}</h6>
            <form onSubmit={handleSubmit}>
                <div className='row g-3'>


                    <div className="form-group col-md-6">
                        <label htmlFor="designation_id">designation ID:</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="designation_id"
                            name="designation_id"
                            value={formData.designation_id}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="designation_name">designation Name:</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="designation_name"
                            name="designation_name"
                            value={formData.designation_name}
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

export default DesignationForm
