class Loginpage{

    constructor(page){
        console.log("page objects in login page constructor")
        this.page = page;
        this.username = page.locator('#userEmail')
        this.pasword = page.locator('#userPassword')
        this.signin = page.locator("[type*='submit']")
    }

    async login(username,password){
        await this.username.type(username)
        await this.pasword.fill(password)
        await this.signin.click()
    }

    async Goto(){
        await this.page.goto("https://rahulshettyacademy.com/client/");
    }
}

module.exports = {Loginpage}