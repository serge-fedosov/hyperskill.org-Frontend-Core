import path from 'path';

const pagePath = path.join(import.meta.url, '../../src/index.html');
import {StageTest, correct, wrong, WrongAnswer} from 'hs-test-web';

class Test extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.node.execute(async () => {
            this.firstNameInput = await this.page.findBySelector("input[name='first-name']");
            if (this.firstNameInput == null) {
                return wrong("Can't find input tag with name 'first-name'!")
            }

            this.lastNameInput = await this.page.findBySelector("input[name='last-name']");
            if (this.lastNameInput == null) {
                return wrong("Can't find input tag with name 'last-name'!")
            }

            this.email = await this.page.findBySelector("input[name='email']");
            if (this.email == null) {
                return wrong("Can't find input tag with name 'email'!")
            }

            this.phone = await this.page.findBySelector("input[name='phone']");
            if (this.phone == null) {
                return wrong("Can't find input tag with name 'phone'!")
            }

            this.company = await this.page.findBySelector("input[name='company']");
            if (this.company == null) {
                return wrong("Can't find input tag with name 'company'!")
            }

            this.address = await this.page.findBySelector("input[name='address']");
            if (this.address == null) {
                return wrong("Can't find input tag with name 'address'!")
            }

            const submitButton = await this.page.findById("submit-button");
            if (submitButton == null) {
                return wrong("Can't find a button with 'submit-button' id!")
            }

            return correct()
        }),
        this.node.execute(async () => {
            this.navbar = await this.page.findBySelector("nav");
            if (this.navbar == null) {
                return wrong("Can't find <nav> element!");
            }

            this.submitFormNavButton = await this.navbar.findBySelector("a#form-link");
            if (this.submitFormNavButton == null) {
                return wrong("Can't find <a> tag with '#form-link' id inside of the <nav> tag!")
            }

            this.historyNavButton = await this.navbar.findBySelector("a#history-link");
            if (this.historyNavButton == null) {
                return wrong("Can't find <a> tag with '#history-link' id inside of the <nav> tag!")
            }

            return correct();
        }),
        this.node.execute(async () => {
            const values = [
                await this.firstNameInput.getProperty('value'),
                await this.lastNameInput.getProperty('value'),
                await this.email.getProperty('value'),
                await this.phone.getProperty('value'),
                await this.company.getProperty('value'),
                await this.address.getProperty('value'),
            ]

            values.forEach(value => {
                if (value !== '') {
                    throw new WrongAnswer("All input fields should be empty at the beginning!")
                }
            })

            return correct()
        }),
        this.node.execute(async () => {
            const testFirstName = 'Monica'
            await this.firstNameInput.inputText(testFirstName)
            await this.page.refresh()

            let firstNameValue = await this.firstNameInput.getProperty('value')
            if (firstNameValue !== testFirstName) {
                return wrong("After reloading the page, input field with name 'first-name' has wrong value!\n" +
                    "Expected: '" + testFirstName + "'\n" +
                    "Found: '" + firstNameValue + "'")
            }

            const testLastName = 'Meyers'
            await this.lastNameInput.inputText(testLastName)
            await this.page.refresh()

            let lastNameValue = await this.lastNameInput.getProperty('value')
            if (lastNameValue !== testLastName) {
                return wrong("After reloading the page, input field with name 'last-name' has wrong value!\n" +
                    "Expected: '" + testLastName + "'\n" +
                    "Found: '" + lastNameValue + "'")
            }

            const testEmail = 'test@gmail.com'
            await this.email.inputText(testEmail)
            await this.page.refresh()

            let emailValue = await this.email.getProperty('value')
            if (emailValue !== testEmail) {
                return wrong("After reloading the page, input field with name 'email' has wrong value!\n" +
                    "Expected: '" + testEmail + "'\n" +
                    "Found: '" + emailValue + "'")
            }

            const testPhone = '12345678'
            await this.phone.inputText(testPhone)
            await this.page.refresh()

            let phoneValue = await this.phone.getProperty('value')
            if (phoneValue !== testPhone) {
                return wrong("After reloading the page, input field with name 'phone' has wrong value!\n" +
                    "Expected: " + testPhone + "'\n" +
                    "Found: '" + phoneValue + "'")
            }

            const testCompany = 'Hyperskill'
            await this.company.inputText(testCompany)
            await this.page.refresh()

            let companyValue = await this.company.getProperty('value')
            if (companyValue !== testCompany) {
                return wrong("After reloading the page, input field with name 'company' has wrong value!\n" +
                    "Expected: " + testCompany + "'\n" +
                    "Found: '" + companyValue + "'")
            }

            const testAddress = '4733 Reppert Coal Road, Southfield, Michigan'
            await this.address.inputText(testAddress)
            await this.page.refresh()

            let addressValue = await this.address.getProperty('value')
            if (addressValue !== testAddress) {
                return wrong("After reloading the page, input field with name 'address' has wrong value!\n" +
                    "Expected: " + testAddress + "'\n" +
                    "Found: '" + addressValue + "'")
            }

            // test a couple of the previous fields
            firstNameValue = await this.firstNameInput.getProperty('value')
            if (firstNameValue !== 'Monica') {
                return wrong("After reloading the page, input field with name 'first-name' has wrong value!\n" +
                    "Expected: 'Monica'\n" +
                    "Found: '" + firstNameValue + "'")
            }

            phoneValue = await this.phone.getProperty('value')
            if (phoneValue !== testPhone) {
                return wrong("After reloading the page, input field with name 'phone' has wrong value!\n" +
                    "Expected: " + testPhone + "'\n" +
                    "Found: '" + phoneValue + "'")
            }

            return correct();
        })
    ]
}

it("Test stage", async () => {
        await new Test().runTests()
    }
).timeout(30000);
