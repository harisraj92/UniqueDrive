// backend/index.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt'); // Ensure bcrypt is correctly imported

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'webrotech'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    } console.log('Connected to MySQL');
});

// Create a new company
app.post('/api/companymaster', (req, res) => {
    const { CompanyCode, CompanyName, Address, Location, State, City, Pincode, MailId, NatureOfProject, CompanyActiveStatus, InactiveDate, LicenseNo, LicenseStrength, EngagedStrength, LicenseFrom, LicenseTo, GSTNo, PANNo, TAN, TIN, ServiceTaxNumber, PurchaseOrderNo, PurchaseOrderAvailable, Devices
    } = req.body;

    const sql = `INSERT INTO CompanyMaster SET ?`;
    const values = {
        CompanyCode, CompanyName, Address, Location, State, City, Pincode, MailId, NatureOfProject, CompanyActiveStatus, InactiveDate, LicenseNo, LicenseStrength, EngagedStrength, LicenseFrom, LicenseTo, GSTNo, PANNo, TAN, TIN, ServiceTaxNumber, PurchaseOrderNo, PurchaseOrderAvailable, Devices
    };

    db.query(sql, values, (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).json({ id: result.insertId, ...values });
    });
});

// Read all companies
app.get('/api/companymaster', (req, res) => {
    const sql = `SELECT * FROM CompanyMaster`;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(results);
    });
});

// Update a company
app.put('/api/companymaster/:CompanyCode', (req, res) => {
    const { CompanyCode } = req.params;
    console.log(`Received request to update CompanyCode: ${CompanyCode}`);

    const sql = `UPDATE CompanyMaster SET ? WHERE CompanyCode = ?`;
    db.query(sql, [req.body, CompanyCode], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).send(err);
        }
        if (result.affectedRows === 0) {
            console.log('No record found for the provided CompanyCode.');
            return res.status(404).send('Company not found');
        }
        res.status(200).json(result);
    });
});



// Delete a company
app.delete('/api/companymaster/:CompanyCode', (req, res) => {
    const { CompanyCode } = req.params;
    const sql = `DELETE FROM CompanyMaster WHERE CompanyCode = ?`;
    db.query(sql, [CompanyCode], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(result);
    });
});






///Department Master
//Create
app.post('/api/departments', (req, res) => {
    const { d_id, d_name } = req.body;
    const sql = 'INSERT INTO departments (d_id, d_name) VALUES (?,?)';
    db.query(sql, [d_id, d_name], (err, result) => {
        if (err) {
            console.log(res);
            console.error('Error creating Department Master:', err);
            res.status(500).send('Error creating Department Master');
            return;
        }
        res.send('Department Master created successfully');
    });
});


// Read
app.get('/api/departments/', (req, res) => {
    const sql = 'SELECT * FROM departments';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching departments:', err);
            res.status(500).send('Error fetching departments');
            return;
        }
        res.json(results);
    });
});
// Update
app.put('/api/departments/:id', (req, res) => {
    const { id } = req.params;
    const { d_id, d_name } = req.body;
    const sql = 'UPDATE departments SET d_id=?,d_name=?  WHERE id = ?';

    db.query(sql, [d_id, d_name, id], (err, result) => {
        if (err) {
            console.error('Error updating departments:', err);
            res.status(500).send('Error updating departments');
            return;
        }
        res.send('departments updated successfully');
    });
});

app.delete('/api/departments/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM departments WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting departments:', err);
            res.status(500).send('Error deleting departments');
            return;
        }
        res.send('departments deleted successfully');
    });
});

//Designation
//Create
app.post('/api/designation', (req, res) => {
    const { designation_id, designation_name } = req.body;
    const sql = 'INSERT INTO designation (designation_id, designation_name) VALUES (?,?)';
    db.query(sql, [designation_id, designation_name], (err, result) => {
        if (err) {
            console.log(res);
            console.error('Error creating designation Master:', err);
            res.status(500).send('Error creating designation Master');
            return;
        }
        res.send('designation Master created successfully');
    });
});

// Read
app.get('/api/designation/', (req, res) => {
    const sql = 'SELECT * FROM designation';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching designation:', err);
            res.status(500).send('Error fetching designation');
            return;
        }
        res.json(results);
    });
});

