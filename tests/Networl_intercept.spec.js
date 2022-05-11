const {test, expect,request} = require('@playwright/test')
const {APIUtilies} = require('../Utilies/APIUtilies')

const loginPayload = {userEmail:"firstlastname@gmail.com",userPassword:"RKrishna@4I8"};
const createOrderpayload = {orders:[{country:"Switzerland",productOrderedId:"6262e990e26b7e1a10e89bfa"}]}
const fakebody = {data:[],message:"No Orders"};

var logintoken ;
var orderID;
var APIContext ;


test('@API network resposne alter', async({page}) => {
    APIContext = await request.newContext();
    const aps = new APIUtilies(APIContext,loginPayload);
    logintoken = await aps.getToken();

    console.log("Logintoken " + logintoken)
    page.addInitScript( temp => {
        window.localStorage.setItem("token",temp);
    },logintoken);

    await page.goto("https://rahulshettyacademy.com/client")
    

    const orderid = await aps.createORDER_API(createOrderpayload)
    console.log("order ID retrived from "+orderid)
   // await page.pause();

   //Network Interception

   await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/626fbca3e26b7e1a10e98a45",
   async route=>{

   const response = await page.request.fetch(route.request())
   let body= JSON.stringify(fakebody)
    route.fulfill({
    response,
    body,
   })
   })

    await page.locator("[routerlink='/dashboard/myorders']").click()
    //await page.pause()
    
    console.log(await page.locator(".mt-4.ng-star-inserted").textContent())
})
