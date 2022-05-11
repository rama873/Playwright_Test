class Cart_Checkout{

    constructor(page,expect){
        this.page = page
        this.expect = expect
        this.cart_dashboard = page.locator("div li")
        this.checkout = page.locator(".totalRow button[type='button']")
        this.country = page.locator("[placeholder='Select Country']")
        this.country_drop = page.locator(".ta-results")
        this.cc_details = page.locator("input[class$='input txt']")
        this.payment_submit = page.locator(".action__submit")
        this.Thankyou_header = page.locator(".hero-primary")
        this.order_id = page.locator("label[class='ng-star-inserted']")
    }

    async GotoCart_and_Checkout(productname){

    await this.cart_dashboard.last().waitFor();
    
    const cartpage = await this.page.locator("h3:has-text('"+productname+"')").isVisible()
    console.log(cartpage)
    await this.expect(cartpage).toBeTruthy()

    await  this.checkout.click()
    await this.country.type("Ind",{delay:3000})
   
    const countrydropdown = this.country_drop
    await countrydropdown.waitFor();
    await this.page.waitForTimeout(5000)

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
    

   const textbox =  this.cc_details
   await textbox.first().type("123")
   await textbox.last().type("Rama krishna ")

   await this.payment_submit.click()
   this.Thankyou_header.waitFor()
   await this.expect(this.Thankyou_header).toHaveText(" Thankyou for the order. ")

   const test = (await this.order_id.textContent()).split(" ")
   console.log(test)
   return test[2];
    }

    async getcartproduct(productname){
        console.log("in product locator"+productname)
        return this.page.locator("h3:has-text(`"+productname+"`)")
    
    }
}

module.exports = {Cart_Checkout}