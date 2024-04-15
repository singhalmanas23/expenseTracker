const User = require('../models/user'); 

exports.sign = async (req, res) => {
    const { userName } = req.body;

    try {
        
        const existingUser = await User.findOne({ userName });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Create a new user document
        const newUser = new User({
            userName
        });

        // Save the new user to the database
        await newUser.save();

        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error signing up:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
