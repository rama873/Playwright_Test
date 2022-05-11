const {test, expect,request} = require('@playwright/test')
const {APIUtilies} = require('../Utilies/APIUtilies')

const loginPayload = {userEmail:"firstlastname@gmail.com",userPassword:"RKrishna@4I8"};
const createOrderpayload = {orders:[{country:"Switzerland",productOrderedId:"6262e990e26b7e1a10e89bfa"}]}

var logintoken ;
var orderID;
var APIContext ;


test('@API web api login', async({page}) => {
    APIContext = await request.newContext();
    const aps = new APIUtilies(APIContext,loginPayload);
    logintoken = await aps.getToken();

    console.log("Logintoken " + logintoken)
    page.addInitScript( temp => {
        window.localStorage.setItem("token",temp);
    },logintoken);

    await page.goto("https://rahulshettyacademy.com/client")
    
    page.on('response',response => console.log(response.url(), response.status()))
    const orderid = await aps.createORDER_API(createOrderpayload)
    console.log("order ID retrived from "+orderid)
   // await page.pause();

    await page.locator("[routerlink='/dashboard/myorders']").click()
    
    await expect(page.locator("h1[class='ng-star-inserted']")).toHaveText("Your Orders")
 
    var values = page.locator("tbody >> tr")
 
   
    var totalorders = await values.locator("th").count();
    console.log(totalorders)
    for(var i=totalorders-1;i>0;i--){ 
    
     if((await values.locator("th").nth(i).textContent()).trim() == orderid){
 
         await values.nth(i).locator("text='View'").first().click()
        break;
     }
    }
    await expect(page.locator(".col-text.-main")).toHaveText(orderid)
    //await page.pause();
})
