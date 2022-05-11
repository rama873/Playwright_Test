const {test, expect} = require('@playwright/test')

let webcontext;

test.beforeAll( async ({browser})=>{
    console.log("test")
    const contexts = await browser.newContext()
    const page = await contexts.newPage();
    const username = page.locator('#userEmail')
    const pasword = page.locator('#userPassword')
    await page.goto("https://rahulshettyacademy.com/client/")

    await username.type("firstlastname@gmail.com")
    await pasword.fill("RKrishna@4I8")
    await page.locator("[type*='submit']").click()
    await page.waitForLoadState('networkidle')
    await contexts.storageState({path:'state.json'});
   
   
   
    })

    test('New storage test', async({browser})=>{

    webcontext= await browser.newContext({storageState:'state.json'})
    const page = await webcontext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/")
    const titles = (await page.locator(".card-body b").allTextContents())
    console.log(titles)

    //ZARA COAT 3
    const productname = "iphone 13 pro"
    const products = page.locator('.card-body')
    
    
    var counts = await products.count()
    for(var i=0;i< counts;i++){
     if(await products.nth(i).locator("b").textContent() == (productname)){
         console.log(products.nth(i).locator("b").textContent())
        products.nth(i).locator("text= Add To Cart").click()
        break;
     }
    }
   //await page.pause()
    await page.locator("button[class='btn btn-custom'] label").waitFor()
    const value = await page.locator("button[class='btn btn-custom'] label").textContent()
    expect(value).toEqual("1")

    await page.locator("button[class='btn btn-custom'] label").click()

    await page.locator("div li").last().waitFor();
    const cartpage = await page.locator("h3:has-text('iphone 13 pro')").isVisible()
    console.log(cartpage)
    expect(cartpage).toBeTruthy()

    
    // await Promise.all(
    //     [
    //          page.waitForNavigation(),
    //          await page.locator(".totalRow button[type='button']").click()
    //     ]
    // );

    await page.locator(".totalRow button[type='button']").click()
    //await page.locator("[placeholder='Select Country']").click()
    await page.locator("[placeholder='Select Country']").type("Ind",{delay:3000})
   
    const countrydropdown = page.locator(".ta-results")
    await countrydropdown.waitFor();
    await page.waitForTimeout(5000)

    //await page.pause();
    const countryArray = await countrydropdown.locator("button").count()
    console.log(countryArray)

    for(var i=0;i< countryArray;i++){
        console.log(await countrydropdown.locator("button span").nth(i).textContent())
        if((await countrydropdown.locator("button span").nth(i).textContent()).trim() == "India" ){
            await countrydropdown.locator("button span").nth(i).click()
            break;
        }
      
    }
    

   const textbox =  page.locator("input[class$='input txt']")
   await textbox.first().type("123")
   await textbox.last().type("Rama krishna ")

   await page.locator(".action__submit").click()
   page.locator(".hero-primary").waitFor()
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")

   const test = (await page.locator("label[class='ng-star-inserted']").textContent()).split(" ")
   console.log(test)
   const orderid = test[2]
   await page.locator("label[routerlink='/dashboard/myorders']").click()
   
   await expect(page.locator("h1[class='ng-star-inserted']")).toHaveText("Your Orders")

   var values = page.locator("tbody >> tr")

   //await page.pause();
   var totalorders = await values.locator("th").count();
   console.log(totalorders)
   for(var i=totalorders-1;i>0;i--){ 
   
    if((await values.locator("th").nth(i).textContent()).trim() == orderid){

        await values.nth(i).locator("text='View'").first().click()
       break;
    }
   }
   await expect(page.locator(".col-text.-main")).toHaveText(orderid)
   
    })