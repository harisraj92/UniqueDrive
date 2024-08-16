const bcrypt = require('bcrypt');

// Define your test password
const plainPassword = '7894'; // Replace with the actual plaintext password you want to test

// Define the hash from your database
const hashedPassword = '$2b$10$tDISXUmynPrqdZdbcK.71eLijB0691CmDtt37L3NQhyFjPcp94M7m'; // The hash from the database

// Generate a new hash from the plain password for comparison
const saltRounds = 10;
bcrypt.hash(plainPassword, saltRounds, (err, newHash) => {
    if (err) throw err;
    console.log('Generated Hash for the provided password:', newHash);

    // Verify if the plain password matches the provided hash from the database
    bcrypt.compare(plainPassword, hashedPassword, (err, result) => {
        if (err) throw err;
        console.log('Password match:', result); // Should print 'Password match: true' if they match
    });
});
