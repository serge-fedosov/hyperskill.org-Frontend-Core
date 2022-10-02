import path from 'path';

const pagePath = path.join(import.meta.url, '../../src/index.html');
import {StageTest, correct, wrong} from 'hs-test-web';

class Test extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {
            const firstNameInput = await this.page.findBySelector("input[name='first-name']");
            if (firstNameInput == null) {
                return wrong("Can't find input tag with name 'first-name'!")
            }

            const lastNameInput = await this.page.findBySelector("input[name='last-name']");
            if (lastNameInput == null) {
                return wrong("Can't find input tag with name 'last-name'!")
            }

            const email = await this.page.findBySelector("input[name='email']");
            if (email == null) {
                return wrong("Can't find input tag with name 'email'!")
            }

            const phone = await this.page.findBySelector("input[name='phone']");
            if (phone == null) {
                return wrong("Can't find input tag with name 'phone'!")
            }

            const company = await this.page.findBySelector("input[name='company']");
            if (company == null) {
                return wrong("Can't find input tag with name 'company'!")
            }

            const address = await this.page.findBySelector("input[name='address']");
            if (address == null) {
                return wrong("Can't find input tag with name 'address'!")
            }

            const submitButton = await this.page.findById("submit-button");
            if (submitButton == null) {
                return wrong("Can't find a button with 'submit-button' id!")
            }

            return correct()
        }),
        this.node.execute(async () => {
            const navbar = await this.page.findBySelector("nav");
            if (navbar == null) {
                return wrong("Can't find <nav> element!");
            }

            const submitFormNavButton = await navbar.findBySelector("a#form-link");
            if (submitFormNavButton == null) {
                return wrong("Can't find <a> tag with '#form-link' id inside of the <nav> tag!")
            }

            const historyNavButton = await navbar.findBySelector("a#history-link");
            if (historyNavButton == null) {
                return wrong("Can't find <a> tag with '#history-link' id inside of the <nav> tag!")
            }

            return correct();
        })
    ]
}

it("Test stage", async () => {
        await new Test().runTests()
    }
).timeout(30000);
