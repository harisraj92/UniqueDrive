import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Row, Col, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';

const ProfileForm = ({ profileTypes, editingProfile, onAddProfileType, onSave, onCancel }) => {
    const [profileType, setProfileType] = useState('');
    const [profileName, setProfileName] = useState('');
    const [newProfileType, setNewProfileType] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (editingProfile) {
            setProfileType(editingProfile.ProfileType || '');
            setProfileName(editingProfile.ProfileName || '');
        } else {
            setProfileType('');
            setProfileName('');
        }
    }, [editingProfile]);

    const handleSave = (e) => {
        e.preventDefault();
        if (!profileType || !profileName) {
            toast.error('Please fill out all fields.');
            return;
        }
        onSave({ ProfileType: profileType, ProfileName: profileName });
    };

    const handleAddProfileType = () => {
        if (!newProfileType) {
            toast.error('Please enter a profile type.');
            return;
        }
        onAddProfileType(newProfileType);
        setNewProfileType('');
        setShowModal(false);
    };

    return (
        <Container>

            <Form onSubmit={handleSave}>
                <h5 className="mb-3">{editingProfile ? 'Edit Profile' : 'Add Profile'}</h5>

                <Form.Group controlId="profileType" className="mb-3 col-md-6">
                    <Form.Label>Profile Type</Form.Label>
                    <Row>
                        <Col xs={8}> {/* Reduced width */}
                            <Form.Control
                                as="select"
                                value={profileType}
                                onChange={(e) => setProfileType(e.target.value)}
                                required
                                className="form-control form-control-sm"
                            >
                                <option value="">Select Profile Type</option>
                                {profileTypes.map((type, index) => (
                                    <option key={index} value={type.ProfileType}>
                                        {type.ProfileType}
                                    </option>
                                ))}
                            </Form.Control>
                        </Col>
                        <Col xs={4}> {/* Reduced width */}
                            <Button onClick={() => setShowModal(true)} className="w-50 btn-sm">
                                Add Type
                            </Button>
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group controlId="profileName" className="mb-3 col-md-6">
                    <Form.Label>Profile Name</Form.Label>
                    <Row>
                        <Col xs={8}> {/* Reduced width */}
                            <Form.Control
                                type="text"
                                value={profileName}
                                onChange={(e) => setProfileName(e.target.value)}
                                required
                                className="form-control form-control-sm"
                                placeholder="Enter profile name"
                                disabled={!profileType}
                            />
                        </Col>
                    </Row>
                </Form.Group>

                <Row>
                    <Col xs="auto">
                        <Button variant="primary" type="submit" className="px-3 btn-sm">
                            Save
                        </Button>
                    </Col>
                    <Col xs="auto">
                        <Button variant="secondary" onClick={onCancel} className="px-3 btn-sm">
                            Cancel
                        </Button>
                    </Col>
                </Row>
            </Form>

            {/* Modal for adding a new profile type */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="sm">
                <Modal.Header closeButton>
                    <Modal.Title>Add Profile Type</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Control
                        type="text"
                        value={newProfileType}
                        onChange={(e) => setNewProfileType(e.target.value)}
                        placeholder="Enter profile type"
                        required
                        className="form-control form-control-sm"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)} className="btn-sm">
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAddProfileType} className="btn-sm">
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ProfileForm;
