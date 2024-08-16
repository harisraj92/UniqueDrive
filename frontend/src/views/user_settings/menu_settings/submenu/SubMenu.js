import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form } from 'react-bootstrap';
import { MdEditSquare } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { MdLibraryAdd } from "react-icons/md";
import { IoChevronBackCircle } from "react-icons/io5";
import { FaSave } from "react-icons/fa";


const SubMenu = () => {
    const [subMenus, setSubMenus] = useState([]);
    const [mainMenus, setMainMenus] = useState([]);
    const [selectedMainMenuId, setSelectedMainMenuId] = useState('');
    const [editSubMenuId, setEditSubMenuId] = useState(null);
    const [isNewSubMenu, setIsNewSubMenu] = useState(false); // Manage new sub-menu state
    const [form, setForm] = useState({
        SubMenu: '',
        DisplayName: '',
        OrderBy: '',
        Status: false,
        HavingSubMenu: false,
        MainMenuId: ''
    });

    useEffect(() => {
        fetchSubMenus();
        fetchMainMenus();
    }, []);

    const fetchSubMenus = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/submenu');
            setSubMenus(response.data);
        } catch (error) {
            console.error('Error fetching sub menus:', error);
        }
    };

    const fetchMainMenus = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/mainmenu');
            setMainMenus(response.data);
        } catch (error) {
            console.error('Error fetching main menus:', error);
        }
    };

    const handleMainMenuChange = (e) => {
        setSelectedMainMenuId(e.target.value);
        setEditSubMenuId(null);
        setIsNewSubMenu(false);
        resetForm();
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSave = async () => {
        try {
            if (isNewSubMenu) {
                const response = await axios.post('http://localhost:5000/api/submenu', form);
                setSubMenus([...subMenus, response.data]);
            } else {
                await axios.put(`http://localhost:5000/api/submenu/${editSubMenuId}`, form);
                setSubMenus(subMenus.map(subMenu => subMenu.id === editSubMenuId ? form : subMenu));
            }
            setEditSubMenuId(null);
            setIsNewSubMenu(false);
            resetForm();
            fetchSubMenus();  // Refresh the table after save
        } catch (error) {
            console.error('Error saving sub menu:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/submenu/${id}`);
            fetchSubMenus();
        } catch (error) {
            console.error('Error deleting sub menu:', error);
        }
    };

    const handleEdit = (subMenu) => {
        setEditSubMenuId(subMenu.id);
        setIsNewSubMenu(false);
        setForm({
            SubMenu: subMenu.SubMenu,
            DisplayName: subMenu.DisplayName,
            OrderBy: subMenu.OrderBy,
            Status: subMenu.Status,
            HavingSubMenu: subMenu.HavingSubMenu,
            MainMenuId: subMenu.MainMenuId
        });
    };

    const resetForm = () => {
        setForm({
            SubMenu: '',
            DisplayName: '',
            OrderBy: '',
            Status: false,
            HavingSubMenu: false,
            MainMenuId: selectedMainMenuId
        });
    };

    const handleAddClick = () => {
        setIsNewSubMenu(true);
        setEditSubMenuId(null);
        setForm({
            id: null,
            SubMenu: '',
            DisplayName: '',
            OrderBy: '',
            Status: false,
            HavingSubMenu: false,
            MainMenuId: selectedMainMenuId
        });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSave();
    };

    const filteredSubMenus = selectedMainMenuId
        ? subMenus.filter(subMenu => subMenu.MainMenuId === parseInt(selectedMainMenuId))
        : subMenus;

    return (
        <div>

            <Form.Group controlId="formMainMenuId">
                <Form.Label>Main Menu</Form.Label>
                <Form.Control size="sm"
                    as="select"
                    name="MainMenuId"
                    value={selectedMainMenuId}
                    onChange={handleMainMenuChange}
                >
                    <option value="">Select Main Menu</option>
                    {mainMenus.map((mainMenu) => (
                        <option key={mainMenu.id} value={mainMenu.id}>{mainMenu.MainMenu}</option>
                    ))}
                </Form.Control>
            </Form.Group>
            <Button
                className="mb-4"
                variant="primary"
                onClick={handleAddClick}
                disabled={!selectedMainMenuId}
            >
                Add Sub Menu
            </Button>
            <div className="table-responsive">
                <Table striped bordered hover>
                    <thead>
                        <tr>

                            <th>SubMenu</th>
                            <th>DisplayName</th>
                            <th>OrderBy</th>
                            <th>Status</th>
                            <th>HavingSubMenu</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSubMenus.map((subMenu) => (
                            <tr key={subMenu.id}>
                                {editSubMenuId === subMenu.id ? (
                                    <>

                                        <td>
                                            <Form.Control size="sm"
                                                type="text"
                                                name="SubMenu"
                                                value={form.SubMenu}
                                                onChange={handleChange}
                                                required
                                            />
                                        </td>
                                        <td>
                                            <Form.Control size="sm"
                                                type="text"
                                                name="DisplayName"
                                                value={form.DisplayName}
                                                onChange={handleChange}
                                            />
                                        </td>
                                        <td>
                                            <Form.Control size="sm"
                                                type="number"
                                                name="OrderBy"
                                                value={form.OrderBy}
                                                onChange={handleChange}
                                                required
                                            />
                                        </td>
                                        <td>
                                            <Form.Check size="sm"
                                                type="checkbox"
                                                name="Status"
                                                checked={form.Status}
                                                onChange={handleChange}
                                            />
                                        </td>
                                        <td>
                                            <Form.Check size="sm"
                                                type="checkbox"
                                                name="HavingSubMenu"
                                                checked={form.HavingSubMenu}
                                                onChange={handleChange}
                                            />
                                        </td>
                                        <td>

                                            <button className='btn btn-success btn-sm mx-2' onClick={handleFormSubmit}><FaSave /></button>
                                            <button className='btn btn-secondary btn-sm' onClick={resetForm}><MdEditSquare /></button>


                                        </td>
                                    </>
                                ) : (
                                    <>

                                        <td>{subMenu.SubMenu}</td>
                                        <td>{subMenu.DisplayName}</td>
                                        <td>{subMenu.OrderBy}</td>
                                        <td>{subMenu.Status ? 'Active' : 'Inactive'}</td>
                                        <td>{subMenu.HavingSubMenu ? 'Yes' : 'No'}</td>
                                        <td>
                                            <button className='btn btn-warning btn-sm mx-2' onClick={() => handleEdit(subMenu)}><MdEditSquare /></button>
                                            <button className='btn btn-danger btn-sm d-none' onClick={() => handleDelete(subMenu.id)}><TiDelete /></button>

                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                        {isNewSubMenu && (
                            <tr key="new">

                                <td>
                                    <Form.Control size="sm"
                                        type="text"
                                        name="SubMenu"
                                        value={form.SubMenu}
                                        onChange={handleChange}
                                        required
                                    />
                                </td>
                                <td>
                                    <Form.Control size="sm"
                                        type="text"
                                        name="DisplayName"
                                        value={form.DisplayName}
                                        onChange={handleChange}
                                    />
                                </td>
                                <td>
                                    <Form.Control size="sm"
                                        type="number"
                                        name="OrderBy"
                                        value={form.OrderBy}
                                        onChange={handleChange}
                                        required
                                    />
                                </td>
                                <td>
                                    <Form.Check size="sm"
                                        type="checkbox"
                                        name="Status"
                                        checked={form.Status}
                                        onChange={handleChange}
                                    />
                                </td>
                                <td>
                                    <Form.Check size="sm"
                                        type="checkbox"
                                        name="HavingSubMenu"
                                        checked={form.HavingSubMenu}
                                        onChange={handleChange}
                                    />
                                </td>
                                <td>

                                    <button className='btn btn-primary btn-sm mx-2' onClick={handleFormSubmit} title='Add'><MdLibraryAdd /></button>
                                    <button className='btn btn-secondary btn-sm' onClick={() => { setIsNewSubMenu(false); resetForm(); }}><IoChevronBackCircle /></button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default SubMenu;
