class APIUtilies

{

constructor(APIContext,loginPayload){
    console.log("Executing constructor")
 this.APIContext =APIContext;
 this.loginPayload = loginPayload;

}




 async getToken(){
    console.log(await this.loginPayload);
    const loginresponse = await this.APIContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
        data: await this.loginPayload
    }
    )
 console.log( (await loginresponse.json()))

    const resposnetoken = await loginresponse.json()
    return await resposnetoken.token;
    
 }

 async createORDER_API(createOrderpayload){
    
    const orderapiresposne = await this.APIContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
        data: await createOrderpayload,
        headers:{
          'Authorization': await this.getToken(),
          'Content-Type':'application/json'
        }
    },
    )
    console.log(orderapiresposne.status()+ "-----"+(await orderapiresposne.text()).toString() + "----"+orderapiresposne.url()   )
    console.log("response of order API "+ (await orderapiresposne.json()));
    const resposneorderjson =await  orderapiresposne.json();
    return  await resposneorderjson.orders[0];
     
    
 }




}

module.exports = {APIUtilies}
