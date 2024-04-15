const router = require("express").Router();
const { addBudget, getBudgets, deleteBudget } = require("../controllers/budget");
const { addExpenses, getExpenses, deleteExpenses } = require("../controllers/expenses");
const { addIncome, getIncomes, deleteIncomes } = require("../controllers/income");
const { addLimits, getLimits } = require("../controllers/limits");
const { sign } = require("../controllers/user");
const Notification = require('../models/notifications');



router.post("/addIncome", addIncome);
router.get("/getIncomes", getIncomes);
router.delete("/deleteIncome/:id", deleteIncomes);

// Corrected route path for adding expenses
router.post("/addExpenses", addExpenses);
router.get("/getExpenses", getExpenses);
router.delete("/deleteExpenses/:id", deleteExpenses);

// Corrected route path for getting limits
router.post("/addLimit", addLimits);
router.get("/getLimit", getLimits);

//Router to retrieve payment

//router.get('/transaction-history', paymentController.getTransactionHistory);

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.get('/getNotifications', async (req, res) => {
  try {
      const notifications = await Notification.find().sort({ createdAt: -1 });
      res.json(notifications);
  } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});
router.post("/addBudget", addBudget);
router.get("/getBudget",getBudgets);
router.delete("/deleteBudget/:id", deleteBudget);

router.post("/signup",sign)


module.exports = router;