// Update
app.put('/api/designation/:id', (req, res) => {
    const { id } = req.params;
    const { designation_id, designation_name } = req.body;
    const sql = 'UPDATE designation SET designation_id=?,designation_name=?  WHERE id = ?';

    db.query(sql, [designation_id, designation_name, id], (err, result) => {
        if (err) {
            console.error('Error updating designation:', err);
            res.status(500).send('Error updating designation');
            return;
        }
        res.send('designation updated successfully');
    });
});

//delete
app.delete('/api/designation/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM designation WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting designation:', err);
            res.status(500).send('Error deleting designation');
            return;
        }
        res.send('designation deleted successfully');
    });
});

// Cities
//read
app.get('/api/cities', (req, res) => {
    const sql = 'SELECT * FROM cities';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching cities:', err);
            res.status(500).send('Error fetching cities');
            return;
        }
        res.json(results);
    });
});

// rto_master
app.get('/api/rto_master', (req, res) => {
    const { cityCode } = req.query;
    let sql = `
      SELECT rto_master.*, cities.city_name
      FROM rto_master
      JOIN cities ON rto_master.city_code = cities.city_code
    `;
    if (cityCode) {
        sql += ' WHERE rto_master.city_code = ?';
    }
    db.query(sql, cityCode ? [cityCode] : [], (err, results) => {
        if (err) {
            console.error('Error fetching RTOs:', err);
            res.status(500).send('Error fetching RTOs');
            return;
        }
        res.json(results);
    });
});






app.post('/api/rto_master', (req, res) => {
    const { rto_name, rto_address, rto_phoneno, serial_no, city_code } = req.body;
    const sql = 'INSERT INTO rto_master (rto_name,rto_address,rto_phoneno,serial_no,city_code) VALUES (?, ?,?,?,?)';
    db.query(sql, [rto_name, rto_address, rto_phoneno, serial_no, city_code], (err, result) => {
        if (err) {
            console.error('Error creating rto_master:', err);
            res.status(500).send('Error creating rto_master');
            return;
        }
        res.send('rto_master created successfully');
    });
});




//update
app.put('/api/rto_master/:id', (req, res) => {
    const { id } = req.params;
    const { rto_name, rto_address, rto_phoneno, serial_no } = req.body;
    const sql = 'UPDATE rto_master SET rto_name = ?, rto_address=?,rto_phoneno=?,serial_no=?   WHERE id = ?';
    db.query(sql, [rto_name, rto_address, rto_phoneno, serial_no, id], (err, result) => {
        if (err) {
            console.error('Error updating rto_master:', err);
            res.status(500).send('Error updating rto_master');
            return;
        }
        res.send('rto_master updated successfully');
    });
});

//delete
app.delete('/api/rto_master/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM rto_master WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting rto:', err);
            res.status(500).send('Error deleting rto');
            return;
        }
        res.send('rto deleted successfully');
    });
});

// Create Main Menu

