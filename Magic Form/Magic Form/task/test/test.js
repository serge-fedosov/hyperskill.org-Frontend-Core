import path from 'path';

const pagePath = path.join(import.meta.url, '../../src/index.html');
import {StageTest, correct, wrong, WrongAnswer} from 'hs-test-web';

class Test extends StageTest {

    page = this.getPage(pagePath)
    secondPage = this.getPage(pagePath)

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
        }),
        this.node.execute(async () => {
            const submitButton = await this.page.findById("submit-button");
            if (submitButton == null) {
                return wrong("Can't find a button with 'submit-button' id!")
            }

            await submitButton.clickForNavigation({timeout: 1500}).catch(ignored => {
            })

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
                    throw new WrongAnswer("All input fields should be empty after submitting the form " +
                        "by clicking on button with 'submit-button' id!")
                }
            })

            return correct()
        }),
        this.node.execute(async () => {
            this.historyLinkButton = await this.page.findById('history-link')
            this.submitFormLinkButton = await this.page.findById('form-link')

            await this.historyLinkButton.clickForNavigation({timeout: 1500}).catch(err => {
                throw new WrongAnswer("After clicking on history link with 'history link' id " +
                    "the app should navigate to another page!")
            })

            return correct()
        }),
        this.node.execute(async () => {
            const history = await this.page.findAllByClassName("submit-history-card")
            if (history.length !== 1) {
                return wrong("On the history page expected 1 div block with 'submit-history-card' class" +
                    " after submitting the form!")
            }

            const card = history[0];

            const firstNameField = await card.findByClassName('card-first-name');
            if (firstNameField == null) {
                return wrong("Can't find element with 'card-first-name' inside of the history " +
                    "card with 'submit-history-card' class!")
            }
            const firstNameTextContent = await firstNameField.textContent();
            if (firstNameTextContent !== 'Monica') {
                return wrong("Element with 'card-first-name' class has wrong text content!\n" +
                    "Expected: Monica\n" +
                    "Found: " + firstNameTextContent)
            }

            const lastNameField = await card.findByClassName('card-last-name');
            if (lastNameField == null) {
                return wrong("Can't find element with 'card-last-name' inside of the history " +
                    "card with 'submit-history-card' class!")
            }
            const lastNameTextContent = await lastNameField.textContent();
            if (lastNameTextContent !== 'Meyers') {
                return wrong("Element with 'card-last-name' class has wrong text content!\n" +
                    "Expected: Meyers\n" +
                    "Found: " + lastNameTextContent)
            }

            const emailField = await card.findByClassName('card-email');
            if (emailField == null) {
                return wrong("Can't find element with 'card-email' inside of the history " +
                    "card with 'submit-history-card' class!")
            }
            const emailTextContent = await emailField.textContent();
            if (emailTextContent !== 'test@gmail.com') {
                return wrong("Element with 'card-email' class has wrong text content!\n" +
                    "Expected: test@gmail.com\n" +
                    "Found: " + emailTextContent)
            }

            const phoneField = await card.findByClassName('card-phone');
            if (phoneField == null) {
                return wrong("Can't find element with 'card-phone' inside of the history " +
                    "card with 'submit-history-card' class!")
            }
            const phoneTextContent = await phoneField.textContent();
            if (phoneTextContent !== '12345678') {
                return wrong("Element with 'card-phone' class has wrong text content!\n" +
                    "Expected: 12345678\n" +
                    "Found: " + phoneTextContent)
            }

            const companyField = await card.findByClassName('card-company');
            if (companyField == null) {
                return wrong("Can't find element with 'card-company' inside of the history " +
                    "card with 'submit-history-card' class!")
            }
            const companyTextContent = await companyField.textContent();
            if (companyTextContent !== 'Hyperskill') {
                return wrong("Element with 'card-company' class has wrong text content!\n" +
                    "Expected: Hyperskill\n" +
                    "Found: " + companyTextContent)
            }

            const addressField = await card.findByClassName('card-address');
            if (addressField == null) {
                return wrong("Can't find element with 'card-address' inside of the history " +
                    "card with 'submit-history-card' class!")
            }
            const addressTextContent = await addressField.textContent();
            if (addressTextContent !== '4733 Reppert Coal Road, Southfield, Michigan') {
                return wrong("Element with 'card-address' class has wrong text content!\n" +
                    "Expected: 4733 Reppert Coal Road, Southfield, Michigan\n" +
                    "Found: " + addressTextContent)
            }

            return correct()
        }),
        this.node.execute(async () => {

            await this.submitFormLinkButton.clickForNavigation({timeout: 1500}).catch(err => {
                throw new WrongAnswer("After clicking on the Form link button with 'form-link' id " +
                    "you should navigate to another page!")
            })

            await this.firstNameInput.inputText('First name');
            await this.lastNameInput.inputText('Last name');
            await this.email.inputText('Email');
            await this.phone.inputText('Phone');
            await this.company.inputText('Company');
            await this.address.inputText('Address');

            const submitButton = await this.page.findById("submit-button");
            await submitButton.clickForNavigation({timeout: 1500}).catch(ignored => {
            })

            return correct()
        }),
        this.node.execute(async () => {

            await this.historyLinkButton.clickForNavigation({timeout: 1500}).catch(err => {
                throw new WrongAnswer("After clicking on history link with 'history link' id" +
                    "the app should navigate to another page!")
            })

            const history = await this.page.findAllByClassName("submit-history-card")
            if (history.length !== 2) {
                return wrong("On the history page expected 2 div block with 'submit-history-card' class" +
                    " after submitting the form!")
            }

            return correct();
        }),
        this.node.execute(async () => {
            let history = await this.page.findAllByClassName("submit-history-card")

            const firstCard = history[0]

            const deleteButton = await firstCard.findBySelector('button.delete-button');

            if (deleteButton == null) {
                return wrong("Each submit history card should contain a button with 'delete-button' class")
            }

            await deleteButton.clickForNavigation({timeout: 500}).catch(() => {})

            history = await this.page.findAllByClassName("submit-history-card")
            if (history.length !== 1) {
                return wrong("After clicking on delete button the card element should be removed from the DOM!")
            }

            await this.submitFormLinkButton.clickForNavigation({timeout: 1500}).catch(err => {
                throw new WrongAnswer("After clicking on the Form link button with 'form-link' id " +
                    "you should navigate to another page!")
            })

            return correct()
        }),
        this.node.execute(async () => {
            await this.secondPage.open();

            const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

            const firstPageFirstNameField = await this.page.findBySelector("input[name='first-name']");
            const firstPagePhoneField = await this.page.findBySelector("input[name='phone']");
            const firstPageAddressField = await this.page.findBySelector("input[name='address']");

            const secondPageFirstNameField = await this.secondPage.findBySelector("input[name='first-name']");
            const secondPagePhoneField = await this.secondPage.findBySelector("input[name='phone']");
            const secondPageAddressField = await this.secondPage.findBySelector("input[name='address']");

            await firstPageFirstNameField.inputText('Test first name');
            await sleep(300)
            const secondPageFirstNameValue = await secondPageFirstNameField.getProperty('value');
            if (secondPageFirstNameValue !== 'Test first name') {
                return wrong("Looks like input fields values doesn't sync within different tabs!")
            }

            await secondPageAddressField.inputText('Test address');
            await sleep(300)
            const firstPageAddressValue = await firstPageAddressField.getProperty('value');
            if (firstPageAddressValue !== 'Test address') {
                return wrong("Looks like input fields values doesn't sync within different tabs!")
            }

            await firstPagePhoneField.inputText('Test phone');
            await sleep(300)
            const secondPagePhoneValue = await secondPagePhoneField.getProperty('value');
            if (secondPagePhoneValue !== 'Test phone') {
                return wrong("Looks like input fields values doesn't sync within different tabs!")
            }

            return correct()
        })
    ]
}

it("Test stage", async () => {
        await new Test().runTests()
    }
).timeout(30000);
