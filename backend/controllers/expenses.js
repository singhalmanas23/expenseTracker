const Expenses = require('../models/expenses');
const mongoose = require('mongoose');
const Notification = require('../models/notifications');

exports.addExpenses = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    try {
        if (!title || !category || !description || !date) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({ message: 'Invalid amount' });
        }

        const expenses = new Expenses({
            title,
            amount,
            category,
            description,
            date
        });

        await expenses.save();

        const newNotification = new Notification({
            type: 'expense',
            message: `New expense added: ${title}`,
            read: false,
            createdAt: Date.now()
        });

        await newNotification.save();

        return res.status(201).json({ message: 'Expenses added successfully' });
    } catch (error) {
        console.error('Error adding Expenses:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getExpenses = async (req, res) => {
    try {
        const expenses = await Expenses.find().sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        console.error('Error fetching Expenses:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteExpenses = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid expenses ID' });
        }

        const deletedExpense = await Expenses.findByIdAndDelete(id);

        if (!deletedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        const newNotification = new Notification({
            type: 'expense',
            message: `Expense deleted: ${deletedExpense.title}`,
            read: false,
            createdAt: Date.now()
        });
        //console.log("Nhi hua bhai");

        await newNotification.save();

        return res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        console.error('Error deleting Expense:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
