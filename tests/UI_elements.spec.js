const {test, expect} = require('@playwright/test')


test('browser test', async ({browser})=>{
console.log("test")
const contexts = await browser.newContext()
const pages = await contexts.newPage();
await pages.goto("https://www.amazon.in/")
console.log(await pages.title())
await expect(pages).toHaveTitle("Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More - Amazon.in")
//pages.close()
browser.close()
})



test('@web basic page test', async ({page})=>{
    const username = page.locator('#username')
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    console.log(await page.title())
    //await expect(page.title()).toContain("Online")

    await  username.type("Test")
    await  page.locator("[name='password']").type("learning")
    await page.locator('#signInBtn').click()
    var actual =  await (page.locator("[style*='block']").textContent());
    console.log("test "+actual)
    await expect(actual).toContain("username/password.")

    await username.fill("")
    await username.fill("rahulshettyacademy")

    await Promise.all(
        [
             page.waitForNavigation(),
             page.locator('#signInBtn').click(),
        ]
    );
    

//console.log(await page.locator("app-card.col-lg-3.col-md-6.mb-3:first-of-type h4 a").textContent())

console.log(await page.locator(".card-body a").allTextContents())

})

test('More Ui elements',async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
   // await page.pause();
    await page.locator('select.form-control').selectOption("teach")
    await page.locator('.radiotextsty').last().click()
    await page.locator('#okayBtn').click()
    console.log(await page.locator('.radiotextsty').last().isChecked())
    expect(await page.locator('.radiotextsty').last()).toBeChecked()

    await page.locator('#terms').click();
    console.log(await page.locator('#terms').isChecked())
    await page.locator('#terms').uncheck();
    expect(await page.locator('#terms').isChecked()).toBeFalsy()


})

test('Child window handles', async ({browser})=>{

    const context = await  browser.newContext();
    const pages =  await context.newPage()
    await pages.goto("https://rahulshettyacademy.com/loginpagePractise/")

    console.log("text "+ await pages.locator("[href*='documents-request']").textContent())
//await page.pause()
    const [newpage] = await Promise.all(
        [
            context.waitForEvent('page'),
            pages.locator("[href*='documents-request']").click()
        ]
    )

    console.log(await newpage.locator("div[class='container-fluid'] h2 span:nth-child(1)").textContent())
})



test('test', async ({ page }) => {

  // Go to https://www.google.com/
  await page.goto('https://www.google.com/');

  // Click [aria-label="Search"]
  await page.locator('[aria-label="Search"]').click();

  // Fill [aria-label="Search"]
  await page.locator('[aria-label="Search"]').fill('sweet dreams');

  // Press Enter
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://www.google.com/search?q=sweet+dreams&source=hp&ei=z9hwYo6mEKuar7wP1tyX8Ac&iflsig=AJiK0e8AAAAAYnDm30rUKOqzi43GU8p9KTdZzVjWqH1P&ved=0ahUKEwjOyYLC5sL3AhUrzYsBHVbuBX4Q4dUDCAc&uact=5&oq=sweet+dreams&gs_lcp=Cgdnd3Mtd2l6EAMyCwguEIAEELEDENQCMgsILhCABBCxAxCDATIFCAAQgAQyBQgAEIAEMggIABCABBCxAzIFCAAQgAQyBQgAEIAEMgsILhCABBCxAxDUAjIFCAAQgAQyCwguEIAEELEDENQCOg4IABCPARDqAhCMAxDlAjoOCC4QjwEQ6gIQjAMQ5QI6EQguEIAEELEDEIMBEMcBENEDOgsIABCABBCxAxCDAToICC4QsQMQgwE6CAgAELEDEIMBOgUILhCABDoICC4QgAQQsQM6CwguEIAEEMcBEKMCOgUIABCxAzoICAAQgAQQyQM6BQgAEJIDUJASWJgoYI0qaAFwAHgAgAFwiAHfCJIBAzkuM5gBAKABAbABCg&sclient=gws-wiz' }*/),
    page.locator('[aria-label="Search"]').press('Enter')
  ]);

  // Click text=ImagesSweet Dreams (Are Made Of This) (Official Video) - YouTubehttps://www.yout >> span >> nth=0
  await page.locator('text=ImagesSweet Dreams (Are Made Of This) (Official Video) - YouTubehttps://www.yout >> span').first().click();
  await expect(page).toHaveURL('https://www.youtube.com/watch?v=qeMFqkcPYcg');

  // Click .ytp-timed-markers-container
  await page.locator('.ytp-timed-markers-container').click();

  // Click [placeholder="Search"]
  await page.locator('[placeholder="Search"]').click();

  // Fill [placeholder="Search"]
  await page.locator('[placeholder="Search"]').fill('space song');

  // Press Enter
  await page.locator('[placeholder="Search"]').press('Enter');
  await expect(page).toHaveURL('https://www.youtube.com/results?search_query=space+song');


});