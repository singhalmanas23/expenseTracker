// // Import necessary modules and models
// const mongoose = require('mongoose');
// const Reminder = require('../models/reminder');

// // Function to send reminders for overdue payments
// async function sendPaymentReminders() {
//   try {
//     // Query overdue payments
//     const overduePayments = await Reminder.find({
//       dueDate: { $lt: new Date() }, // Due date is less than current date
//       reminderSent: false // Reminder hasn't been sent yet
//     });

//     // Send reminders for each overdue payment
//     for (const payment of overduePayments) {
//       // Send reminder using payment.contactInfo (phone number or email address)
//       // Implement your reminder sending logic here (e.g., using an SMS API or email service)
//       console.log(`Reminder sent for payment from ${payment.payerName}`);
      
//       // Update reminder status
//       payment.reminderSent = true;
//       await payment.save();
//     }
//   } catch (error) {
//     console.error('Error sending payment reminders:', error);
//   }
// }

// // Set up a scheduled task to run the reminder service periodically (e.g., once per day)
// setInterval(sendPaymentReminders, 24 * 60 * 60 * 1000); // Run every 24 hours

// // Export the service function
// module.exports = {
//   sendPaymentReminders
// };
