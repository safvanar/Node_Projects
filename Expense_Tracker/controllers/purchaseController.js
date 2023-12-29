const Razorpay = require('razorpay')
const Order = require('../models/orders')

exports.getPremiumMembership = (req, res, next) => {
    try{
        console.log("UserId >>>>>>>>> ", req.user.id)
        console.log("KeyId >>>>>>>> ", process.env.RAZORPAY_KEY_ID)
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