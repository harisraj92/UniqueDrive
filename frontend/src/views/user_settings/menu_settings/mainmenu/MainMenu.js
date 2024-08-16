import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, InputGroup, FormControl } from 'react-bootstrap';
import { MdEditSquare } from "react-icons/md";
import { TiDelete } from "react-icons/ti";
import { MdLibraryAdd } from "react-icons/md";
import { IoChevronBackCircle } from "react-icons/io5";
import { FaSave } from "react-icons/fa";


const MainMenu = () => {
    const [menus, setMenus] = useState([]);
    const [editMenuId, setEditMenuId] = useState(null);
    const [form, setForm] = useState({
        MainMenuId: '',
        MainMenu: '',
        DisplayName: '',
        OrderBy: '',
        Status: false,
        HavingSubMenu: false
    });
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchMenus();
    }, []);

    const fetchMenus = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/mainmenu');
            setMenus(response.data);
        } catch (error) {
            console.error('Error fetching menus:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSave = async (id) => {
        try {
            if (id === -1) {
                await axios.post('http://localhost:5000/api/mainmenu', form);
            } else {
                await axios.put(`http://localhost:5000/api/mainmenu/${id}`, form);
            }
            fetchMenus();
            setEditMenuId(null);
            resetForm();
        } catch (error) {
            console.error('Error saving menu:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/mainmenu/${id}`);
            fetchMenus();
        } catch (error) {
            console.error('Error deleting menu:', error);
        }
    };

    const handleEdit = (menu) => {
        setEditMenuId(menu.id);
        setForm({
            MainMenuId: menu.MainMenuId,
            MainMenu: menu.MainMenu,
            DisplayName: menu.DisplayName,
            OrderBy: menu.OrderBy,
            Status: menu.Status,
            HavingSubMenu: menu.HavingSubMenu
        });
    };

    const resetForm = () => {
        setForm({
            MainMenuId: '',
            MainMenu: '',
            DisplayName: '',
            OrderBy: '',
            Status: false,
            HavingSubMenu: false
        });
    };

    const handleAddClick = () => {
        setEditMenuId(-1);
        resetForm();
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleSave(editMenuId);
    };

    const filteredMenus = menus.filter(menu =>
        menu.MainMenu.toLowerCase().includes(search.toLowerCase()) ||
        (menu.DisplayName && menu.DisplayName.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div>
            <InputGroup className="mb-4">
                <FormControl
                    placeholder="Search by MainMenu or DisplayName"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </InputGroup>
            <Button className="mb-4" variant="primary" onClick={handleAddClick}>Add Menu</Button>
            <div className="table-responsive">
                <Table striped bordered hover>
                    <thead>
                        <tr>

                            <th>MainMenuId</th>
                            <th>MainMenu</th>
                            <th>DisplayName</th>
                            <th>OrderBy</th>
                            <th>Status</th>
                            <th>HavingSubMenu</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMenus.map((menu) => (
                            <tr key={menu.id}>
                                {editMenuId === menu.id ? (
                                    <>

                                        <td>
                                            <Form.Control size="sm"
                                                type="number"
                                                name="MainMenuId"
                                                value={form.MainMenuId}
                                                onChange={handleChange}
                                                required
                                            />
                                        </td>
                                        <td>
                                            <Form.Control size="sm"
                                                type="text"
                                                name="MainMenu"
                                                value={form.MainMenu}
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
                                            <button className='btn btn-success btn-sm mx-2' onClick={() => handleSave(menu.id)}><FaSave /></button>
                                            <button className='btn btn-secondary btn-sm' onClick={() => setEditMenuId(null)}><MdEditSquare /></button>

                                        </td>
                                    </>
                                ) : (
                                    <>

                                        <td>{menu.MainMenuId}</td>
                                        <td>{menu.MainMenu}</td>
                                        <td>{menu.DisplayName}</td>
                                        <td>{menu.OrderBy}</td>
                                        <td>{menu.Status ? 'Active' : 'Inactive'}</td>
                                        <td>{menu.HavingSubMenu ? 'Yes' : 'No'}</td>
                                        <td>
                                            <button className='btn btn-warning btn-sm mx-2' onClick={() => handleEdit(menu)}><MdEditSquare /></button>
                                            <button className='btn btn-danger btn-sm' onClick={() => handleDelete(menu.id)}><TiDelete /></button>

                                        </td>
                                    </>
                                )}
                            </tr>
                        ))}
                        {editMenuId === -1 && (
                            <tr>

                                <td>
                                    <Form.Control size="sm"
                                        type="number"
                                        name="MainMenuId"
                                        value={form.MainMenuId}
                                        onChange={handleChange}
                                        required
                                    />
                                </td>
                                <td>
                                    <Form.Control size="sm"
                                        type="text"
                                        name="MainMenu"
                                        value={form.MainMenu}
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
                                    <button className='btn btn-secondary btn-sm' onClick={() => setEditMenuId(null)} title={'Back'}><IoChevronBackCircle /></button>

                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default MainMenu;
