const Budget = require('../models/budget');
const mongoose = require('mongoose');
//const Notification = require('../models/notification');

exports.addBudget = async (req, res) => {
    const { title, amount, startDate, endDate } = req.body;

    try {
        if (!title || !startDate || !endDate) {
            return res.status(400).json({ message: 'Title, start date, and end date are required' });
        }

        if (isNaN(amount) || amount <= 0) {
            return res.status(400).json({ message: 'Invalid amount' });
        }

        const budget = new Budget({
            title,
            amount,
            startDate,
            endDate
        });

        await budget.save();

        // const newNotification = new Notification({
        //     type: 'budget',
        //     message: `New budget added: ${title}`,
        //     read: false,
        //     createdAt: Date.now()
        // });

        //await newNotification.save();

        return res.status(201).json({ message: 'Budget added successfully' });
    } catch (error) {
        console.error('Error adding budget:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getBudgets = async (req, res) => {
    try {
        const budgets = await Budget.find().sort({ createdAt: -1 });
        res.status(200).json(budgets);
    } catch (error) {
        console.error('Error fetching budgets:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteBudget = async (req, res) => {
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid budget ID' });
        }

        const deletedBudget = await Budget.findByIdAndDelete(id);

        if (!deletedBudget) {
            return res.status(404).json({ message: 'Budget not found' });
        }


        return res.status(200).json({ message: 'Budget deleted successfully' });
    } catch (error) {
        console.error('Error deleting budget:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
