const puppeteer = require('puppeteer');
const path = require('path');
const hs = require('hs-test-web');
const react = require('hs-test-web-server');

const sleep = (ms) => new Promise(res => setTimeout(res, ms));

async function stageTest() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args:['--start-maximized', '--disable-infobar'],
    ignoreDefaultArgs: ['--enable-automation'],
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:3010');

  page.on('console', msg => console.log(msg.text()));

  let result = await hs.testPage(page,
    // Test #1
    () => {
      if (document.getElementById('root').childNodes[0].tagName !== 'DIV') {
        return hs.wrong('The parent element inside the function App should be a "div".');
      }

      if (!document.querySelector('.main')) {
        return hs.wrong('Your function App should contain a div with the class "main".');
      }

      return hs.correct();
    },
    // Test #2
    () => {
      if (!document.querySelector('.main').hasChildNodes()) {
        return hs.wrong('Your main div should contain at least one element inside.');
      }

      return hs.correct();
    },
    // Test #3
    () => {
      if (document.querySelector('.main').childNodes[0].tagName !== 'H1') {
        return hs.wrong('The element inside the main div should be a "h1".');
      }

      return hs.correct();
    },
    // Test #4
    () => {
      if (document.querySelector('.main').childNodes.length !== 1) {
        return hs.wrong('There must be only one element inside the main div.');
      }

      return hs.correct();
    },
    // Test #5
    () => {
      if (!document.getElementsByTagName('h1')[0].innerText) {
        return hs.wrong('Your "h1" should not be empty.');
      }

      return hs.correct();
    }
  );

  await sleep(15000);
  await browser.close();
  return result;
}

jest.setTimeout(30000);
test("Test stage", async () => {
  let result = await react.startServerAndTest(
    'localhost', 3010, path.resolve(__dirname, '..'), stageTest
  );

  if (result['type'] !== 'correct') {
    throw new Error(result['message']);
  }
});
