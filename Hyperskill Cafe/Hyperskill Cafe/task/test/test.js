const path = require('path');
const pagePath = 'file://' + path.resolve(__dirname, '../src/index.html');

const {StageTest, correct, wrong} = require('hs-test-web');

class CafeTest extends StageTest {

    page = this.getPage(pagePath)

    tests = [
        this.page.execute(() => {
            // test #1
            let bodyNodes = Array.from(document.body.childNodes);
            this.innerBodyElements = bodyNodes.filter(
                e => e.nodeType === Node.ELEMENT_NODE);

            let len = this.innerBodyElements.length;
            const totalElements = 3;
            const errorMsg = `There should be ${totalElements} elements in the body of the HTML document, found: ${len}`;
            return len === totalElements ?
                correct() :
                wrong(errorMsg);
        }),
        this.page.execute(() => {
            // test #2
            const links = Array.from(document.head.querySelectorAll("link"));

            // if the link amount is not equal to 2
            let errorMsg = `There should be a link in the head of the HTML document, found: ${links.length}`;
            if (links.length < 1) return wrong(errorMsg);

            // check if href includes the substring for bootstrap link
            const linkBootstrap = "https://cdn.jsdelivr.net/npm/bootstrap@"
            const isBootstrapLinked = links.find(e => e.attributes
                .getNamedItem("href").value.includes(linkBootstrap));
            errorMsg = `Link the bootstrap css with the HTML document in the head.`;
            if (!isBootstrapLinked) return wrong(errorMsg);

            // check if body contains the bootstrap script tag
            const bootstrapScript = document.body.querySelector("script")
            const bootstrapSrc = bootstrapScript && bootstrapScript.getAttribute("src");
            errorMsg = `Link the bootstrap script with the HTML document in the body.`;
            if (!bootstrapScript || !bootstrapSrc ||  !bootstrapSrc.includes(linkBootstrap)) return wrong(errorMsg);

            return correct();
        }),
        this.page.execute(() => {
            // test #3
            // HEADER
            // check if header exist
            const header = document.body.querySelector("header");
            let errorMsg = "Header tag is missing in the body of the HTML document.";
            if (!header) return wrong(errorMsg);

            // NAV
            // check if nav exist
            const nav = document.body.querySelector("nav");
            errorMsg = "Nav tag is missing in the header.";
            if (!nav) return wrong(errorMsg);

            // check the classes of the nav
            const navClass = "navbar navbar-expand-lg navbar-light bg-light".split(" ");
            const navMissingClasses = navClass.filter(e => !nav.className.includes(e));
            errorMsg = `Nav tag is missing the correct Bootstrap class names: '${navMissingClasses}'`;
            if (navMissingClasses.length > 0) return wrong(errorMsg);

            // DIV
            // check if container div exist
            const div = nav.querySelector("div");
            errorMsg = "Nav tag is missing the inner wrapper container div tag.";
            if (!div) return wrong(errorMsg);

            // check if container div has the right class
            const divClass = "container-fluid"
            errorMsg = `Container nav tag is missing the right Bootstrap class: '${divClass}'`;
            if (!div.className.includes(divClass)) return wrong(errorMsg);

            // ANCHOR
            // check if navbar brand <a> exist
            const navBrand = div.querySelector("a");
            errorMsg = `Anchor tag is missing for navbar brand.`;
            if (!navBrand) return wrong(errorMsg);

            // check if <a> has the right class
            const navBrandClass = "navbar-brand";
            errorMsg = `Anchor tag is missing the right Bootstrap class for navbar brand: '${navBrandClass}'`;
            if (!navBrand.className.includes(navBrandClass)) return wrong(errorMsg);

            //check if <a> has the right link
            const homeLink = "#home";
            const navBrandHref = navBrand.getAttribute("href")
            errorMsg = `Anchor tag is missing the right href value for navbar brand. It should redirect to home.`;
            if (!navBrandHref || !navBrandHref.includes(homeLink)) return wrong(errorMsg);

            // check if <a> has the right text content
            const pageTitle = "Hyperskill Cafe";
            errorMsg = `Anchor tag is missing the right inner text for navbar brand: '${pageTitle}'`;
            if (!navBrand.innerText.includes(pageTitle)) return wrong(errorMsg);

            // BUTTON
            // check if navbar toggle button exist
            const navToggle = div.querySelector("button");
            errorMsg = "Button tag for toggling the navbar is missing in the container div tag.";
            if (!navToggle) return wrong(errorMsg);

            // check if toggle has the right class
            const navToggleClass = "navbar-toggler";
            errorMsg = `Button tag for toggling the navbar is missing the right Bootstrap class: '${navToggleClass}'`;
            if (!navToggle.className.includes(navToggleClass)) return wrong(errorMsg);

            // check if the toggle has the right type attr
            const navToggleType = navToggle.getAttribute("type");
            const type = "button";
            errorMsg = `Button tag for toggling the navbar is missing the right type attribute: ${navToggleType}`;
            if (!navToggleType || !navToggleType.includes(type)) return wrong(errorMsg);

            // check if the toggle has the right data-bs-toggle attr
            const navToggleData = navToggle.getAttribute("data-bs-toggle");
            const dataBsToggle = "collapse";
            errorMsg = `Button tag for toggling the navbar is missing the right data-bs-toggle attribute: ${dataBsToggle}`;
            if (!navToggleData || !navToggleData.includes(dataBsToggle)) return wrong(errorMsg);

            // check if the toggle has the right data-bs-target attr
            const navToggleDataTarget = navToggle.getAttribute("data-bs-target");
            const dataBsTarget = "#navbarSupportedContent";
            errorMsg = `Button tag for toggling the navbar is missing the right data-bs-target attribute: ${dataBsTarget}`;
            if (!navToggleDataTarget || !navToggleDataTarget.includes(dataBsTarget)) return wrong(errorMsg);

            // check if the toggle has the right aria-controls attr
            const navToggleAriaControls = navToggle.getAttribute("aria-controls");
            const ariaControls = "navbarSupportedContent";
            errorMsg = `Button tag for toggling the navbar is missing the right aria-control attribute: ${ariaControls}`;
            if (!navToggleAriaControls || !navToggleAriaControls.includes(ariaControls)) return wrong(errorMsg);

            // check if the toggle has the right aria-expanded attr
            const navToggleAriaExpanded = navToggle.getAttribute("aria-expanded");
            const ariaExpanded = "false";
            errorMsg = `Button tag for toggling the navbar is missing the right aria-expanded attribute: ${ariaExpanded}`;
            if (!navToggleAriaExpanded || !navToggleAriaExpanded.includes(ariaExpanded)) return wrong(errorMsg);

            // check if the toggle has the right aria-label attr
            const navToggleAriaLabel = navToggle.getAttribute("aria-label");
            const ariaLabel = "Toggle navigation";
            errorMsg = `Button tag for toggling the navbar is missing the right aria-label attribute: ${ariaLabel}`;
            if (!navToggleAriaLabel || !navToggleAriaLabel.includes(ariaLabel)) return wrong(errorMsg);

            // check if the toggle has the right inner span icon
            const spanIcon = navToggle.innerHTML.trim();
            const span = "<span class=\"navbar-toggler-icon\"></span>";
            errorMsg = `Button tag for toggling the navbar is missing the right inner span as the icon: ${span}`;
            if (!spanIcon.includes(span)) return wrong(errorMsg);

            // INNER WRAPPER DIV
            // check if inner div exist in container div
            const innerDiv = div.querySelector("div");
            errorMsg = `Div tag for wrapping the list of nav links is missing in the container div tag.`
            if (!innerDiv) return wrong(errorMsg);

            // check if inner div has the right class
            const innerDivClass = "collapse navbar-collapse".split(" ");
            const divMissingClasses = innerDivClass.filter(e => !innerDiv.className.includes(e));
            errorMsg = `Div tag for wrapping the list of nav links is missing the right Bootstrap classes: '${divMissingClasses}'`;
            if (divMissingClasses.length > 0) return wrong(errorMsg);

            // check if inner div has the right id
            const innerDivId = innerDiv.getAttribute("id");
            const id = "navbarSupportedContent";
            errorMsg = `Div tag for wrapping the list of nav links is missing the right id: ${id}`;
            if (!innerDivId || !innerDivId.includes(id)) return wrong(errorMsg);

            // UL LIST
            // check if ul list exist
            const ul = innerDiv.querySelector("ul");
            errorMsg = `Unordered list tag for wrapping the nav links is missing in the container div.`
            if (!ul) return wrong(errorMsg);

            // check if ul has the right class
            const ulClass = "navbar-nav ms-auto mb-2 mb-lg-0".split(" ");
            const ulMissingClasses = ulClass.filter(e => !ul.className.includes(e));
            errorMsg = `Unordered list tag for wrapping the nav links is missing the right Bootstrap class: '${ulMissingClasses}'`;
            if (ulMissingClasses.length > 0) return wrong(errorMsg);

            // LI LIST ITEM
            // check if 5 list item exist in ul
            const liArr = Array.from(ul.querySelectorAll("li"));
            errorMsg = `There should be 5 list item tags for each nav links, found: ${liArr.length}`;
            const liTotal = 5;
            if (liArr.length !== liTotal) return wrong(errorMsg);

            // check if all li has the right class
            const liClass = "nav-item";
            const liArrClass = liArr.filter(e => !e.className.includes(liClass))
            errorMsg = `All list item tags for each nav links should have the right Bootstrap class: '${liClass}'`;
            if (liArrClass.length > 0) return wrong(errorMsg);

            // HOME ANCHOR INSIDE LI
            // check if anchor exist for home in a li
            const aHome = liArr[0].querySelector("a");
            errorMsg = `First list item tag is missing the anchor tag.`;
            if (!aHome) return wrong(errorMsg);

            // check if the home anchor has the right class
            const aHomeClass = "nav-link active".split(" ");
            const aHomeMissingClasses = aHomeClass.filter(e => !aHome.className.includes(e));
            errorMsg = `First anchor tag for home is missing the right Bootstrap class: '${aHomeClass}'.`;
            if (aHomeMissingClasses.length > 0) return wrong(errorMsg);

            // check if the home anchor has the aria-current attr
            const ariaCurr = "page";
            const aHomeAria = aHome.getAttribute("aria-current");
            errorMsg = `First anchor tag for home is missing the right aria-current attribute: ${ariaCurr}.`;
            if (!aHomeAria || !aHomeAria.includes(ariaCurr)) return wrong(errorMsg);

            // check if the home anchor has the right href attr
            const homeHref = "#home";
            const aHomeHref = aHome.getAttribute("href");
            errorMsg = `First anchor tag for home is missing the right href attribute: ${homeHref}.`;
            if (!aHomeHref || !aHomeHref.includes(homeHref)) return wrong(errorMsg);

            // check if the home anchor has the right inner text
            const homeText = "Home";
            const aHomeText = aHome.innerText;
            errorMsg = `First anchor tag for home is missing the right inner text: ${homeText}.`;
            if (!aHomeText.includes(homeText)) return wrong(errorMsg);

            // REST OF THE ANCHORS IN LI
            // check if there are 4 additional anchors
            const links = liArr.filter(e => e.querySelector("a"));
            errorMsg = `There should be anchor tags inside each list item tags, found: ${links.length}.`;
            if (links.length !== liTotal) return wrong(errorMsg);

            // check if the rest of the anchors have the right class
            const aClass = "nav-link";
            const aClasses = liArr.filter(e => !e.querySelector("a").className.includes(aClass));
            errorMsg = `The anchor tags inside the list item tags should have the right Bootstrap class: '${aClass}'.`;
            if (aClasses.length > 0) return wrong(errorMsg);

            // ABOUT ANCHOR
            // check if about anchor has the right href
            const aAbout = liArr[1].querySelector("a")
            const aAboutHref = aAbout.getAttribute("href");
            const aboutHref = "#about";
            errorMsg = `The anchor tags for about should have the right href attribute: ${aboutHref}.`;
            if (!aAboutHref || !aAboutHref.includes(aboutHref)) return wrong(errorMsg);

            // check if about anchor has the right inner text
            const aboutText = "About";
            const aAboutText = aAbout.innerText;
            errorMsg = `The anchor tags for about should have the right inner text: ${aboutText}.`;
            if (!aAboutText.includes(aboutText)) return wrong(errorMsg);

            // PRODUCTS ANCHOR
            // check if products anchor the right href
            const aProducts = liArr[2].querySelector("a");
            const aProductsHref = aProducts.getAttribute("href");
            const productsHref = "#products";
            errorMsg = `The anchor tags for products should have the right href attribute: ${productsHref}.`;
            if (!aProductsHref || !aProductsHref.includes(productsHref)) return wrong(errorMsg);

            // check if products anchor has the right inner text
            const productsText = "Products";
            const aProductsText = aProducts.innerText;
            errorMsg = `The anchor tags for products should have the right inner text: ${productsText}.`;
            if (!aProductsText.includes(productsText)) return wrong(errorMsg);

            // REVIEWS ANCHOR
            // check if reviews anchor the right href
            const aReviews = liArr[3].querySelector("a");
            const aReviewsHref = aReviews.getAttribute("href");
            const reviewsHref = "#reviews";
            errorMsg = `The anchor tags for reviews should have the right href attribute: ${reviewsHref}.`;
            if (!aReviewsHref || !aReviewsHref.includes(reviewsHref)) return wrong(errorMsg);

            // check if reviews anchor has the right inner text
            const reviewsText = "Reviews";
            const aReviewsText = aReviews.innerText;
            errorMsg = `The anchor tags for reviews should have the right inner text: ${reviewsText}.`;
            if (!aReviewsText.includes(reviewsText)) return wrong(errorMsg);

            // CONTACT ANCHOR
            // check if contact anchor the right href
            const aContact = liArr[4].querySelector("a");
            const aContactHref = aContact.getAttribute("href");
            const contactHref = "#contact";
            errorMsg = `The anchor tags for contact should have the right href attribute: ${contactHref}.`;
            if (!aContactHref || !aContactHref.includes(contactHref)) return wrong(errorMsg);

            // check if contact anchor has the right inner text
            const contactText = "Contact";
            const aContactText = aContact.innerText;
            errorMsg = `The anchor tags for contact should have the right inner text: ${contactText}.`;
            if (!aContactText.includes(contactText)) return wrong(errorMsg);

            return correct();
        }),
        this.page.execute(() => {
            // test 4
            // MAIN
            // check if main exist
            const main = document.body.querySelector("main");
            let errorMsg = "main tag is missing in the body of the HTML document.";
            if (!main) return wrong(errorMsg);

            // CONTAINER DIV
            // check if container div exist
            const container = main.querySelector("div");
            errorMsg = "Container div that should wrap the page components is missing in the main tag.";
            if (!container) return wrong(errorMsg);

            // check if the container div has the right bootstrap classes
            const containerClasses = "container-fluid p-0".split(" ");
            const missingContainerClasses = containerClasses.filter(e => !container.className.includes(e));
            errorMsg = `Container div is missing the correct Bootstrap classes: '${missingContainerClasses}'`;
            if (missingContainerClasses.length > 0) return wrong(errorMsg);

            // HOME DIV
            // check if home div exist with the right id
            const home = document.getElementById("home");
            errorMsg = `Container div is missing the inner div with the id: home.`;
            if (!home) return wrong(errorMsg);

            // check if home div has the right classes
            const homeClasses = "d-flex flex-column-reverse flex-md-row p-0 bg-light".split(" ");
            const missingHomeClasses = homeClasses.filter(e => !home.className.includes(e));
            errorMsg = `Home div is missing the these Bootstrap classes: '${missingHomeClasses}'.`;
            if (missingHomeClasses.length > 0) return wrong(errorMsg);

            // INNER CONTENT DIV
            // check if text content inner div exist
            const contentDiv = home.querySelector("div");
            errorMsg = `Home div is missing the inner-wrapper div for the text content and button.`;
            if (!contentDiv) return wrong(errorMsg);

            // check if text content div has the right classes
            const contentDivClasses = "container-fluid m-auto p-5".split(" ");
            const missingContentDivClasses = contentDivClasses.filter(e => !contentDiv.className.includes(e));
            errorMsg = `The content div in the home div is missing these Bootstrap classes: '${missingContentDivClasses}'`;
            if (missingContentDivClasses.length > 0) return wrong(errorMsg);

            // H1
            // check if h1 exist inside content div
            const h1 = contentDiv.querySelector("h1");
            errorMsg = `Home content div is missing the h1 tag.`;
            if (!h1) return wrong(errorMsg);

            // check if h1 has the right classes
            const h1Classes = "display-1 fw-bold".split(" ");
            const missingH1Classes = h1Classes.filter(e => !h1.className.includes(e));
            errorMsg = `The h1 tag in the home div is missing these Bootstrap classes: '${missingH1Classes}'`;
            if (missingH1Classes.length > 0) return wrong(errorMsg);

            // check if h1 has the right text content
            const h1Content = "Hyperskill Cafe";
            errorMsg = `The h1 tag in the home div is missing the right inner text: ${h1Content}`;
            if (!h1.innerText.includes(h1Content)) return wrong(errorMsg);

            // P
            // check if p exist inside content div
            const p = contentDiv.querySelector("p");
            errorMsg = `Home content div is missing the p tag.`;
            if (!p) return wrong(errorMsg);

            // check if p has the right classes
            const pClasses = "col-md-8 py-3 lead fs-4".split(" ");
            const missingPClasses = pClasses.filter(e => !p.className.includes(e));
            errorMsg = `The p tag inside home content is missing these Bootstrap classes: '${missingPClasses}' .`;
            if (missingPClasses.length > 0) return wrong(errorMsg);

            // check if p contains the lorem ipsum inner text
            const loremIpsum = "Lorem ipsum";
            errorMsg = `The p tag inside home content is missing this inner text: ${loremIpsum} .`;
            if (!p.innerText.includes(loremIpsum)) return wrong(errorMsg);

            // ANCHOR TO PRODUCTS
            // check if anchor exist in home content
            const a = contentDiv.querySelector("a");
            errorMsg = `Home content div is missing the a tag for the link to products.`;
            if (!a) return wrong(errorMsg);

            // check if anchor has the right href
            const hrefValue = "#products";
            const aHref = a.getAttribute("href");
            errorMsg = `The a tag for the link to products is missing the right href: ${hrefValue} .`;
            if (!aHref || !aHref.includes(hrefValue)) return wrong(errorMsg);

            // BUTTON
            // check if button exist in home content
            const button = a.querySelector("button");
            errorMsg = `The a tag for the link to products is missing the inner button in the home content.`;
            if (!button) return wrong(errorMsg);

            // check if button has the right classes
            const buttonClasses = "btn btn-primary btn-lg".split(" ");
            const missingButtonClasses = buttonClasses.filter(e => !button.className.includes(e));
            errorMsg = `The inner button inside a tag in the home content is missing these Bootstrap classes: '${missingButtonClasses}' .`;
            if (missingButtonClasses.length > 0) return wrong(errorMsg);

            // check if button has the right type
            const typeValue = "button";
            const buttonType = button.getAttribute("type");
            errorMsg = `The inner button tag inside a tag in the home content is missing the right type attribute: ${typeValue} .`;
            if (!buttonType || !buttonType.includes(typeValue)) return wrong(errorMsg);

            // check if button has the right inner text
            const buttonText = "Discover our products";
            errorMsg = `The inner button tag inside a tag in the home content is missing the right inner text: ${buttonText} .`;
            if (!button.innerText.includes(buttonText)) return wrong(errorMsg);

            // IMG CONTAINER DIV
            // check if img container div exist
            const imgDiv = home.querySelectorAll("div")[1];
            errorMsg = `The wrapper div for the image inside home div is missing.`;
            if (!imgDiv) return wrong(errorMsg);

            // check if img container div has the right class
            const imgDivClasses = "container-fluid p-0".split(" ");
            const missingImgDivClasses = imgDivClasses.filter(e => !imgDiv.className.includes(e));
            errorMsg = `The wrapper div for the image inside home div is missing these Bootstrap classes: '${missingImgDivClasses}'.`;
            if (missingImgDivClasses.length > 0) return wrong(errorMsg);

            // IMG
            // check if img exist in home
            const img = imgDiv.querySelector("img");
            errorMsg = `The wrapper div for the image inside home div is missing the img tag.`;
            if (!img) return wrong(errorMsg);

            // check if img has the right class
            const imgClasses = "img-fluid w-100".split(" ");
            const missingImgClasses = imgClasses.filter(e => !img.className.includes(e));
            errorMsg = `The img tag inside home div is missing these Bootstrap class: '${missingImgClasses}' .`;
            if (missingImgClasses.length > 0) return wrong(errorMsg);

            // check if img has the src attribute
            const src = img.getAttribute("src");
            //const alt = img.getAttribute("alt");
            errorMsg = `The img tag inside home div is missing src attribute.`;
            if (!src || src.trim().length <= 1) return wrong(errorMsg);

            // check if img has the alt attribute
            const alt = img.getAttribute("alt");
            errorMsg = `The img tag inside home div is missing alt attribute.`;
            if (!alt || alt.trim().length <= 1) return wrong(errorMsg);

            return correct();

        }),
        this.page.execute(() => {
            // test 5
            // check the link amount
            const links = Array.from(document.head.querySelectorAll("link"));
            let errorMsg = `There should be at least 5 links in the head of the HTML document, found: ${links.length}`;
            if (links.length < 5) return wrong(errorMsg);

            // GOOGLE FONT
            // check if link exist for google font
            const linkGoogleFont1 = "https://fonts.googleapis.com/css2?family";
            const linkGoogleFont2 = "https://fonts.gstatic.com";
            const isGoogleFontLinked = links.find(e =>  e.attributes
                .getNamedItem("href") &&  e.attributes
                .getNamedItem("href").value.includes(linkGoogleFont1 || linkGoogleFont2));
            errorMsg = `Link the Google Font with the HTML document correctly in the head.`;

            if (!isGoogleFontLinked) return wrong(errorMsg);

            // CSS LINK
            // check if css link has the right href
            const linkCss = "style.css"
            const isCssLinked = links.find(e => e.attributes
                .getNamedItem("href") && e.attributes
                .getNamedItem("href").value.includes(linkCss));
            errorMsg = `Link the style.css file with the HTML document in the head.`;
            if (!isCssLinked) return wrong(errorMsg);

            // CSS FONT FAMILY
            // check if css has the prop for font family
            const body = document.body;
            const bodyStyle = window.getComputedStyle(body).fontFamily;
            const regular = 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';
            errorMsg = "The font-family property contains the default fonts for the body inside your CSS file.";
            if (!bodyStyle || bodyStyle.includes(regular) || bodyStyle.trim().length < 1) return wrong(errorMsg);

            return correct();
        }),
        this.page.execute(() => {
            // test 6
            // ABOUT DIV
            // check if about div exist
            const about = document.getElementById("about");
            let errorMsg = "About div with the correct id doesn't exist inside the body.";
            if (!about) return wrong(errorMsg);

            // check if about div has the right classes
            const aboutClasses = "container-fluid bg-light p-0".split(" ");
            const missingAboutClasses = aboutClasses.filter(e => !about.className.includes(e));
            errorMsg = `About div is missing these Bootstrap classes: '${missingAboutClasses}'`;
            if (missingAboutClasses.length > 0) return wrong(errorMsg);

            // IMG WRAPPER DIV
            // check if wrapper exist
            const imgWrapper = about.querySelector("div");
            errorMsg = "About div doesn't contain a wrapper div for the image.";
            if (!imgWrapper) return wrong(errorMsg);

            // check if wrapper has the right classes
            const imgWrapperClasses = "container-fluid p-0".split(" ");
            const missingImgWrapperClasses = imgWrapperClasses.filter(e => !imgWrapper.className.includes(e));
            errorMsg = `Wrapper div for the image inside About div is missing these Bootstrap classes: '${missingImgWrapperClasses}'`;
            if (missingImgWrapperClasses.length > 0) return wrong(errorMsg);

            // IMG
            // check if img exist
            const img = imgWrapper.querySelector("img");
            errorMsg = `The wrapper div for the image inside about div is missing the img tag.`;
            if (!img) return wrong(errorMsg);

            // check if img has the right class
            const imgClasses = "img-fluid";
            const missingImgClass = !img.className.includes(imgClasses);
            errorMsg = `The img tag inside about div is missing this Bootstrap class: '${imgClasses}' .`;
            if (missingImgClass) return wrong(errorMsg);

            // check if img has the src attribute
            const src = img.getAttribute("src");
            errorMsg = `The img tag inside about div is missing the src attribute.`;
            if (!src || src.trim().length <= 1) return wrong(errorMsg);

            // check if img has the alt attribute
            const alt = img.getAttribute("alt");
            errorMsg = `The img tag inside about div is missing the alt attribute.`;
            if (!alt || alt.trim().length <= 1) return wrong(errorMsg);

            // TEXT WRAPPER DIV
            // check if wrapper exist
            const textWrapperDiv = about.querySelectorAll("div")[1];
            errorMsg = `About div is missing the inner-wrapper div for the text content.`;
            if (!textWrapperDiv) return wrong(errorMsg);

            // check if text wrapper div has the right classes
            const textWrapperDivClasses = "container-fluid p-5".split(" ");
            const missingTextWrapperDivClasses = textWrapperDivClasses.filter(e => !textWrapperDiv.className.includes(e));
            errorMsg = `The wrapper div for the text content in the about div is missing these Bootstrap classes: '${missingTextWrapperDivClasses}'`;
            if (missingTextWrapperDivClasses.length > 0) return wrong(errorMsg);

            // H2
            // check if h2 exist inside content div
            const h2 = textWrapperDiv.querySelector("h2");
            errorMsg = `Wrapper div inside about div is missing the h2 tag.`;
            if (!h2) return wrong(errorMsg);

            // check if h2 has the right classes
            const h2Classes = "display-5 fw-bold".split(" ");
            const missingH2Classes = h2Classes.filter(e => !h2.className.includes(e));
            errorMsg = `The h2 tag in the about div is missing these Bootstrap classes: '${missingH2Classes}'`;
            if (missingH2Classes.length > 0) return wrong(errorMsg);

            // check if h2 has the right text content
            const h2Content = "About Us";
            errorMsg = `The h2 tag in the about div is missing the right inner text: ${h2Content}`;
            if (!h2.innerText.includes(h2Content)) return wrong(errorMsg);

            // P
            // check if p exist inside content div
            const p = textWrapperDiv.querySelector("p");
            errorMsg = `Wrapper div inside about div is missing the p tag.`;
            if (!p) return wrong(errorMsg);

            // check if p has the right classes
            const pClasses = "py-3 fs-5".split(" ");
            const missingPClasses = pClasses.filter(e => !p.className.includes(e));
            errorMsg = `The p tag inside about div is missing these Bootstrap classes: '${missingPClasses}' .`;
            if (missingPClasses.length > 0) return wrong(errorMsg);

            // check if p contains the lorem ipsum inner text
            const loremIpsum = "Lorem ipsum";
            errorMsg = `The p tag inside about content is missing this inner text: ${loremIpsum} .`;
            if (!p.innerText.includes(loremIpsum)) return wrong(errorMsg);

            return correct();
        }),
        this.page.execute(() => {
            // test 7
            // PRODUCTS DIV
            // check if products div exist
            const products = document.getElementById("products");
            let errorMsg = "Products div with the correct id doesn't exist inside the body.";
            if (!products) return wrong(errorMsg);

            // check if products div has the right classes
            const productsClasses = "container-fluid bg-light p-0".split(" ");
            const missingProductsClasses = productsClasses.filter(e => !products.className.includes(e));
            errorMsg = `Products div is missing these Bootstrap classes: '${missingProductsClasses}' .`;
            if (missingProductsClasses.length > 0) return wrong(errorMsg);

            // H2
            // check if h2 exist inside products div
            const h2 = products.querySelector("h2");
            errorMsg = `Products div is missing the h2 tag.`;
            if (!h2) return wrong(errorMsg);

            // check if h2 has the right classes
            const h2Classes = "display-5 pt-5 px-5 fw-bold".split(" ");
            const missingH2Classes = h2Classes.filter(e => !h2.className.includes(e));
            errorMsg = `The h2 tag in the products div is missing these Bootstrap classes: '${missingH2Classes}' .`;
            if (missingH2Classes.length > 0) return wrong(errorMsg);

            // check if h2 has the right text content
            const h2Content = "Our Products";
            errorMsg = `The h2 tag in the products div is missing the right inner text: ${h2Content} .`;
            if (!h2.innerText.includes(h2Content)) return wrong(errorMsg);

            // WRAPPER DIV
            // check if wrapper div exist
            const wrapperDiv = products.querySelector("div");
            errorMsg = "Wrapper div inside products div doesn't exist.";
            if (!wrapperDiv) return wrong(errorMsg);

            // check if wrapper div has the right class
            const wrapperClass = "px-5";
            errorMsg = `Wrapper div inside products div doesn't have this Bootstrap class: '${wrapperClass}' .`;
            if (!wrapperDiv.className.includes(wrapperClass)) return wrong(errorMsg);

            // ROW DIV
            // check if row div exist
            const row = wrapperDiv.querySelector("div");
            errorMsg = "Row div inside wrapper div in products div doesn't exist.";
            if (!row) return wrong(errorMsg);

            // check if row div has the right class
            const rowClass = "row";
            errorMsg = `Row div inside products div doesn't have this Bootstrap class: '${rowClass}' .`;
            if (!row.className.includes(rowClass)) return wrong(errorMsg);

            // COL DIVS
            // check if there are 6 divs inside row div
            const colDivs = Array.from(row.children);
            const totalAmount = 6;
            errorMsg = `The amount of col divs inside products row div should be ${totalAmount}, instead it's: ${colDivs.length} `;
            if (colDivs.length !== totalAmount) return wrong(errorMsg);

            // check if all cols are div tags
            errorMsg = "Some of the cols aren't div tags."
            for (let i = 0; i < colDivs.length; i++) {
                const div = colDivs[i].nodeName;
                const divNodeName = "DIV";
                if (div !== divNodeName) return wrong(errorMsg);
            }

            // check if col divs have the right classes
            const colDivsClasses = "col-lg-4 col-md-6 py-3".split(" ");
            const temp = [];
            colDivs.forEach(div => {
                temp.push(colDivsClasses.find(divClass => !div.className.includes(divClass)));
            });
            const missingColClasses = [];
            temp.forEach(e => e && missingColClasses.push(e));
            errorMsg = `Some of the col divs inside products row div are missing these Bootstrap classes: '${missingColClasses}' .`;
            if (missingColClasses.length > 0) return wrong(errorMsg);

            // CARD DIVS
            // check if 6 card divs exist with card class
            const cardDivs = Array.from(row.getElementsByClassName("card"));
            errorMsg = `The amount of card divs, with the right Bootstrap class, inside col divs should be ${totalAmount}, instead it's: ${cardDivs.length} `;
            if (cardDivs.length !== totalAmount) return wrong(errorMsg);

            // check if all cards are div tags
            errorMsg = "Some of the cards aren't div tags."
            for (let i = 0; i < cardDivs.length; i++) {
                const div = cardDivs[i].nodeName;
                const divNodeName = "DIV";
                if (div !== divNodeName) return wrong(errorMsg);
            }

            // check if card inside col
            errorMsg = "Some of the cards aren't inside of the col divs.";
            for (let i = 0; i < cardDivs.length; i++) {
                const parent = cardDivs[i].parentElement.className;
                const parentClass = "col";
                if (!parent.includes(parentClass)) return wrong(errorMsg);
            }

            // check if card divs have the right class
            const cardClass = "h-100";
            const missingCardClass = cardDivs.filter(e => !e.className.includes(cardClass));
            errorMsg = `${missingCardClass.length} of the card divs are missing this Bootstrap class: '${cardClass}'`;
            if (missingCardClass.length > 0) return wrong(errorMsg);

            // CARD IMG
            // check if there are 6 card img with right class
            const cardImgClasses = "card-img-top img-fluid h-100";
            const cardImgs = Array.from(row.getElementsByClassName(cardImgClasses));
            errorMsg = `The amount of card images, with the right Bootstrap classes: '${cardImgClasses}', inside card divs should be ${totalAmount}, instead it's: ${cardImgs.length} `;
            if (cardImgs.length !== totalAmount) return wrong(errorMsg);

            // check if all card-img are img tags
            errorMsg = "Some of the card-images aren't img tags."
            for (let i = 0; i < cardImgs.length; i++) {
                const img = cardImgs[i].nodeName;
                const imgNodeName = "IMG";
                if (img !== imgNodeName) return wrong(errorMsg);
            }

            // check if card-body inside card
            errorMsg = "Some of the card-images aren't inside of the card divs.";
            for (let i = 0; i < cardImgs.length; i++) {
                const parent = cardImgs[i].parentElement.className;
                const parentClass = "card";
                if (!parent.includes(parentClass)) return wrong(errorMsg);
            }


            // check if card imgs have the src attribute
            errorMsg = `Some of the card images inside card div are missing the src attribute.`;
            for (let i = 0; i < cardImgs.length; i++) {
                const src = cardImgs[i].getAttribute("src");
                if (!src || src.trim().length <= 1) return wrong(errorMsg);
            }

            // check if card imgs have  the alt attribute
            errorMsg = `Some of the card images inside card div are missing the alt attribute.`;
            for (let i = 0; i < cardImgs.length; i++) {
                const alt = cardImgs[i].getAttribute("alt");
                if (!alt || alt.trim().length <= 1) return wrong(errorMsg);
            }

            // CARD BODY DIVS
            // check if there are 6 card body div with right class
            const cardBodyDivs = Array.from(row.getElementsByClassName("card-body"));
            errorMsg = `The amount of card-body divs, with the right Bootstrap class, inside card divs should be ${totalAmount}, instead it's: ${cardBodyDivs.length} `;
            if (cardBodyDivs.length !== totalAmount) return wrong(errorMsg);

            // check if all card-bodies are div tags
            errorMsg = "Some of the card-bodies aren't div tags."
            for (let i = 0; i < cardBodyDivs.length; i++) {
                const div = cardBodyDivs[i].nodeName;
                const divNodeName = "DIV";
                if (div !== divNodeName) return wrong(errorMsg);
            }

            // check if card-body inside card
            errorMsg = "Some of the card-bodies aren't inside of the card divs.";
            for (let i = 0; i < cardBodyDivs.length; i++) {
                const parent = cardBodyDivs[i].parentElement.className;
                const parentClass = "card";
                if (!parent.includes(parentClass)) return wrong(errorMsg);
            }

            // CARD-TITLES H5
            // check if there are 6 card-titles with the right class
            const cardTitles = Array.from(row.getElementsByClassName("card-title"));
            errorMsg = `The amount of card-title h5 tags, with the right Bootstrap class, inside card-body divs should be ${totalAmount}, instead it's: ${cardTitles.length} `;
            if (cardTitles.length !== totalAmount) return wrong(errorMsg);

            // check if all card-titles are h5 tags
            errorMsg = "Some of the card-titles aren't h5 tags."
            for (let i = 0; i < cardTitles.length; i++) {
                const h5 = cardTitles[i].nodeName;
                const h5NodeName = "H5";
                if (h5 !== h5NodeName) return wrong(errorMsg);
            }

            // check if card-title inside card-body
            errorMsg = "Some of the card-titles aren't inside of the card-body divs.";
            for (let i = 0; i < cardTitles.length; i++) {
                const parent = cardTitles[i].parentElement.className;
                const parentClass = "card-body";
                if (parent !== parentClass) return wrong(errorMsg);
            }

            // check if card-titles have inner text.
            errorMsg = "Some of the card-titles are missing an inner text.";
            for (let i = 0; i < cardTitles.length; i++) {
                const innerText = cardTitles[i].innerHTML;
                if (innerText.trim().length <= 1) return wrong(errorMsg);
            }

            // CARD-TEXT P
            // check if there are 6 card-texts with the right class
            const cardTexts = Array.from(row.getElementsByClassName("card-text"));
            errorMsg = `The amount of card-text p tags, with the right Bootstrap class, inside card-body divs should be ${totalAmount}, instead it's: ${cardTexts.length} `;
            if (cardTexts.length !== totalAmount) return wrong(errorMsg);

            // check if all card-texts are p tags
            errorMsg = "Some of the card-texts aren't p tags."
            for (let i = 0; i < cardTexts.length; i++) {
                const p = cardTexts[i].nodeName;
                const pNodeName = "P";
                if (p !== pNodeName) return wrong(errorMsg);
            }

            // check if card-text inside card-body
            errorMsg = "Some of the card-texts aren't inside of the card-body divs.";
            for (let i = 0; i < cardTexts.length; i++) {
                const parent = cardTexts[i].parentElement.className;
                const parentClass = "card-body";
                if (parent !== parentClass) return wrong(errorMsg);
            }

            // check if card-texts have inner text.
            errorMsg = "Some of the card-texts are missing an inner text.";
            for (let i = 0; i < cardTexts.length; i++) {
                const innerText = cardTexts[i].innerHTML;
                if (innerText.trim().length <= 1) return wrong(errorMsg);
            }

            return correct();

        })
    ]
}

it('Test stage', async function () {
    try {
        this.timeout(30000)
    } catch (ignored) {
    }
    await new CafeTest().runTests()
}, 30000)