// Get All Main Menus
app.get('/api/mainmenu', (req, res) => {
    db.query('SELECT * FROM MainMenu', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Main Menu Post
app.post('/api/mainmenu', (req, res) => {
    const { MainMenuId, MainMenu, DisplayName, OrderBy, Status, HavingSubMenu } = req.body;
    const query = 'INSERT INTO MainMenu (MainMenuId, MainMenu, DisplayName, OrderBy, Status, HavingSubMenu) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [MainMenuId, MainMenu, DisplayName, OrderBy, Status, HavingSubMenu], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).json(results);
    });
});


// Update Main Menu
app.put('/api/mainmenu/:id', (req, res) => {
    const { id } = req.params;
    const { MainMenuId, MainMenu, DisplayName, OrderBy, Status, HavingSubMenu } = req.body;
    const query = 'UPDATE MainMenu SET MainMenuId = ?, MainMenu = ?, DisplayName = ?, OrderBy = ?, Status = ?, HavingSubMenu = ? WHERE id = ?';
    db.query(query, [MainMenuId, MainMenu, DisplayName, OrderBy, Status, HavingSubMenu, id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Delete Main Menu

// hide delete because of Foreign Key MainMenuID
app.delete('/api/mainmenu/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM MainMenu WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// SubMenu endpoints
app.get('/api/submenu', (req, res) => {
    db.query('SELECT * FROM SubMenu', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

app.post('/api/submenu', (req, res) => {
    const { SubMenu, DisplayName, OrderBy, Status, HavingSubMenu, MainMenuId } = req.body;
    const query = 'INSERT INTO SubMenu (SubMenu, DisplayName, OrderBy, Status, HavingSubMenu, MainMenuId) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [SubMenu, DisplayName, OrderBy, Status, HavingSubMenu, MainMenuId], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).json(results);
    });
});

app.put('/api/submenu/:id', (req, res) => {
    const { id } = req.params;
    const { SubMenu, DisplayName, OrderBy, Status, HavingSubMenu, MainMenuId } = req.body;
    const query = 'UPDATE SubMenu SET SubMenu = ?, DisplayName = ?, OrderBy = ?, Status = ?, HavingSubMenu = ?, MainMenuId = ? WHERE id = ?';
    db.query(query, [SubMenu, DisplayName, OrderBy, Status, HavingSubMenu, MainMenuId, id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});



// hide delete because of Foreign Key SubMenuID
app.delete('/api/submenu/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM SubMenu WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});




////Inner Sub Menu

app.get('/api/submenu/:mainMenuId', (req, res) => {
    const { mainMenuId } = req.params;
    db.query('SELECT * FROM SubMenu WHERE MainMenuId = ? AND HavingSubMenu = true', [mainMenuId], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

app.get('/api/innersubmenu', (req, res) => {
    db.query('SELECT * FROM InnerSubMenu', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

app.post('/api/innersubmenu', (req, res) => {
    const { InnerSubMenu, DisplayName, OrderBy, Status, SubMenuId } = req.body;
    db.query(
        'INSERT INTO InnerSubMenu (InnerSubMenu, DisplayName, OrderBy, Status, SubMenuId) VALUES (?, ?, ?, ?, ?)',
        [InnerSubMenu, DisplayName, OrderBy, Status, SubMenuId],
        (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(201).json({ id: results.insertId });
        }
    );
});

app.put('/api/innersubmenu/:id', (req, res) => {
    const { id } = req.params;
    const { InnerSubMenu, DisplayName, OrderBy, Status, SubMenuId } = req.body;
    db.query(
        'UPDATE InnerSubMenu SET InnerSubMenu = ?, DisplayName = ?, OrderBy = ?, Status = ?, SubMenuId = ? WHERE id = ?',
        [InnerSubMenu, DisplayName, OrderBy, Status, SubMenuId, id],
        (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).json(results);
        }
    );
});

app.delete('/api/innersubmenu/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM InnerSubMenu WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json(results);
    });
});




//// Routes for Template
app.get('/api/template', (req, res) => {
    db.query('SELECT * FROM Template', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});


app.post('/api/template', (req, res) => {
    const { TemplateName, TemplateDescription, status, selectedMenus } = req.body;

    // Validate input
    if (!TemplateName || !TemplateDescription || typeof status === 'undefined' || !selectedMenus) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Convert selectedMenus to JSON string
    const selectedMenusJson = JSON.stringify(selectedMenus);

    // Insert into database
    db.query(
        'INSERT INTO Template (TemplateName, TemplateDescription, status, selectedMenus) VALUES (?, ?, ?, ?)',
        [TemplateName, TemplateDescription, status, selectedMenusJson],
        (err, results) => {
            if (err) {
                console.error('Error creating template:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(201).json({ message: 'Template created successfully', templateId: results.insertId });
        }
    );
});




app.put('/api/template/:id', (req, res) => {
    const { id } = req.params;
    const { TemplateName, TemplateDescription, status, selectedMenus } = req.body;
    db.query(
        'UPDATE Template SET TemplateName = ?, TemplateDescription = ?, status = ?, selectedMenus = ? WHERE id = ?',
        [TemplateName, TemplateDescription, status, JSON.stringify(selectedMenus), id],
        (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).json(results);
        }
    );
});

app.delete('/api/template/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Template WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json(results);
    });
});


///----------------------------------------User Register--------------------------

app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM Users', (err, results) => {
        if (err) {
            return res.status(500).send('Internal server error');
        }
        res.json(results);
    });
});

app.post('/api/users', async (req, res) => {
    const { Fullname, emailid, username, password, template_id, status } = req.body;

    if (!Fullname || !emailid || !username || !password || !template_id) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Password handling (hashing)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into the database
    const query = 'INSERT INTO Users (Fullname, emailid, username, password, template_id, status) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [Fullname, emailid, username, hashedPassword, template_id, status], (err, result) => {
        if (err) {
            console.error('Error inserting user:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ id: result.insertId });
    });
});


app.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const { Fullname, emailid, username, template_id, status } = req.body;

    // Ensure all necessary fields are provided
    if (!Fullname || !emailid || !username || template_id === undefined) {
        return res.status(400).json({ error: 'All fields except password are required' });
    }

    // Update query excluding password
    const updateQuery = `
      UPDATE users 
      SET Fullname = ?, emailid = ?, username = ?, template_id = ?, status = ? 
      WHERE id = ?
    `;

    // Execute the query
    db.query(updateQuery, [Fullname, emailid, username, template_id, status, userId], (err, result) => {
        if (err) {
            console.error('Error updating user:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User updated successfully' });
    });
});



// Reset User Password


app.put('/api/users/:id/reset-password', async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;

    // Password validation criteria
    const passwordMinLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    // Check if the password meets all the criteria
    if (
        !password ||
        password.length < passwordMinLength ||
        !hasUpperCase ||
        !hasLowerCase ||
        !hasNumbers ||
        !hasSpecialChar
    ) {
        return res.status(400).json({
            error: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.'
        });
    }

    try {
        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the user's password in the database
        db.query('UPDATE Users SET password = ? WHERE id = ?', [hashedPassword, id], (err, results) => {
            if (err) {
                console.error(`Error updating password for user ID ${id}:`, err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            res.status(200).json({ message: 'Password reset successfully' });
        });
    } catch (err) {
        console.error(`Unexpected error during password reset for user ID ${id}:`, err);
        res.status(500).json({ error: 'Error processing request' });
    }
});








app.delete('/api/users/:id', (req, res) => {
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).send('Error deleting user');
        }
        res.send('User deleted successfully');
    });
});


//------------------------------------------Login-------------------------------

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const userQuery = `
      SELECT Users.*, Template.TemplateName, Template.selectedMenus
      FROM Users
      JOIN Template ON Users.template_id = Template.id
      WHERE Users.username = ?`;

    db.query(userQuery, [username], async (err, userResults) => {
        if (err) {
            console.error('Database query error:', err);
            return res.status(500).json({ error: 'Database query error' });
        }

        if (userResults.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const user = userResults[0];
        try {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid username or password' });
            }

            // Exclude the password field from the user object before sending the response
            const { password: userPassword, ...userWithoutPassword } = user;
            res.json({
                success: true,
                user: userWithoutPassword, // User details without password
                role: user.TemplateName, // The role name from the Template table
                selectedMenus: JSON.parse(user.selectedMenus) // The menus from the Template
            });
        } catch (compareError) {
            console.error('Error comparing passwords:', compareError);
            res.status(500).json({ error: 'Error comparing passwords' });
        }
    });
});


