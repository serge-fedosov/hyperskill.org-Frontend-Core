const path = require('path');
const pagePath = 'file://' + path.resolve(__dirname, '../src/index.html');
const {StageTest, correct, wrong} = require('hs-test-web');

class SpaceTest extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.page.execute(() => {
            let body = document.getElementsByTagName("body")[0];
            if (!(body && body.children.length === 1 &&
                body.children[0].tagName.toLowerCase() === 'div' &&
                body.children[0].className === 'space')
            ) return wrong("There are some mismatches with suggested structure or elements naming")

            let space = body.children[0];
            if (!(space.children.length === 2 &&
                space.children[0].tagName.toLowerCase() === 'div' && space.children[1].tagName.toLowerCase() === 'div' &&
                (space.children[0].className === 'planet-area' && space.children[1].className === 'control-panel' ||
                    space.children[1].className === 'planet-area' && space.children[0].className === 'control-panel'))
            ) return wrong("There are some mismatches with suggested structure or elements naming on the space section level")

            let planetArea = document.getElementsByClassName('planet-area')
            if (planetArea.length === 0) {
                return wrong("Can't find element with class=\"planet-area\"");
            }
            if (!(planetArea[0].children.length === 2 &&
                planetArea[0].children[0].tagName.toLowerCase() === 'img' &&
                planetArea[0].children[1].tagName.toLowerCase() === 'img' && (
                    planetArea[0].children[0].className === 'planet' && planetArea[0].children[1].className === 'rocket' ||
                    planetArea[0].children[1].className === 'planet' && planetArea[0].children[0].className === 'rocket'))
            ) return wrong("There are some mismatches with suggested structure or elements naming in planet-area section")

            let controlPanel = document.getElementsByClassName('control-panel');
            if (controlPanel.length === 0) {
                return wrong("Can't find element with class=\"control-panel\"");
            }
            let controlPanelInner = Array.from(controlPanel[0].children)[0]
            if (!(controlPanelInner.children.length === 5 &&
                controlPanelInner.getElementsByTagName('input').length === 14 &&
                controlPanelInner.getElementsByTagName('div').length === 2
            )) return wrong("There are some mismatches with suggested structure or elements naming in control-panel section")

            return correct()
        }),
        this.page.execute(() => {
            let checkBtnsDiv = document.getElementsByClassName("check-buttons");
            if (checkBtnsDiv.length === 0) {
                return wrong("Can't find element with class=\"check-buttons\"");
            }
            let checkBtns = Array.from(checkBtnsDiv[0].children);
            checkBtns.forEach(el => {
                if (el.tagName.toLowerCase() !== 'input' || el.type.toLowerCase() !== 'checkbox') {
                    return wrong('Each element in the check-buttons div should be an input with checkbox type')
                }
            })

            return correct();
        }),
        this.page.execute(() => {
            let leversDiv = document.getElementsByClassName("levers");
            if (leversDiv.length === 0) {
                return wrong("Can't find element with class=\"levers\"");
            }
            let leversInputs = Array.from(leversDiv[0].children);
            leversInputs.forEach(el => {
                if (el.tagName.toLowerCase() !== 'input' || el.type.toLowerCase() !== 'range') {
                    return wrong('Each element in the levers div should be an input with range type')
                }
            })

            return correct();
        }),
        this.page.execute(() => {
            let space = document.getElementsByClassName("space");
            if (space.length === 0) {
                return wrong("Can't find element with class=\"space\"");
            }
            let spaceBg = window.getComputedStyle(space[0]).backgroundImage;
            if (!spaceBg) return wrong("The element with class='space' should have background-image.");

            return correct();
        }),
        this.page.execute(() => {
            let controlDeck = document.getElementsByClassName("control-panel")
            if (controlDeck.length === 0) {
                return wrong("Can't find element with class=\"control-panel\"");
            }
            let controlDeckBgImg = window.getComputedStyle(controlDeck[0]).backgroundImage;
            if (!controlDeckBgImg.toLowerCase().includes('linear-gradient')) return wrong("The element with class='control-panel' should have gradient background.");

            return correct();
        }),
        this.page.execute(() => {
            let checkBtnsDiv = document.getElementsByClassName("check-buttons")[0];
            let leversDiv = document.getElementsByClassName("levers")[0];

            let checkBtnsDivStyles = window.getComputedStyle(checkBtnsDiv);
            let leversDivStyles = window.getComputedStyle(leversDiv);

            if (checkBtnsDivStyles.display.toLowerCase() !== 'flex' || leversDivStyles.display.toLowerCase() !== 'flex') {
                return wrong('Elements check-buttons and levers should have display: flex property.')
            }

            if (checkBtnsDivStyles.flexDirection.toLowerCase() !== 'row' || leversDivStyles.flexDirection.toLowerCase() !== 'row') {
                return wrong('Elements check-buttons and levers should be positioned in a row.')
            }

            return correct();
        }),
        this.page.execute(() => {
            let leversDiv = document.getElementsByClassName('levers')[0];
            let levers = Array.from(leversDiv.getElementsByTagName('input'));
            levers.forEach(lever => {
                let leverStyle = window.getComputedStyle(lever);
                if (!leverStyle.transform) return wrong("All levers should be vertical.")
            })

            return correct();
        }),
        this.page.execute(() => {
            let controlPanelInner = document.getElementsByClassName('control-panel__inner');
            if (controlPanelInner.length === 0) {
                return wrong("Can't find element with class=\"control-panel__inner\"");
            }
            for (let el of Array.from(controlPanelInner[0].children)) {
                if (el.tagName.toLowerCase() === 'input' && el.type.toLowerCase() === 'password') {
                    let styles = window.getComputedStyle(el);
                    if (styles.color && styles.color !== 'rgb(0, 0, 0)' &&
                        styles.border && styles.border !== '2px inset rgb(0, 0, 0)')
                        return correct()
                    else return wrong("Password field's border and text color should be changed");
                }
            }

            return wrong("Can't find password field");
        }),
        this.page.execute(() => {
            let controlPanelInner = document.getElementsByClassName('control-panel__inner')[0];
            let counter = 0;
            for (let el of Array.from(controlPanelInner.children)) {
                if (el.tagName.toLowerCase() === 'input' && (el.type.toLowerCase() === 'submit' || el.type.toLowerCase() === 'button')) {
                    let styles = window.getComputedStyle(el);
                    if (styles.backgroundColor && styles.backgroundColor !== 'rgb(255, 255, 255)') {
                        counter++;
                    }

                }
            }

            return counter === 2
                ? correct()
                : wrong("Can't find 2 input fields with type=button or submit with changed background");
        }),
        this.page.execute(() => {
            let controlPanelInner = document.getElementsByClassName('control-panel__inner')[0];
            for (let el of Array.from(controlPanelInner.children)) {
                if (el.tagName.toLowerCase() === 'input' && (el.type.toLowerCase() === 'submit' || el.type.toLowerCase() === 'button')) {
                    let styles = window.getComputedStyle(el);
                    if (styles.backgroundColor && styles.backgroundColor !== 'rgb(0, 0, 0)' &&
                        styles.borderRadius && styles.borderRadius !== '0px') {
                        return correct();
                    }
                }
            }

            return wrong("Can't find the input with type=button or submit with specified border-radius");
        })
    ]

}

it('Test stage', async function () {
    try {
        this.timeout(30000)
    } catch (ignored) {
    }
    await new SpaceTest().runTests()
}, 30000)
