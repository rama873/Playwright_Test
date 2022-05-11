const {test, expect,request} = require('@playwright/test')
const {APIUtilies} = require('../Utilies/APIUtilies')

const loginPayload = {userEmail:"testdheu44@gmail.com",userPassword:"RKrishna@4I8"};
const createOrderpayload = {orders:[{country:"Switzerland",productOrderedId:"6262e990e26b7e1a10e89bfa"}]}
const fakebody = {data:[],message:"No Orders"};

var logintoken ;
var orderID;
var APIContext ;


test('@API network request alter', async({page}) => {
    APIContext = await request.newContext();
    const aps = new APIUtilies(APIContext,loginPayload);
    logintoken = await aps.getToken();

    console.log("Logintoken " + logintoken)
    page.addInitScript( temp => {
        window.localStorage.setItem("token",temp);
    },logintoken);


    await page.goto("https://rahulshettyacademy.com/client")
    //await page.pause()

    //const orderid = await aps.createORDER_API(createOrderpayload)
    //console.log("order ID retrived from "+orderid)
   // await page.pause();

   //Network Interception

   await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6278f1d2e26b7e1a10ea5031",
   async route=> route.continue({
       url:'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6278eb71e26b7e1a10ea4e93'
   
       }    ))

   
    await page.locator("[routerlink='/dashboard/myorders']").click()
    await page.locator("button:has-text('View')").first().click()
    //await page.pause()
    
    //console.log(await page.locator(".mt-4.ng-star-inserted").textContent())
})
