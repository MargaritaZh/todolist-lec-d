
//
// describe('addItemForm', () => {
//
//     it('base example, visually looks correct', async () => {
//         // APIs from jest-puppeteer
//         // await page.goto('http://localhost:6006/iframe.html?args=&id=todolists-additemform--add-item-form-story&viewMode=story',
//         //     {waitUntil: "networkidle2"});
//
//         const image = await page.screenshot();
//
//         // API from jest-image-snapshot
//         expect(image).toMatchImageSnapshot();
//     });
//
// });

import puppeteer from 'puppeteer';

describe('addItemForm', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch();
        page = await browser.newPage();
    });

    afterAll(async () => {
        await browser.close();
    });

    it('base example, visually looks correct', async () => {
        await page.goto('http://localhost:6006/ iframe.html?id=additemform-component--add-item-form-base-example', {waitUntil: "networkidle2"});
        const image = await page.screenshot();
        expect(image).toMatchImageSnapshot();
    });
});