class MyOrdersPage{

    constructor(page,expect){
        this.expect = expect
        this.page = page
        this.OrderPage = page.locator("label[routerlink='/dashboard/myorders']")
        this.Orderspage_header = page.locator("h1[class='ng-star-inserted']")
        this.orders_table = page.locator("tbody >> tr")
        this.order_ID = page.locator(".col-text.-main")

        
    }

    async check_my_orders(orderid){
        
        await Promise.all(
            [
                 this.page.waitForNavigation(),
                 await this.OrderPage.click()
            ]
        );

        await this.expect(this.Orderspage_header).toHaveText("Your Orders")
     
        var values = this.orders_table
     
        var totalorders = await values.locator("th").count();
        console.log(totalorders)
        for(var i=totalorders-1;i>0;i--){ 
        
         if((await values.locator("th").nth(i).textContent()).trim() == orderid){
             await values.nth(i).locator("text='View'").first().click()
            break;
         }
        }
        await this.expect(this.order_ID).toHaveText(orderid)

        console.log(orderid+" Order ID is Displaying in the My orders page")
    }
}

module.exports = {MyOrdersPage}