//-----------------------------------------------------




// Function to convert displayName to a path-friendly format
function generatePath(displayName) {
    return displayName.toLowerCase().replace(/\s+/g, '');
}

// API to get the sidebar data
app.get('/api/sidebar', (req, res) => {
    const query = `
        SELECT Template.selectedMenus
        FROM Users
        JOIN Template ON Users.template_id = Template.id
        WHERE Template.status = 1;
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err.stack);
            return res.status(500).send('Internal server error');
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'No menu found' });
        }

        try {
            let selectedMenus = JSON.parse(results[0].selectedMenus);

            // Recursively add the "to" field based on the displayName and type
            const addPaths = (menus, parentPath = '') => {
                return menus.map(menu => {
                    let newPath;

                    if (menu.type === 'main') {
                        newPath = `/${generatePath(menu.displayName)}`;
                    } else {
                        newPath = `${parentPath}/${generatePath(menu.displayName)}`;
                    }

                    // Ensure that no double slashes are added
                    newPath = newPath.replace(/\/+/g, '/');

                    return {
                        ...menu,
                        to: newPath,
                        items: menu.items ? addPaths(menu.items, newPath) : undefined
                    };
                });
            };

            selectedMenus = addPaths(selectedMenus);

            res.json(selectedMenus);

        } catch (parseError) {
            console.error('Error parsing selectedMenus JSON:', parseError);
            res.status(500).json({ error: 'Error parsing menu data' });
        }
    });
});


//---------------------------------------------------------Leave------------------

// Create (POST) operation
app.post('/api/leave', (req, res) => {
    const { leaveType, leaveDescription, leaveAvailable, accumulate, resetMonth, accumulateTotal, leaveEncashment, isNH_FH, applicableDays } = req.body;
    const sql = `INSERT INTO leaves (leaveType, leaveDescription, leaveAvailable, accumulate, resetMonth, accumulateTotal, leaveEncashment, isNH_FH, applicableDays)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [leaveType, leaveDescription, leaveAvailable, accumulate, resetMonth, accumulateTotal, leaveEncashment, isNH_FH, applicableDays], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Read (GET) operation
app.get('/api/leaves', (req, res) => {
    const sql = 'SELECT * FROM leaves';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Update (PUT) operation
app.put('/api/leave/:id', (req, res) => {
    const { id } = req.params;
    const { leaveType, leaveDescription, leaveAvailable, accumulate, resetMonth, accumulateTotal, leaveEncashment, isNH_FH, applicableDays } = req.body;
    const sql = `UPDATE leaves SET leaveType = ?, leaveDescription = ?, leaveAvailable = ?, accumulate = ?, resetMonth = ?, accumulateTotal = ?, leaveEncashment = ?, isNH_FH = ?, applicableDays = ? WHERE id = ?`;
    db.query(sql, [leaveType, leaveDescription, leaveAvailable, accumulate, resetMonth, accumulateTotal, leaveEncashment, isNH_FH, applicableDays, id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Delete (DELETE) operation
app.delete('/api/leave/:id', (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM leaves WHERE id = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

//---------------------------------------------------------------------Profile Settings -------------------------------------------------
// GET /api/profile-names - Retrieve all profile names with their profile types
// GET /api/profile-types - Retrieve all distinct profile types
app.get('/api/profile-types', (req, res) => {
    const query = 'SELECT DISTINCT ProfileType FROM ProfileSettings';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving profile types:', err.message);
            return res.status(500).json({ error: 'Failed to retrieve profile types' });
        }
        res.json(results);
    });
});

// POST /api/profile-types - Create a new profile type
app.post('/api/profile-types', (req, res) => {
    const { ProfileType } = req.body;

    if (!ProfileType) {
        return res.status(400).json({ error: 'ProfileType is required' });
    }

    const query = 'INSERT INTO ProfileSettings (ProfileType) VALUES (?)';
    db.query(query, [ProfileType], (err, result) => {
        if (err) {
            console.error('Error inserting profile type:', err.message);
            return res.status(500).json({ error: 'Failed to create profile type' });
        }
        res.status(201).json({ id: result.insertId, ProfileType });
    });
});

// GET /api/profile-names - Retrieve all profile names with their profile types
app.get('/api/profile-names', (req, res) => {
    const query = 'SELECT ProfileId, ProfileType, ProfileName FROM ProfileSettings';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving profiles:', err.message);
            return res.status(500).json({ error: 'Failed to retrieve profiles' });
        }
        res.json(results);
    });
});

// POST /api/profile-names - Create a new profile name
app.post('/api/profile-names', (req, res) => {
    const { ProfileType, ProfileName } = req.body;

    if (!ProfileType || !ProfileName) {
        return res.status(400).json({ error: 'ProfileType and ProfileName are required' });
    }

    const query = 'INSERT INTO ProfileSettings (ProfileType, ProfileName) VALUES (?, ?)';
    db.query(query, [ProfileType, ProfileName], (err, result) => {
        if (err) {
            console.error('Error inserting profile name:', err.message);
            return res.status(500).json({ error: 'Failed to create profile name' });
        }
        res.status(201).json({ id: result.insertId, ProfileType, ProfileName });
    });
});

// PUT /api/profile-names/:id - Update a profile name
app.put('/api/profile-names/:id', (req, res) => {
    const { id } = req.params;
    const { ProfileType, ProfileName } = req.body;

    if (!ProfileType || !ProfileName) {
        return res.status(400).json({ error: 'ProfileType and ProfileName are required' });
    }

    const query = 'UPDATE ProfileSettings SET ProfileType = ?, ProfileName = ? WHERE ProfileId = ?';
    db.query(query, [ProfileType, ProfileName, id], (err, result) => {
        if (err) {
            console.error('Error updating profile name:', err.message);
            return res.status(500).json({ error: 'Failed to update profile name' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.json({ id, ProfileType, ProfileName });
    });
});

// DELETE /api/profile-names/:id - Delete a profile name
app.delete('/api/profile-names/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM ProfileSettings WHERE ProfileId = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting profile name:', err.message);
            return res.status(500).json({ error: 'Failed to delete profile name' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.json({ message: 'Profile deleted' });
    });
});




//------------------------------------------------------------------------------------------------------------port------------------------------------------------------------------------------------------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
