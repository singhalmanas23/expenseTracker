const mongoose=require('mongoose')

const expensesSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        maxLength:50
    },
    amount:{
        type:Number,
        required:true,
        maxLength:20,
        trim:true
    },
    type:{
        type:String,
        default:"Expenses"
    },
    category:{
        type:String,
        required:true, 
        trim:true
    },
    description:{
        type:String,
        required:true,
        maxLength:20,
        trim:true
    },
    date:{
        type:Date,
        required:true,
        trim:true
    }

},{timestamps:true})

const Expense=mongoose.model('Expenses',expensesSchema);
module.exports=Expense;