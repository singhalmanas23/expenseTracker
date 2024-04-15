const Income = require('../models/income');
const mongoose = require('mongoose');
const Notification = require('../models/notifications');

exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    try {
        // Validation
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({ message: 'Invalid amount' });
        }

        // Create a new income instance using the Income model
        const income = new Income({
            title,
            amount,
            category,
            description,
            date
        });

        // Save the income to the database
        await income.save();

        // Create a new notification for the added income
        const newNotification = new Notification({
            type: 'income',
            message: `New income added: ${title}`,
            read: false,
            createdAt: Date.now()
        });

        // Save the notification to the database
        await newNotification.save();

        return res.status(201).json({ message: 'Income added successfully' });
    } catch (error) {
        console.error('Error adding income:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getIncomes = async (req, res) => {
    try {
        // Fetch all incomes from the database
        const incomes = await Income.find().sort({ createdAt: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        console.error('Error fetching incomes:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteIncomes = async (req, res) => {
    const { id } = req.params;

    try {
        // Check if the provided ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid income ID' });
        }

        // Attempt to find and delete the income document by ID
        const deletedIncome = await Income.findByIdAndDelete(id);

        if (!deletedIncome) {
            return res.status(404).json({ message: 'Income not found' });
        }

        // Create a new notification for the deleted income
        const newNotification = new Notification({
            type: 'income',
            message: `Income deleted: ${deletedIncome.title}`,
            read: false,
            createdAt: Date.now()
        });

        // Save the notification to the database
        await newNotification.save();
        console.log("Ha bhai hogyi")

        return res.status(200).json({ message: 'Income deleted successfully' });
    } catch (error) {
        console.error('Error deleting income:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
