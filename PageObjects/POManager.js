const {Loginpage} = require('./Loginpage')
const {DasboardPage} = require('./DasboardPage')
const {Cart_Checkout} = require('./Cart_Checkout')
const {MyOrdersPage} = require('./MyOrdersPage')

class POManager{

    constructor(page,expect){

        this.loginpage = new Loginpage(page);
        this.dasboardPage= new DasboardPage(page,expect)
        this.checkout = new Cart_Checkout(page,expect)
        this.orderpage = new MyOrdersPage(page,expect)
    }

    loginpageObject(){
        return this.loginpage
    }

    dasboardPageObject(){
        return this.dasboardPage
    }
    checkoutObject(){
        return this.checkout
    }
    orderpageObject(){
        return this.orderpage
    }
}


module.exports = {POManager}