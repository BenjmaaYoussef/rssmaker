const puppeteer = require('puppeteer');

async function scrapeUrl(url) {
    await puppeteer.createBrowserFetcher().download(
        puppeteer.PUPPETEER_REVISIONS.chromium
    );
    const browser = await puppeteer.launch({ headless: false });
    const [page] = await browser.pages();

    await page.goto(url, { waitUntil: 'networkidle0', timeout: 0 });
    const data = await page.evaluate(() => document.querySelector('*').outerHTML);
    await browser.close();
    return data;
}

exports.scrapeUrl = scrapeUrl;