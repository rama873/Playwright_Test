class DasboardPage{

    constructor(page,expect){
        this.page = page
        this.expect=expect
        this.Allproducts = page.locator(".card-body")
        this.cart = page.locator("button[class='btn btn-custom'] label")
    }

    async SearchProductandAdd(productname){

        const titles = (await this.Allproducts.allTextContents())
        console.log(titles)

        const products = this.Allproducts;
        
        var counts = await products.count()
        for(var i=0;i< counts;i++){
            console.log(await products.nth(i).locator("b").textContent())
         if(await products.nth(i).locator("b").textContent() == (productname)){
            await products.nth(i).locator("text= Add To Cart").click()
            break;
         }
        }
        
    }

    async NavigatetoCart(){
        await this.cart.waitFor()
        const value = await this.cart.textContent()
        this.expect(value).toEqual("1")
        
         await Promise.all(
         [
              this.page.waitForNavigation(),
              await this.cart.click()
         ]
     );
    
    }

}

module.exports = {DasboardPage}