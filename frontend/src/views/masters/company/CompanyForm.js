import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';

const CompanyForm = ({ company, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        CompanyCode: '',
        CompanyName: '',
        Address: '',
        Location: '',
        State: '',
        City: '',
        Pincode: '',
        MailId: '',
        NatureOfProject: '',
        CompanyActiveStatus: false,
        InactiveDate: '',
        LicenseNo: '',
        LicenseStrength: '',
        EngagedStrength: '',
        LicenseFrom: '',
        LicenseTo: '',
        GSTNo: '',
        PANNo: '',
        TAN: '',
        TIN: '',
        ServiceTaxNumber: '',
        PurchaseOrderNo: '',
        PurchaseOrderAvailable: false,
        Devices: '',
    });

    useEffect(() => {
        if (company) {
            setFormData(company);
        }
    }, [company]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (company?.CompanyCode) {
                // Update existing company
                await axios.put(`http://localhost:5000/api/companymaster/${formData.CompanyCode}`, formData);
                console.log("Company updated successfully");
            } else {
                // Add new company
                await axios.post('http://localhost:5000/api/companymaster', formData);
                console.log("Company added successfully");
            }
            onSave();
        } catch (error) {
            console.error('Error saving company data:', error);
        }
    };


    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col md={6}>
                    <Form.Group controlId="CompanyCode">
                        <Form.Label>Company Code</Form.Label>
                        <Form.Control
                            type="text"
                            name="CompanyCode"
                            value={formData.CompanyCode}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="CompanyName">
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="CompanyName"
                            value={formData.CompanyName}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="Address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="Address"
                            value={formData.Address}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="Location">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            type="text"
                            name="Location"
                            value={formData.Location}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="State">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                            type="text"
                            name="State"
                            value={formData.State}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="City">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            type="text"
                            name="City"
                            value={formData.City}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="Pincode">
                        <Form.Label>Pincode</Form.Label>
                        <Form.Control
                            type="text"
                            name="Pincode"
                            value={formData.Pincode}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="MailId">
                        <Form.Label>Mail Id</Form.Label>
                        <Form.Control
                            type="email"
                            name="MailId"
                            value={formData.MailId}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="NatureOfProject">
                        <Form.Label>Nature Of Project</Form.Label>
                        <Form.Control
                            type="text"
                            name="NatureOfProject"
                            value={formData.NatureOfProject}
                            onChange={handleChange}

                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="LicenseNo">
                        <Form.Label>License No</Form.Label>
                        <Form.Control
                            type="text"
                            name="LicenseNo"
                            value={formData.LicenseNo}
                            onChange={handleChange}

                        />
                    </Form.Group>
                    <Form.Group controlId="LicenseStrength">
                        <Form.Label>License Strength</Form.Label>
                        <Form.Control
                            type="number"
                            name="LicenseStrength"
                            value={formData.LicenseStrength}
                            onChange={handleChange}

                        />
                    </Form.Group>
                    <Form.Group controlId="EngagedStrength">
                        <Form.Label>Engaged Strength</Form.Label>
                        <Form.Control
                            type="number"
                            name="EngagedStrength"
                            value={formData.EngagedStrength}
                            onChange={handleChange}

                        />
                    </Form.Group>
                    <Form.Group controlId="LicenseFrom">
                        <Form.Label>License From</Form.Label>
                        <Form.Control
                            type="date"
                            name="LicenseFrom"
                            value={formData.LicenseFrom}
                            onChange={handleChange}

                        />
                    </Form.Group>
                    <Form.Group controlId="LicenseTo">
                        <Form.Label>License To</Form.Label>
                        <Form.Control
                            type="date"
                            name="LicenseTo"
                            value={formData.LicenseTo}
                            onChange={handleChange}

                        />
                    </Form.Group>
                    <Form.Group controlId="GSTNo">
                        <Form.Label>GST No</Form.Label>
                        <Form.Control
                            type="text"
                            name="GSTNo"
                            value={formData.GSTNo}
                            onChange={handleChange}

                        />
                    </Form.Group>
                    <Form.Group controlId="PANNo">
                        <Form.Label>PAN No</Form.Label>
                        <Form.Control
                            type="text"
                            name="PANNo"
                            value={formData.PANNo}
                            onChange={handleChange}

                        />
                    </Form.Group>
                    <Form.Group controlId="TAN">
                        <Form.Label>TAN</Form.Label>
                        <Form.Control
                            type="text"
                            name="TAN"
                            value={formData.TAN}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="TIN">
                        <Form.Label>TIN</Form.Label>
                        <Form.Control
                            type="text"
                            name="TIN"
                            value={formData.TIN}
                            onChange={handleChange}

                        />
                    </Form.Group>
                    <Form.Group controlId="ServiceTaxNumber">
                        <Form.Label>Service Tax Number</Form.Label>
                        <Form.Control
                            type="text"
                            name="ServiceTaxNumber"
                            value={formData.ServiceTaxNumber}
                            onChange={handleChange}

                        />
                    </Form.Group>
                    <Form.Group controlId="PurchaseOrderNo">
                        <Form.Label>Purchase Order No</Form.Label>
                        <Form.Control
                            type="text"
                            name="PurchaseOrderNo"
                            value={formData.PurchaseOrderNo}
                            onChange={handleChange}

                        />
                    </Form.Group>
                    <Form.Group controlId="PurchaseOrderAvailable">
                        <Form.Check
                            type="checkbox"
                            label="Purchase Order Available?"
                            name="PurchaseOrderAvailable"
                            checked={formData.PurchaseOrderAvailable}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="Devices">
                        <Form.Label>Devices</Form.Label>
                        <Form.Control
                            as="select"
                            name="Devices"
                            value={formData.Devices}
                            onChange={handleChange}
                        >
                            <option>Select Device</option>
                            <option>Device 1</option>
                            <option>Device 2</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
            <div className="text-center mt-3">
                <Button variant="primary" type="submit">Save</Button>
                <Button variant="secondary" onClick={onCancel} className="ms-2">Cancel</Button>
            </div>
        </Form>
    );
};

export default CompanyForm;
