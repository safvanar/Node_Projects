const fs = require('fs')
const path = require('path')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );

module.exports = class Cart {
    static addProduct(id, productPrice) {
        //fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 }
            if(!err){
                cart = JSON.parse(fileContent)
            }

            //Analyze the cart => find existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id)
            const existingProduct = cart.products[existingProductIndex]
            let updatedProduct

            //Add new product/ increase the quantity
            if(existingProduct){
                updatedProduct = {...existingProduct}
                updatedProduct.qty = updatedProduct.qty+1
                cart.products[existingProductIndex] = updatedProduct
            }else{
                updatedProduct = { id: id, qty: 1 }
                cart.products = [...cart.products, updatedProduct]
            }
            cart.totalPrice = cart.totalPrice + +productPrice //extra + to make productPrice a numeric value
            
            //writing the updated cart information to the file
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err)
            })
        })

    }

    static deleteProduct(id, productPrice){
        fs.readFile(p, (err, fileContent) => {
            if(err){
                return
            }
            const cart = JSON.parse(fileContent)
            const updatedCart = {...cart}
            const product = updatedCart.products.find(prod => prod.id === id)
            if(!product){
                return
            }
            const productQty = product.qty
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id)
            updatedCart.totalPrice = updatedCart.totalPrice - productQty * productPrice
            
            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err)
            })
        })
    }

    static getCart(cb){
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 }
            if(!err){
                cb(JSON.parse(fileContent))
            } else{
                cb(cart)
            }
        })
    }
}