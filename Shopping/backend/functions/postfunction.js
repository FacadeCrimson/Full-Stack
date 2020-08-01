const {Customer,Product} = require('../models')
const AppError = require('./error')

const postFunctions = {
    async signUp(req, res, next){
        var temp=req.body
        temp["orders"]=[]
        temp["history"]=[]
        bday=temp.Birthday
        temp["Birthday"]=new Date(bday.Year,bday.Month,bday.Day)
        var newCustomer = new Customer(temp)
        await newCustomer.save()
        res.send({"data":"OK"})
    },
    async recordHistory(req, res, next){
        var temp=req.body
        console.log(temp)
        res.send({"data":"OK"})
    },
}

module.exports=postFunctions