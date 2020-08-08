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
        await Customer.findOneAndUpdate({ Email: email }, {$push:{ history:id }},function (err, raw) {})
    
        res.send({"data":"OK"})
    },
    async comment(req, res, next){
        const temp=req.body
        let query = await Customer.findOne({ 'Email': temp.email })
        await Product.findOneAndUpdate({"_id":temp.itemid},{$push:{comments:{customer_id:query._id,name:query.Name,time:temp.date,content:temp.comment}}})
        res.send({"data":"OK"})
    },
    async cart(req, res, next){
        const temp=req.body
        const result = await Customer.findOneAndUpdate(
            {  'Email': temp.email, 'cart.product_id':temp.itemid},
            { $inc: { "cart.$[outer].quantity": temp.quantity} },
            { "arrayFilters": [{"outer.product_id": temp.itemid}]},
        )
        if (!result){
            console.log(temp)
            await Customer.findOneAndUpdate(
                { 'Email': temp.email },
                {$push:{cart:{product_id:temp.itemid,quantity:temp.quantity}}}
                )
        }
        res.send({"data":"OK"})
    },
    async removeItem(req, res, next){
        const temp=req.body
        await Customer.findOneAndUpdate(
            {  'Email': temp.email},
            { $pull: { cart : { "product_id" :  temp.itemid} } }
        )
        res.send({"data":"OK"})
    },
}

module.exports=postFunctions
