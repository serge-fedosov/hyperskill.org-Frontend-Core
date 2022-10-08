const path = require('path');
const pagePath = 'file://' + path.resolve(__dirname, '../src/index.html');
const {StageTest, correct, wrong} = require('hs-test-web');

class SpaceTestT extends StageTest {
    
    page = this.getPage(pagePath)
    
    tests = [
        this.page.execute(),
        this.page.execute(),
        this.page.execute()
    ]
    
}

class SpaceTest extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.page.execute(() => {
            let body = document.getElementsByTagName("body")[0];
            if (!(body.children.length === 1 &&
                body.children[0].tagName.toLowerCase() === 'div' &&
                body.children[0].className === 'space')
            ) return wrong("There are some mismatches with suggested structure or naming")

            let space = body.children[0];
            if (!(space.children.length === 1 &&
                space.children[0].tagName.toLowerCase() === 'div' &&
                space.children[0].className === 'planet-area')
            ) return wrong("There are some mismatches with suggested structure or naming")

            let planetArea = space.children[0];
            if (!(planetArea.children.length === 2 &&
                planetArea.children[0].tagName.toLowerCase() === 'img' &&
                planetArea.children[1].tagName.toLowerCase() === 'img' && (
                    planetArea.children[0].className === 'planet' && planetArea.children[1].className === 'rocket' ||
                    planetArea.children[1].className === 'planet' && planetArea.children[0].className === 'rocket'))
            ) return wrong("There are some mismatches with suggested structure or naming")

            return correct()
        }),
        this.page.execute(() => {
            let space = document.body.getElementsByClassName("space");
            if (space.length === 0) return wrong("There no element with class='space'");

            let spaceBg = window.getComputedStyle(space[0]).backgroundImage;
            if (!spaceBg) return  wrong("The element with class='space' should have background-image.");

            return correct();
        }),
        this.page.execute(() => {
            const planet = document.body.getElementsByClassName("planet");
            const rocket = document.body.getElementsByClassName("rocket");

            if (planet.length === 0) return wrong("There no element with class='planet'");
            if (rocket.length === 0) return wrong("There no element with class='rocket'");

            const planetTop = parseInt(window.getComputedStyle(planet[0]).top);
            const rocketTop = parseInt(window.getComputedStyle(rocket[0]).top);

            if (planetTop > rocketTop + 300) return  wrong("The rocket element is placed too low");

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
