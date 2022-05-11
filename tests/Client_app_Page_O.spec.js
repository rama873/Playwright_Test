const {test, expect} = require('@playwright/test')
const {POManager} = require('../PageObjects/POManager')
const Datasete = JSON.parse(JSON.stringify(require('../Utilies/TestData.json')))


for(const data of Datasete){
test(`@web clientapp test for ${data.productname}`, async ({page})=>{

    const PageManger = new POManager(page, expect)

    //Login Page
    const loginpage = PageManger.loginpage
    await loginpage.Goto()
    await loginpage.login(data.username,data.password)

    await page.waitForLoadState('networkidle');

    //Dashboard page
    
    const dasboardPage= PageManger.dasboardPageObject()

    await dasboardPage.SearchProductandAdd(data.productname)
    await dasboardPage.NavigatetoCart()

   //checkout and payment
   const checkout =  PageManger.checkoutObject()
   const orderid = await checkout.GotoCart_and_Checkout(data.productname);

   //-- MyOrders page
   const orderpage = PageManger.orderpageObject()
   orderpage.check_my_orders(orderid)
})

}