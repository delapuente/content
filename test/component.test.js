const { createBrowser } = require('tib')
const { setup, loadConfig, url } = require('@nuxtjs/module-test-utils')

describe('component', () => {
  let nuxt, browser, page

  beforeAll(async () => {
    ({ nuxt } = (await setup(loadConfig(__dirname))))
    browser = await createBrowser('puppeteer')
  }, 60000)

  afterAll(async () => {
    await nuxt.close()
    await browser.close()
  })

  test('nuxt-content has generated html', async () => {
    page = await browser.page(url('/home'))
    const html = await page.getHtml()

    expect(html).toContain('<h1>Home</h1> <div class="nuxt-content"><p>This is the home page!</p></div>')
  })

  test('nuxt-content has rendered a Vue.js component', async () => {
    page = await browser.page(url('/vue-component'))
    const html = await page.getHtml()

    expect(html).toMatch(
      new RegExp(/<div>\s*<h1><\/h1>\s*<div class="nuxt-content">\s*<div>\s*<header>Header content<\/header>\s*<main>\s*Main content\s*<\/main>\s*<footer>Footer content<\/footer><\/div><\/div><\/div>/)
    )
  })
})
