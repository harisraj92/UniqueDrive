import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Table, Container, Row, Col, Alert } from 'react-bootstrap';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import { FaRegFolder, FaRegFolderOpen, FaRegFile } from 'react-icons/fa';
import { IoIosCheckbox, IoIosCheckboxOutline, IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import { MdEditSquare } from "react-icons/md";
import { TiDelete } from "react-icons/ti";

const Create_Template = () => {
    const [mainMenus, setMainMenus] = useState([]);
    const [subMenus, setSubMenus] = useState([]);
    const [innerSubMenus, setInnerSubMenus] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [newTemplate, setNewTemplate] = useState({
        TemplateName: '',
        TemplateDescription: '',
        status: true,
        selectedMenus: []
    });
    const [validationError, setValidationError] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        axios.get('http://localhost:5000/api/mainmenu')
            .then(response => {
                setMainMenus(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the main menus!', error);
            });

        axios.get('http://localhost:5000/api/submenu')
            .then(response => {
                setSubMenus(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the sub menus!', error);
            });

        axios.get('http://localhost:5000/api/innersubmenu')
            .then(response => {
                setInnerSubMenus(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the inner sub menus!', error);
            });

        axios.get('http://localhost:5000/api/template')
            .then(response => {
                const templates = response.data.map(template => ({
                    ...template,
                    selectedMenus: JSON.parse(template.selectedMenus || '[]')
                }));
                setTemplates(templates);
            })
            .catch(error => {
                console.error('There was an error fetching the templates!', error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewTemplate({ ...newTemplate, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (checked.length === 0) {
            setValidationError('Please select at least one menu item.');
            return;
        }

        setValidationError('');

        const menuHierarchy = [];

        // Function to generate a URL-friendly path based on the display name
        const generatePathFromDisplayName = (displayName) => {
            return `/${displayName.toLowerCase().replace(/\s+/g, '-')}`;
        };

        // Iterate over all main menus
        mainMenus.forEach(mainMenu => {
            const mainMenuChecked = checked.includes(`main-${mainMenu.MainMenuId}`);
            const subMenuItems = [];

            // Iterate over all sub menus under the current main menu
            subMenus.forEach(subMenu => {
                if (subMenu.MainMenuId === mainMenu.MainMenuId) {
                    const subMenuChecked = checked.includes(`sub-${subMenu.id}`);
                    const innerSubMenuItems = [];

                    // Iterate over all inner sub menus under the current sub menu
                    innerSubMenus.forEach(innerSubMenu => {
                        if (innerSubMenu.SubMenuId === subMenu.id && checked.includes(`inner-${innerSubMenu.id}`)) {
                            innerSubMenuItems.push({
                                type: 'inner',
                                id: innerSubMenu.id,
                                displayName: innerSubMenu.DisplayName,
                                to: generatePathFromDisplayName(innerSubMenu.DisplayName) // Generate path for inner submenu
                            });
                        }
                    });

                    if (subMenuChecked || innerSubMenuItems.length > 0) {
                        subMenuItems.push({
                            type: 'sub',
                            id: subMenu.id,
                            displayName: subMenu.DisplayName,
                            to: generatePathFromDisplayName(subMenu.DisplayName), // Generate path for submenu
                            items: innerSubMenuItems.length > 0 ? innerSubMenuItems : undefined
                        });
                    }
                }
            });

            if (mainMenuChecked || subMenuItems.length > 0) {
                menuHierarchy.push({
                    type: 'main',
                    id: mainMenu.MainMenuId,
                    displayName: mainMenu.DisplayName,
                    to: generatePathFromDisplayName(mainMenu.DisplayName), // Generate path for main menu
                    items: subMenuItems.length > 0 ? subMenuItems : undefined
                });
            }
        });

        console.log("Menu Hierarchy:", menuHierarchy);

        const updatedTemplate = {
            ...newTemplate,
            selectedMenus: menuHierarchy
        };

        if (editingId) {
            axios.put(`http://localhost:5000/api/template/${editingId}`, updatedTemplate)
                .then(response => {
                    resetForm();
                    fetchData();
                })
                .catch(error => {
                    console.error('Error updating the template!', error);
                });
        } else {
            axios.post('http://localhost:5000/api/template', updatedTemplate)
                .then(response => {
                    resetForm();
                    fetchData();
                })
                .catch(error => {
                    console.error('Error creating the template!', error);
                });
        }
    };

    const handleEdit = (template) => {
        setNewTemplate({
            TemplateName: template.TemplateName,
            TemplateDescription: template.TemplateDescription,
            status: template.status,
            selectedMenus: template.selectedMenus
        });
        setChecked(getCheckedKeys(template.selectedMenus));
        setExpanded(getExpandedNodes(template.selectedMenus));
        setEditingId(template.id);
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/template/${id}`)
            .then(response => {
                fetchData();
            })
            .catch(error => {
                console.error('There was an error deleting the template!', error);
            });
    };

    const resetForm = () => {
        setNewTemplate({
            TemplateName: '',
            TemplateDescription: '',
            status: true,
            selectedMenus: []
        });
        setChecked([]);
        setExpanded([]);
        setEditingId(null);
        setValidationError('');
    };

    const getNodes = () => {
        const nodes = mainMenus.map(mainMenu => {
            const subMenuNodes = subMenus
                .filter(subMenu => subMenu.MainMenuId === mainMenu.MainMenuId)
                .map(subMenu => {
                    const innerSubMenuNodes = innerSubMenus
                        .filter(innerSubMenu => innerSubMenu.SubMenuId === subMenu.id)
                        .map(innerSubMenu => ({
                            value: `inner-${innerSubMenu.id}`,
                            label: innerSubMenu.DisplayName,
                        }));
                    return {
                        value: `sub-${subMenu.id}`,
                        label: subMenu.DisplayName,
                        children: innerSubMenuNodes,
                    };
                });
            return {
                value: `main-${mainMenu.MainMenuId}`,
                label: mainMenu.DisplayName,
                children: subMenuNodes,
            };
        });
        return nodes;
    };

    const getExpandedNodes = (selectedMenus) => {
        const expandedNodes = new Set();
        selectedMenus.forEach(menu => {
            if (menu.type === 'inner') {
                const innerSubMenu = innerSubMenus.find(innerSubMenu => innerSubMenu.id === menu.id);
                if (innerSubMenu) {
                    const subMenu = subMenus.find(subMenu => subMenu.id === innerSubMenu.SubMenuId);
                    if (subMenu) {
                        expandedNodes.add(`main-${subMenu.MainMenuId}`);
                        expandedNodes.add(`sub-${subMenu.id}`);
                    }
                }
            } else if (menu.type === 'sub') {
                const subMenu = subMenus.find(subMenu => subMenu.id === menu.id);
                if (subMenu) {
                    expandedNodes.add(`main-${subMenu.MainMenuId}`);
                }
            }
        });
        return Array.from(expandedNodes);
    };

    const getCheckedKeys = (selectedMenus) => {
        const checkedKeys = [];

        selectedMenus.forEach(menu => {
            if (menu.type === 'main') {
                checkedKeys.push(`main-${menu.id}`);
                if (menu.items) {
                    menu.items.forEach(subMenu => {
                        checkedKeys.push(`sub-${subMenu.id}`);
                        if (subMenu.items) {
                            subMenu.items.forEach(innerSubMenu => {
                                checkedKeys.push(`inner-${innerSubMenu.id}`);
                            });
                        }
                    });
                }
            } else if (menu.type === 'sub') {
                checkedKeys.push(`sub-${menu.id}`);
                if (menu.items) {
                    menu.items.forEach(innerSubMenu => {
                        checkedKeys.push(`inner-${innerSubMenu.id}`);
                    });
                }
            } else if (menu.type === 'inner') {
                checkedKeys.push(`inner-${menu.id}`);
            }
        });

        return checkedKeys;
    };

    return (
        <Container fluid>
            <Row>
                <Col md={4}>
                    <h6 className="my-4">Menu Structure</h6>
                    <CheckboxTree
                        nodes={getNodes()}
                        checked={checked}
                        expanded={expanded}
                        onCheck={(checked) => {
                            setChecked(checked);
                            const selectedMenuObjects = checked.map(menu => {
                                const parts = menu.split('-');
                                if (parts[0] === 'main') {
                                    const mainMenu = mainMenus.find(m => m.MainMenuId === parseInt(parts[1]));
                                    return { type: 'main', id: mainMenu.MainMenuId, displayName: mainMenu.DisplayName };
                                } else if (parts[0] === 'sub') {
                                    const subMenu = subMenus.find(s => s.id === parseInt(parts[1]));
                                    return { type: 'sub', id: subMenu.id, displayName: subMenu.DisplayName };
                                } else if (parts[0] === 'inner') {
                                    const innerSubMenu = innerSubMenus.find(i => i.id === parseInt(parts[1]));
                                    return { type: 'inner', id: innerSubMenu.id, displayName: innerSubMenu.DisplayName };
                                }
                                return null;
                            }).filter(menu => menu !== null);
                            setNewTemplate({ ...newTemplate, selectedMenus: selectedMenuObjects });
                        }}
                        onExpand={(expanded) => setExpanded(expanded)}
                        icons={{
                            check: <IoIosCheckbox />,
                            uncheck: <IoIosCheckboxOutline />,
                            halfCheck: <IoIosCheckboxOutline />,
                            expandClose: <IoIosArrowForward />,
                            expandOpen: <IoIosArrowDown />,
                            parentClose: <FaRegFolder />,
                            parentOpen: <FaRegFolderOpen />,
                            leaf: <FaRegFile />
                        }}
                    />
                </Col>
                <Col md={8}>
                    <h6 className="my-4">Template Management</h6>

                    {validationError && <Alert variant="danger">{validationError}</Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column >Template Name</Form.Label>
                            <Col sm="10">
                                <Form.Control size="sm"
                                    type="text"
                                    name="TemplateName"
                                    value={newTemplate.TemplateName}
                                    onChange={handleInputChange}
                                    placeholder="Enter Template Name"
                                    required
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column >Template Description</Form.Label>
                            <Col sm="10">
                                <Form.Control size="sm"
                                    as="textarea"
                                    name="TemplateDescription"
                                    value={newTemplate.TemplateDescription}
                                    onChange={handleInputChange}
                                    placeholder="Enter Template Description"
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column size="sm">Status</Form.Label>
                            <Col sm="10">
                                <Form.Check size="sm"
                                    type="checkbox"
                                    name="status"
                                    checked={newTemplate.status}
                                    onChange={handleInputChange}
                                    label="Active"
                                />
                            </Col>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            {editingId ? 'Update' : 'Add'} Template
                        </Button>
                    </Form>
                    <div className='table-responsive'>
                        <Table striped bordered hover className="mt-4">
                            <thead>
                                <tr>
                                    <th>Template Name</th>
                                    <th>Template Description</th>
                                    <th>Status</th>
                                    <th>Selected Menus</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {templates.map((template) => (
                                    <tr key={template.id}>
                                        <td>{template.TemplateName}</td>
                                        <td>{template.TemplateDescription}</td>
                                        <td>{template.status ? 'Active' : 'Inactive'}</td>
                                        <td>{template.selectedMenus.map(menu => menu.displayName).join(', ')}</td> {/* Display selected menus */}
                                        <td>
                                            <button className='btn btn-warning btn-sm mx-2' onClick={() => handleEdit(template)}><MdEditSquare /></button>{' '}
                                            <button className='btn btn-danger btn-sm' onClick={() => handleDelete(template.id)}><TiDelete /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table></div>
                </Col>
            </Row>
        </Container>
    );
};

export default Create_Template;
