import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const LeaveForm = ({ onFormSubmit, onCancel, editData }) => {
    const [formData, setFormData] = useState({
        leaveType: '',
        leaveDescription: '',
        leaveAvailable: '',
        accumulate: 'No',
        resetMonth: 'January',
        accumulateTotal: '',
        leaveEncashment: false,
        isNH_FH: false,
        applicableDays: '',
    });

    useEffect(() => {
        if (editData) {
            setFormData(editData);  // Populate the form with the data to be edited
        }
    }, [editData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const validateForm = () => {
        if (!formData.leaveType || !formData.leaveDescription || !formData.leaveAvailable || !formData.applicableDays) {
            toast.error('Please fill in all required fields.');
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const request = editData
            ? axios.put(`http://localhost:5000/api/leave/${editData.id}`, formData)
            : axios.post('http://localhost:5000/api/leave', formData);

        request
            .then(() => {
                if (editData) {
                    toast.success('Leave data updated successfully!'); // Edit success toast
                } else {
                    toast.success('Leave data saved successfully!'); // Create success toast
                }
                onFormSubmit();  // Close the form and return to the table
            })
            .catch(() => {
                toast.error('An error occurred. Please try again.');
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="leaveType">Leave Type</label>
                        <input
                            type="text"
                            className="form-control"
                            id="leaveType"
                            name="leaveType"
                            value={formData.leaveType}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="leaveDescription">Leave Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="leaveDescription"
                            name="leaveDescription"
                            value={formData.leaveDescription}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="leaveAvailable">Leave Available</label>
                        <input
                            type="number"
                            className="form-control"
                            id="leaveAvailable"
                            name="leaveAvailable"
                            value={formData.leaveAvailable}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Accumulate Or Not</label>
                        <div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="accumulateYes"
                                    name="accumulate"
                                    value="Yes"
                                    checked={formData.accumulate === 'Yes'}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="accumulateYes">Yes</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    id="accumulateNo"
                                    name="accumulate"
                                    value="No"
                                    checked={formData.accumulate === 'No'}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="accumulateNo">No</label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="resetMonth">Reset At Which Month</label>
                        <select
                            className="form-control"
                            id="resetMonth"
                            name="resetMonth"
                            value={formData.resetMonth}
                            onChange={handleChange}
                            disabled={formData.accumulate === 'No'}  // Disable when 'No' is selected
                        >
                            {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map(month => (
                                <option key={month} value={month}>{month}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="accumulateTotal">Accumulate Upto Total</label>
                        <input
                            type="number"
                            className="form-control"
                            id="accumulateTotal"
                            name="accumulateTotal"
                            value={formData.accumulateTotal}
                            onChange={handleChange}
                            disabled={formData.accumulate === 'No'}  // Disable when 'No' is selected
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="applicableDays">No of Applicable Days</label>
                        <input
                            type="number"
                            className="form-control"
                            id="applicableDays"
                            name="applicableDays"
                            value={formData.applicableDays}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="leaveEncashment"
                                name="leaveEncashment"
                                checked={formData.leaveEncashment}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="leaveEncashment">Applicable To Leave Encashment</label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="isNH_FH"
                                name="isNH_FH"
                                checked={formData.isNH_FH}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="isNH_FH">Is NH/FH</label>
                        </div>
                    </div>
                </div>
            </div>

            <button type="submit" className="btn btn-success mt-3">Save</button>
            <button type="button" className="btn btn-secondary mt-3 ml-2" onClick={onCancel}>Cancel</button>
            <ToastContainer />
        </form>
    );
};

export default LeaveForm;
