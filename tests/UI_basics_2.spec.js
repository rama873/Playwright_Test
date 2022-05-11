const {test, expect} = require('@playwright/test')


test.describe.configure({mode:'parallel'});
test('@web More UI elements',async({page})=>{
await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
await page.goBack()
await page.goForward()

page.on('dialog',dialog=>dialog.accept())
expect(page.locator("#displayed-text")).toBeVisible()
await page.locator("#hide-textbox").click()
await page.locator("#hide-textbox").screenshot({path:'screenshot1.png'})
expect(page.locator("#displayed-text")).toBeHidden()
page.screenshot({path:'screenshot.png'})
//await page.pause()
await page.locator("#confirmbtn").click()

page.locator("#mousehover").hover()
const page_frame = page.frameLocator("#courses-iframe");
await page_frame.locator("li a[href*='lifetime']:visible").click()

//await page_frame.locator("page_frame").waitFor()
const text = await page_frame.locator(".text span").textContent();
console.log(text)
})

test('screenshot',async({page})=>{

    await page.goto("https://www.gettyimages.in/photos/google-play")
    expect(await page.screenshot()).toMatchSnapshot("landingpage.png");

})