const {Customer,Product} = require('../models')
const AppError = require('./error')
const { findCustomerByEmail } = require('./getfunction')

const postFunctions = {
    async signUp(req, res, next){
        let temp=req.body
        temp["orders"]=[]
        temp["history"]=[]
        bday=temp.Birthday
        temp["Birthday"]=new Date(bday.Year,bday.Month,bday.Day)
        const newCustomer = new Customer(temp)
        await newCustomer.save()
        res.send({"data":"OK"})
    },
    async recordHistory(req, res, next){
        const temp=req.body
        const {email,id}=temp
        Customer.findOneAndUpdate({ Email: email }, {$push:{ history:id }},function (err, raw) {})
    
        res.send({"data":"OK"})
    },
}

module.exports=postFunctions