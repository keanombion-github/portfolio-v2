// Optional browser check: provide Playwright through NODE_PATH; uses installed Chrome.
/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS lets this optional runner use NODE_PATH without an app dependency. */
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3002';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, colorScheme: 'dark' });
    const page = await context.newPage();
    await page.goto(base);
    const dots = page.locator('.cursor-dots-spotlight');
    await dots.waitFor();
    await page.mouse.move(220, 200);
    await page.waitForFunction(() => Number(getComputedStyle(document.querySelector('.cursor-dots-spotlight')).opacity) > 0.5);
    const idlePosition = await dots.evaluate(el => el.style.getPropertyValue('--pointer-x'));
    assert.ok(parseFloat(idlePosition) > 0, 'Spotlight follows the pointer');

    const contact = page.locator('#contact').locator('..');
    await contact.scrollIntoViewIfNeeded();
    await page.waitForFunction(() => document.querySelector('#contact').parentElement.dataset.revealed === 'true');
    const card = page.locator('#projects a.project-card').first();
    await card.scrollIntoViewIfNeeded();
    await card.hover({ position: { x: 60, y: 80 } });
    await page.waitForFunction(() => {
      const angle = parseFloat(document.querySelector('.project-card').style.getPropertyValue('--card-rotate-y'));
      return Number.isFinite(angle) && angle !== 0;
    });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(() => getComputedStyle(document.querySelector('.cursor-dots-spotlight')).opacity === '0');
    assert.equal(await card.evaluate(el => getComputedStyle(el).transform), 'none', 'Reduced motion disables card transforms');
    assert.equal(await page.evaluate(() => document.querySelectorAll('[data-reveal]').length > 0), true);
    assert.equal(await page.evaluate(() => document.getAnimations().filter(a => a.playState === 'running').length), 0);
    await card.focus();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Shift+Tab');
    await card.press('Enter');
    await page.waitForURL('**/project/shiftledger');
    await page.goBack();
    await page.getByRole('link', { name: /View résumé/ }).waitFor();

    const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, colorScheme: 'light' });
    const phone = await mobile.newPage();
    await phone.goto(base);
    await phone.locator('#projects').scrollIntoViewIfNeeded();
    assert.equal(await phone.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, 'No horizontal overflow');
    assert.equal(await phone.locator('.cursor-dots-spotlight').evaluate(el => getComputedStyle(el).opacity), '0');
    await mobile.close();

    const noJs = await browser.newContext({ javaScriptEnabled: false });
    const plain = await noJs.newPage();
    await plain.goto(base);
    assert.equal(await plain.locator('#projects').isVisible(), true, 'No-JS content remains readable');
    assert.equal(await plain.locator('#projects a.project-card').count(), 6);
    await noJs.close();
    await context.close();
    console.log('PASS motion: spotlight, reveals, cards, reduced motion, navigation, mobile, no-JS');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
