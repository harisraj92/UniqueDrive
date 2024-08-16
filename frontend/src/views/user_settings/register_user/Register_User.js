import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Table, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register_User = () => {
    const [fullname, setFullname] = useState('');
    const [emailid, setEmailid] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [templateId, setTemplateId] = useState('');
    const [status, setStatus] = useState(true);
    const [templates, setTemplates] = useState([]);
    const [users, setUsers] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editMode, setEditMode] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isResetPassword, setIsResetPassword] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/api/template')
            .then(response => setTemplates(response.data))
            .catch(error => {
                console.error('There was an error fetching the templates!', error);
                toast.error('Error fetching templates');
            });

        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get('http://localhost:5000/api/users')
            .then(response => setUsers(response.data))
            .catch(error => {
                console.error('There was an error fetching the users!', error);
                toast.error('Error fetching users');
            });
    };

    const validateInput = (isPasswordReset = false) => {
        if (!isPasswordReset && (!fullname || !emailid || !username || !templateId)) {
            toast.error('All fields except password are required.');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailid)) {
            toast.error('Please enter a valid email address.');
            return false;
        }

        if ((isPasswordReset || password) && (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/\d/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password))) {
            toast.error('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.');
            return false;
        }

        if (password !== confirmpassword) {
            toast.error('Passwords do not match.');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInput()) return;

        try {
            const user = { Fullname: fullname, emailid, username, password, template_id: templateId, status };
            if (editingId) {
                await axios.put(`http://localhost:5000/api/users/${editingId}`, user);
                toast.success('User updated successfully');
            } else {
                await axios.post('http://localhost:5000/api/users', user);
                toast.success('User registered successfully');
            }

            resetForm();
            fetchUsers();
        } catch (err) {
            if (err.response && err.response.data.error) {
                toast.error(err.response.data.error);
            } else {
                toast.error('Error registering/updating user');
            }
            console.error(err);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!validateInput(true)) return;

        try {
            await axios.put(`http://localhost:5000/api/users/${editingId}/reset-password`, { password });
            toast.success('Password reset successfully');
            setPassword('');
            setConfirmpassword('');
            setShowModal(false);
            fetchUsers();
        } catch (err) {
            if (err.response && err.response.data.error) {
                toast.error(err.response.data.error);
            } else {
                toast.error('Error resetting password');
            }
            console.error(err);
        }
    };

    const resetForm = () => {
        setFullname('');
        setEmailid('');
        setUsername('');
        setPassword('');
        setConfirmpassword('');
        setTemplateId('');
        setStatus(true);
        setEditingId(null);
        setShowModal(false);
        setIsResetPassword(false);
    };

    const openModalForResetPassword = (user) => {
        setEditingId(user.id);
        setPassword('');
        setConfirmpassword('');
        setIsResetPassword(true);
        setShowModal(true);
    };

    const openModalForNewUser = () => {
        resetForm();
        setShowModal(true);
    };

    const handleEditClick = (user) => {
        setEditMode(user.id);
        setEditingId(user.id);
        setFullname(user.Fullname);
        setEmailid(user.emailid);
        setUsername(user.username);
        setTemplateId(user.template_id);
        setStatus(user.status);
    };

    const handleSaveClick = async (id) => {
        const user = users.find(user => user.id === id);
        try {
            await axios.put(`http://localhost:5000/api/users/${id}`, user);
            toast.success('User updated successfully');
            setEditMode(null);
            fetchUsers();
        } catch (err) {
            toast.error('Error updating user');
            console.error(err);
        }
    };

    const handleCancelClick = () => {
        setEditMode(null);
        fetchUsers(); // Reset changes
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${id}`);
            toast.success('User deleted successfully');
            fetchUsers();
        } catch (err) {
            toast.error('Error deleting user');
            console.error(err);
        }
    };

    const handleInputChange = (id, field, value) => {
        setUsers(users.map(user => user.id === id ? { ...user, [field]: value } : user));
    };

    return (
        <Container>
            <div>
                <Button className="my-4" onClick={openModalForNewUser}>Add New User</Button>
                <ToastContainer />
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{isResetPassword ? 'Reset Password' : editingId ? 'Edit User' : 'Register User'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={isResetPassword ? handleResetPassword : handleSubmit}>
                        {!isResetPassword && (
                            <>
                                <Form.Group controlId="formBasicFullname">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter full name"
                                        value={fullname}
                                        onChange={(e) => setFullname(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmailid">
                                    <Form.Label>Email ID</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={emailid}
                                        onChange={(e) => setEmailid(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicTemplate">
                                    <Form.Label>User Rights (Template)</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={templateId}
                                        onChange={(e) => setTemplateId(e.target.value)}
                                        required
                                    >
                                        <option value="">Select Template</option>
                                        {templates.map(template => (
                                            <option key={template.id} value={template.id}>
                                                {template.TemplateName}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="formBasicStatus">
                                    <Form.Label>Status</Form.Label>
                                    <Form.Check
                                        type="checkbox"
                                        label="Active"
                                        checked={status}
                                        onChange={(e) => setStatus(e.target.checked)}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicConfirmpassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={confirmpassword}
                                        onChange={(e) => setConfirmpassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </>
                        )}
                        {isResetPassword && (
                            <>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicConfirmpassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={confirmpassword}
                                        onChange={(e) => setConfirmpassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                            </>
                        )}
                        <Button variant="primary" type="submit">
                            {isResetPassword ? 'Reset Password' : editingId ? 'Update' : 'Register'}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

            <Row>
                <Col>
                    <h2>Users</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Full Name</th>
                                <th>Email ID</th>
                                <th>Username</th>
                                <th>User Rights</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>
                                        {editMode === user.id ? (
                                            <Form.Control
                                                type="text"
                                                value={user.Fullname}
                                                onChange={(e) => handleInputChange(user.id, 'Fullname', e.target.value)}
                                            />
                                        ) : (
                                            user.Fullname
                                        )}
                                    </td>
                                    <td>
                                        {editMode === user.id ? (
                                            <Form.Control
                                                type="text"
                                                value={user.emailid}
                                                onChange={(e) => handleInputChange(user.id, 'emailid', e.target.value)}
                                            />
                                        ) : (
                                            user.emailid
                                        )}
                                    </td>
                                    <td>
                                        {editMode === user.id ? (
                                            <Form.Control
                                                type="text"
                                                value={user.username}
                                                onChange={(e) => handleInputChange(user.id, 'username', e.target.value)}
                                            />
                                        ) : (
                                            user.username
                                        )}
                                    </td>
                                    <td>
                                        {editMode === user.id ? (
                                            <Form.Control
                                                as="select"
                                                value={user.template_id}
                                                onChange={(e) => handleInputChange(user.id, 'template_id', e.target.value)}
                                            >
                                                <option value="">Select Template</option>
                                                {templates.map(template => (
                                                    <option key={template.id} value={template.id}>
                                                        {template.TemplateName}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        ) : (
                                            templates.find(template => template.id === user.template_id)?.TemplateName || 'N/A'
                                        )}
                                    </td>
                                    <td>
                                        {editMode === user.id ? (
                                            <Form.Check
                                                type="checkbox"
                                                checked={user.status}
                                                onChange={(e) => handleInputChange(user.id, 'status', e.target.checked)}
                                            />
                                        ) : (
                                            user.status ? 'Active' : 'Inactive'
                                        )}
                                    </td>
                                    <td>
                                        {editMode === user.id ? (
                                            <>
                                                <Button variant="success" onClick={() => handleSaveClick(user.id)}>Save</Button>{' '}
                                                <Button variant="secondary" onClick={handleCancelClick}>Cancel</Button>
                                            </>
                                        ) : (
                                            <>
                                                <Button variant="warning" onClick={() => handleEditClick(user)}>Edit</Button>{' '}
                                                <Button variant="danger" onClick={() => handleDelete(user.id)}>Delete</Button>{' '}
                                                <Button variant="secondary" onClick={() => openModalForResetPassword(user)}>Reset Password</Button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default Register_User;
