import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompanyForm = ({ company_master, onSave, onCancel, onShowToast }) => {
    const [formData, setFormData] = useState({ cID: '', cCode: '', cName: '', cAddress: '', cLocation: '', cState: '', cCity: '', cPincode: '', cEmail: '', cNOP: '', cActive: '' });

    useEffect(() => {
        if (company_master) {
            setFormData(company_master);
        } else {
            setFormData({ cID: '', cCode: '', cName: '', cAddress: '', cLocation: '', cState: '', cCity: '', cPincode: '', cEmail: '', cNOP: '', cActive: '' });
        }
    }, [company_master]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (company_master) {
                await axios.put(`http://localhost:5000/api/company_master/${company_master.id}`, formData);
                onShowToast('company_master updated successfully');
            } else {
                await axios.post('http://localhost:5000/api/company_master', formData);
                onShowToast('company_master added successfully');
            }
            onSave();
        } catch (error) {
            console.error('Error saving company_master:', error);
            onShowToast('Error saving company_master');
        }
    };

    const handleCancel = () => {
        setFormData({ cID: '', cCode: '', cName: '', cAddress: '', cLocation: '', cState: '', cCity: '', cPincode: '', cEmail: '', cNOP: '', cActive: '' }); // Reset form fields
        onCancel(); // Call onCancel to perform any additional actions
    };

    return (
        <div>
            <h6>{company_master ? 'Edit company_master' : 'Add company_master'}</h6>
            <form onSubmit={handleSubmit}>
                <div className='row g-3'>


                    <div className="form-group col-md-6">
                        <label htmlFor="cID">cID:</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="cID"
                            name="cID"
                            value={formData.cID}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="cCode">cCode:</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="cCode"
                            name="cCode"
                            value={formData.cCode}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="cName">cName:</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="cName"
                            name="cName"
                            value={formData.cName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="cAddress">cAddress:</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="cAddress"
                            name="cAddress"
                            value={formData.cAddress}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="cLocation">cLocation:</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="cLocation"
                            name="cLocation"
                            value={formData.cLocation}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="cState">cState:</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="cState"
                            name="cState"
                            value={formData.cState}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="cCity">cCity:</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="cCity"
                            name="cCity"
                            value={formData.cCity}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="cPincode">cPincode:</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="cPincode"
                            name="cPincode"
                            value={formData.cPincode}
                            onChange={handleChange}
                        />
                    </div>


                    <div className="form-group col-md-6">
                        <label htmlFor="cEmail">cEmail:</label>
                        <input
                            type="email"
                            className="form-control form-control-sm"
                            id="cEmail"
                            name="cEmail"
                            value={formData.cEmail}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="cNOP">cNOP:</label>
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            id="cNOP"
                            name="cNOP"
                            value={formData.cNOP}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="cActive" name="cActive" value={formData.cActive} onChange={handleChange} />
                            <label className="form-check-label" htmlFor="cActive">
                                Active
                            </label>
                        </div>
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

export default CompanyForm
