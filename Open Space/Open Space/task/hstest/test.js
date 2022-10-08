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
            let controlPanelInner = controlPanel[0]
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
            const controlDeck = document.body.getElementsByClassName("control-panel");
            const space = document.body.getElementsByClassName("space");

            if (controlDeck.length === 0) return wrong("There no element with class='control-panel'");
            if (space.length === 0) return wrong("There no element with class='space'");

            const controlDeckTop = parseInt(window.getComputedStyle(controlDeck[0]).top);
            const spaceHeight = space[0].scrollHeight

            if (controlDeckTop < spaceHeight / 3) return wrong("The control panel element is placed too low");

            return correct();
        }),
        this.page.execute(() => {
            let controlDeck = document.getElementsByClassName("control-panel");
            if (controlDeck.length === 0) {
                return wrong("Can't find element with class=\"control-panel\"");
            }
            let controlDeckBgClr = window.getComputedStyle(controlDeck[0]).backgroundColor;
            if (!controlDeckBgClr) return wrong("The element with class='control-panel' should have background-color.");

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

