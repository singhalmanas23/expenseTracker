const mongoose = require('mongoose');

// Define Payment Schema
const paymentSchema = new mongoose.Schema({
  payerName: {
    type: String,
    required: true
  },
  amountOwed: {
    type: Number,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  contactInfo: {
    type: String, // Assuming this will store the phone number or email address
    required: true
  },
  reminderSent: {
    type: Boolean,
    default: false // Indicates whether a reminder has been sent for this payment
  }
});

// Create Payment model
const Reminder = mongoose.model('Payment', paymentSchema);

module.exports = Reminder;
