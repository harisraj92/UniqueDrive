import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const FormRto = ({ cityCode, editData, onRefresh, onClose }) => {
    const [formData, setFormData] = useState({
        rto_name: '',
        rto_address: '',
        rto_phoneno: '',
        serial_no: '',
    });

    useEffect(() => {
        if (editData) {
            setFormData(editData);
        }
    }, [editData]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = { ...formData, city_code: cityCode };
        const apiCall = editData ? axios.put(`http://localhost:5000/api/rto_master/${editData.id}`, payload) : axios.post('http://localhost:5000/api/rto_master', payload);
        apiCall
            .then(response => {
                toast.success(`RTO ${editData ? 'updated' : 'added'} successfully`);
                // reset form
                setFormData({
                    rto_name: '',
                    rto_address: '',
                    rto_phoneno: '',
                    serial_no: '',
                });
                onRefresh();
                onClose();
            })
            .catch(error => {
                toast.error(`Failed to ${editData ? 'update' : 'add'} RTO`);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="rto_name">RTO Name</label>
                <input type="text" className="form-control" id="rto_name" name="rto_name" value={formData.rto_name} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="rto_address">RTO Address</label>
                <input type="text" className="form-control" id="rto_address" name="rto_address" value={formData.rto_address} onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="rto_phoneno">RTO Phone Number</label>
                <input type="text" className="form-control" id="rto_phoneno" name="rto_phoneno" value={formData.rto_phoneno} onChange={handleChange} required />
            </div>
            <div className="form-group">
                <label htmlFor="serial_no">Serial No</label>
                <input type="text" className="form-control" id="serial_no" name="serial_no" value={formData.serial_no} onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-primary">{editData ? 'Update' : 'Submit'}</button>
            <ToastContainer />
        </form>
    );
};

export default FormRto;
