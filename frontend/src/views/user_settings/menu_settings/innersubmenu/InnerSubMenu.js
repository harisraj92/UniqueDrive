import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Table, Container, Row, Col } from 'react-bootstrap';
import { MdEditSquare } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { MdLibraryAdd } from "react-icons/md";
import { IoChevronBackCircle } from "react-icons/io5";
import { FaSave } from "react-icons/fa";

function InnerSubMenu() {
    const [mainMenus, setMainMenus] = useState([]);
    const [subMenus, setSubMenus] = useState([]);
    const [innerSubMenus, setInnerSubMenus] = useState([]);
    const [selectedMainMenu, setSelectedMainMenu] = useState('');
    const [selectedSubMenu, setSelectedSubMenu] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [newInnerSubMenu, setNewInnerSubMenu] = useState({
        InnerSubMenu: '',
        DisplayName: '',
        OrderBy: '',
        Status: false,
        SubMenuId: '',
    });

    useEffect(() => {
        axios.get('http://localhost:5000/api/mainmenu')
            .then(response => {
                setMainMenus(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the main menus!', error);
            });
    }, []);

    useEffect(() => {
        if (selectedMainMenu) {
            axios.get(`http://localhost:5000/api/submenu/${selectedMainMenu}`)
                .then(response => {
                    setSubMenus(response.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the sub menus!', error);
                });
        }
    }, [selectedMainMenu]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/innersubmenu')
            .then(response => {
                setInnerSubMenus(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the inner sub menus!', error);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewInnerSubMenu({ ...newInnerSubMenu, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId) {
            axios.put(`http://localhost:5000/api/innersubmenu/${editingId}`, newInnerSubMenu)
                .then(response => {
                    setInnerSubMenus(innerSubMenus.map((item) => (item.id === editingId ? newInnerSubMenu : item)));
                    resetForm();
                })
                .catch(error => {
                    console.error('There was an error updating the inner sub menu!', error);
                });
        } else {
            axios.post('http://localhost:5000/api/innersubmenu', newInnerSubMenu)
                .then(response => {
                    setInnerSubMenus([...innerSubMenus, { ...newInnerSubMenu, id: response.data.id }]);
                    resetForm();
                })
                .catch(error => {
                    console.error('There was an error creating the inner sub menu!', error);
                });
        }
    };

    const handleEdit = (submenu) => {
        setNewInnerSubMenu(submenu);
        setEditingId(submenu.id);
        setIsAdding(false); // Ensure adding mode is off when editing
    };

    const handleAddClick = () => {
        setIsAdding(true);
        setEditingId(null);
        setNewInnerSubMenu({
            InnerSubMenu: '',
            DisplayName: '',
            OrderBy: '',
            Status: false,
            SubMenuId: selectedSubMenu,
        });
    };

    const handleSave = (id) => {
        axios.put(`http://localhost:5000/api/innersubmenu/${id}`, newInnerSubMenu)
            .then(response => {
                setInnerSubMenus(innerSubMenus.map((item) => (item.id === id ? newInnerSubMenu : item)));
                resetForm();
            })
            .catch(error => {
                console.error('There was an error updating the inner sub menu!', error);
            });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/innersubmenu/${id}`)
            .then(response => {
                setInnerSubMenus(innerSubMenus.filter((item) => item.id !== id));
            })
            .catch(error => {
                console.error('There was an error deleting the inner sub menu!', error);
            });
    };

    const resetForm = () => {
        setNewInnerSubMenu({
            InnerSubMenu: '',
            DisplayName: '',
            OrderBy: '',
            Status: false,
            SubMenuId: '',
        });
        setSelectedMainMenu('');
        setSelectedSubMenu('');
        setEditingId(null);
        setIsAdding(false);
    };

    return (
        <Container>
            <Form>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">MainMenu</Form.Label>
                    <Col sm="10">
                        <Form.Control size="sm" as="select" onChange={(e) => setSelectedMainMenu(e.target.value)} value={selectedMainMenu}>
                            <option value="">Select MainMenu</option>
                            {mainMenus.map((mainMenu) => (
                                <option key={mainMenu.id} value={mainMenu.id}>
                                    {mainMenu.MainMenu}
                                </option>
                            ))}
                        </Form.Control>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">SubMenu</Form.Label>
                    <Col sm="10">
                        <Form.Control size="sm"
                            as="select"
                            onChange={(e) => {
                                setSelectedSubMenu(e.target.value);
                                setNewInnerSubMenu({ ...newInnerSubMenu, SubMenuId: e.target.value });
                            }}
                            value={selectedSubMenu}
                            disabled={!selectedMainMenu}
                        >
                            <option value="">Select SubMenu</option>
                            {subMenus.map((subMenu) => (
                                <option key={subMenu.id} value={subMenu.id}>
                                    {subMenu.SubMenu}
                                </option>
                            ))}
                        </Form.Control>
                    </Col>
                </Form.Group>
            </Form>

            <Button
                variant="primary"
                onClick={handleAddClick}
                className="mb-3"
                disabled={!selectedMainMenu || !selectedSubMenu}
            >
                Add InnerSubMenu
            </Button>

            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>InnerSubMenu</th>
                        <th>DisplayName</th>
                        <th>OrderBy</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {innerSubMenus.map((submenu) => (
                        <tr key={submenu.id}>
                            <td>
                                {editingId === submenu.id ? (
                                    <Form.Control size="sm"
                                        type="text"
                                        name="InnerSubMenu"
                                        value={newInnerSubMenu.InnerSubMenu}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    submenu.InnerSubMenu
                                )}
                            </td>
                            <td>
                                {editingId === submenu.id ? (
                                    <Form.Control size="sm"
                                        type="text"
                                        name="DisplayName"
                                        value={newInnerSubMenu.DisplayName}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    submenu.DisplayName
                                )}
                            </td>
                            <td>
                                {editingId === submenu.id ? (
                                    <Form.Control size="sm"
                                        type="number"
                                        name="OrderBy"
                                        value={newInnerSubMenu.OrderBy}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    submenu.OrderBy
                                )}
                            </td>
                            <td>
                                {editingId === submenu.id ? (
                                    <Form.Check size="sm"
                                        type="checkbox"
                                        name="Status"
                                        checked={newInnerSubMenu.Status}
                                        onChange={() => setNewInnerSubMenu({ ...newInnerSubMenu, Status: !newInnerSubMenu.Status })}
                                        label="Active"
                                    />
                                ) : (
                                    submenu.Status ? 'Active' : 'Inactive'
                                )}
                            </td>

                            <td>
                                {editingId === submenu.id ? (

                                    <button className='btn btn-success btn-sm mx-2' onClick={() => handleSave(submenu.id)}><FaSave /></button>

                                ) : (
                                    <button className='btn btn-warning btn-sm mx-2' onClick={() => handleEdit(submenu)}><MdEditSquare /></button>

                                )}{' '}
                                <button className='btn btn-danger btn-sm' onClick={() => handleDelete(submenu.id)}><TiDelete /></button>

                            </td>
                        </tr>
                    ))}
                    {isAdding && (
                        <tr>
                            <td>
                                <Form.Control size="sm"
                                    type="text"
                                    name="InnerSubMenu"
                                    value={newInnerSubMenu.InnerSubMenu}
                                    onChange={handleInputChange}
                                    placeholder="Enter InnerSubMenu"
                                />
                            </td>
                            <td>
                                <Form.Control size="sm"
                                    type="text"
                                    name="DisplayName"
                                    value={newInnerSubMenu.DisplayName}
                                    onChange={handleInputChange}
                                    placeholder="Enter DisplayName"
                                />
                            </td>
                            <td>
                                <Form.Control size="sm"
                                    type="number"
                                    name="OrderBy"
                                    value={newInnerSubMenu.OrderBy}
                                    onChange={handleInputChange}
                                    placeholder="Enter OrderBy"
                                />
                            </td>
                            <td>
                                <Form.Check size="sm"
                                    type="checkbox"
                                    name="Status"
                                    checked={newInnerSubMenu.Status}
                                    onChange={() => setNewInnerSubMenu({ ...newInnerSubMenu, Status: !newInnerSubMenu.Status })}
                                    label="Active"
                                />
                            </td>

                            <td>
                                <button className='btn btn-primary btn-sm mx-2' onClick={handleSubmit} title='Add'><MdLibraryAdd /></button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
}

export default InnerSubMenu;
