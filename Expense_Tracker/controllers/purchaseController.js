const Razorpay = require('razorpay')
const Order = require('../models/orders')
const User = require('../models/users')

exports.getPremiumMembership = async (req, res, next) => {
    try{
        const key_id = process.env.RAZORPAY_KEY_ID
        console.log("UserId >>>>>>>>> ", req.user.id)
        console.log("KeyId >>>>>>>> ", key_id)
        var rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        })
        const amount = 2500
        rzp.orders.create({amount, currency: "INR"}, async (err, order) => {
            if(err){
                throw new Error(JSON.stringify(err))
            }
            
            await req.user.createOrder({orderId: order.id, status: 'PENDING'})
            res.status(201).json({order, key_id: rzp.key_id})
        })
    }catch(err){
        console.log(err)
        res.status(403).json({message: 'something went wrong', error: err})
    }
}

exports.updateTransactionStatus = async (req, res, next) => {
    try{
        const paymentId = req.body.payment_id
        const orderId = req.body.order_id
        const order = await req.user.getOrders({where: {orderId: orderId}})
        console.log('PAYMENT ID: ', paymentId)
        order[0].paymentId = paymentId
        order[0].status ='COMPLETED'
        await order[0].save()
        await req.user.update({isPremiumUser: true})
        res.status(201).json({message: 'payment successful!'})
    }catch(err){
        console.log(err)
        res.status(403).json({message: 'updating transaction failed!', error: err})
    }
}