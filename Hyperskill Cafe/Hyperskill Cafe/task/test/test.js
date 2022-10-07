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
            const totalElements = 5; // increased to 5 with the addition of footer tag
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

        }),
        this.page.execute(() => {
            // test 8
            // SCRIPT
            // check if body contains the custom script tag
            const scripts = Array.from(document.body.querySelectorAll("script"));
            const linkScript = "script.js";
            const isScriptLinked = scripts.find(e => e.attributes
                .getNamedItem("src") &&  e.attributes
                .getNamedItem("src").value.includes(linkScript));
            let errorMsg = `Link your javascript file as a script tag with the HTML document in the body. The file name should be: 'script.js' .`;
            if (!isScriptLinked) return wrong(errorMsg);

            return correct();
        }),
        this.page.execute(() => {
            // test 9
            // REVIEWS DIV
            // check if reviews div exist,
            const reviews = document.getElementById("reviews");
            let errorMsg = "Reviews div with the correct id doesn't exist inside the body.";
            if (!reviews) return wrong(errorMsg);

            // check if reviews div has the right classes
            const reviewsClasses = "container-fluid bg-light p-0".split(" ");
            const missingReviewsClasses = reviewsClasses.filter(e => !reviews.className.includes(e));
            errorMsg = `Reviews div is missing these Bootstrap classes: '${missingReviewsClasses}' .`;
            if (missingReviewsClasses.length > 0) return wrong(errorMsg);

            // H2
            // check if h2 exist inside reviews div
            const h2 = reviews.querySelector("h2");
            errorMsg = `Reviews div is missing the h2 tag.`;
            if (!h2) return wrong(errorMsg);

            // check if h2 has the right classes
            const h2Classes = "display-5 pt-5 px-5 fw-bold".split(" ");
            const missingH2Classes = h2Classes.filter(e => !h2.className.includes(e));
            errorMsg = `The h2 tag in the reviews div is missing these Bootstrap classes: '${missingH2Classes}' .`;
            if (missingH2Classes.length > 0) return wrong(errorMsg);

            // check if h2 has the right text content
            const h2Content = "Reviews From Our Customers";
            errorMsg = `The h2 tag in the reviews div is missing the right inner text: ${h2Content} .`;
            if (!h2.innerText.includes(h2Content)) return wrong(errorMsg);

            // TOGGLE BUTTON CONTAINER DIV
            // check if toggle button wrapper div exist inside reviews div
            const toggleContainerDiv = reviews.querySelector("div");
            errorMsg = "Wrapper div for toggle-button inside reviews div doesn't exist.";
            if (!toggleContainerDiv) return wrong(errorMsg);

            // check if wrapper div has the right class
            const toggleContainerClasses = "px-5 my-3".split(" ");
            const missingToggleContainerClasses = toggleContainerClasses.filter(e => !toggleContainerDiv.className.includes(e));
            errorMsg = `Wrapper div for toggle-button inside reviews div doesn't have these Bootstrap class: '${missingToggleContainerClasses}' .`;
            if (missingToggleContainerClasses.length > 0) return wrong(errorMsg);

            // TOGGLE BUTTON
            // check if toggle-button exist
            const toggleButton = toggleContainerDiv.querySelector("button");
            errorMsg = "Toggle button in the container div inside reviews div doesn't exist.";
            if (!toggleButton) return wrong(errorMsg);

            // check if toggle-button has the right classes
            const toggleClasses = "btn btn-primary".split(" ");
            const missingToggleClasses = toggleClasses.filter(e => !toggleButton.className.includes(e));
            errorMsg = `Toggle button in the container div inside reviews div doesn't have these Bootstrap class: '${missingToggleClasses}' .`;
            if (missingToggleClasses.length > 0) return wrong(errorMsg);

            // check if toggle-button has the right type
            const typeValue = "button";
            const toggleButtonType = toggleButton.getAttribute("type");
            errorMsg = `Toggle button in the container div inside reviews div is missing the right type attribute: ${typeValue} .`;
            if (!toggleButtonType || !toggleButtonType.includes(typeValue)) return wrong(errorMsg);

            // check if toggle-button has the right inner text
            const toggleButtonText = "Add Review";
            errorMsg = `Toggle button in the container div inside reviews div is missing the right inner text: ${toggleButtonText} .`;
            if (!toggleButton.innerText.includes(toggleButtonText)) return wrong(errorMsg);

            // check if toggle-button has the right data-bs-toggle attribute
            const dataBsToggleValue = "collapse";
            const dataBsToggle = toggleButton.getAttribute("data-bs-toggle");
            errorMsg = `Toggle button in the container div inside reviews div is missing the right data-bs-toggle attribute: ${dataBsToggleValue} .`;
            if (!dataBsToggle || !dataBsToggle.includes(dataBsToggleValue)) return wrong(errorMsg);

            // check if toggle-button has the right data-bs-target attribute
            const dataBsTargetValue = "#collapseReview";
            const dataBsTarget = toggleButton.getAttribute("data-bs-target");
            errorMsg = `Toggle button in the container div inside reviews div is missing the right data-bs-target attribute: ${dataBsTargetValue} .`;
            if (!dataBsTarget || !dataBsTarget.includes(dataBsTargetValue)) return wrong(errorMsg);

            // check if toggle-button has the right aria-expanded attribute
            const ariaExpandedValue = "false";
            const ariaExpanded = toggleButton.getAttribute("aria-expanded");
            errorMsg = `Toggle button in the container div inside reviews div is missing the right aria-expanded attribute: ${ariaExpandedValue} .`;
            if (!ariaExpanded || !ariaExpanded.includes(ariaExpandedValue)) return wrong(errorMsg);

            // check if toggle-button has the right aria-controls attribute
            const ariaControlsValue = "collapseReview";
            const ariaControls = toggleButton.getAttribute("aria-controls");
            errorMsg = `Toggle button in the container div inside reviews div is missing the right aria-controls attribute: ${ariaControlsValue} .`;
            if (!ariaControls || !ariaControls.includes(ariaControlsValue)) return wrong(errorMsg);

            // COLLAPSE DIV
            // check if collapse div exist
            const collapseId = "#collapseReview"
            const collapse = reviews.querySelector(collapseId);
            errorMsg = `Collapse div inside reviews div with the right id doesn't exist. The id should be: ${collapseId}`;
            if (!collapse) return wrong(errorMsg);

            // check if collapse is a div tag.
            const divNodeName = "DIV";
            const collapseDiv = collapse.nodeName;
            errorMsg = "Collapse component inside reviews div should be a div tag."
            if (collapseDiv !== divNodeName) return wrong(errorMsg);

            // check if collapse div has the right class
            const collapseClass = "collapse";
            errorMsg = `Collapse div inside reviews div is missing the right Bootstrap class: '${collapseClass}'.`;
            if (!collapse.className.includes(collapseClass)) return wrong(errorMsg);

            // FORM-CARD WRAPPER DIV
            // check if card wrapper div exist
            const cardContainer = collapse.querySelector("div");
            errorMsg = "Card wrapper div inside reviews-collapse div doesn't exist."
            if (!cardContainer) return wrong(errorMsg);

            // check if card wrapper has the right class
            const cardContainerClass = "px-5";
            errorMsg = `Card wrapper div inside reviews-collapse div is missing the right Bootstrap class: '${cardContainerClass}'.`;
            if (!cardContainer.className.includes(cardContainerClass)) return wrong(errorMsg);

            // FORM CARD DIV
            // check if form card exist
            const formCardDiv = cardContainer.querySelector("div");
            errorMsg = "Form card div in card-container, inside reviews-collapse, doesn't exist.";
            if (!formCardDiv) return wrong(errorMsg);

            // check if form card has the right classes
            const cardClasses = "card card-body".split(" ");
            const missingFormCardClasses = cardClasses.filter(e => !formCardDiv.className.includes(e));
            errorMsg = `Form card div in card-container, inside reviews-collapse, is missing these Bootstrap classes: '${missingFormCardClasses}'.`;
            if (missingFormCardClasses.length > 0) return wrong(errorMsg);

            // FORM ROW
            // check if form exist
            const form = formCardDiv.querySelector("form");
            errorMsg = "Form tag inside reviews-collapse doesn't exist.";
            if (!form) return wrong(errorMsg);

            // check if form has the right classes
            const formClasses = "row g-3".split(" ");
            const missingFormClasses = formClasses.filter(e => !form.className.includes(e));
            errorMsg = `Form tag inside reviews-collapse, is missing these Bootstrap classes: '${missingFormClasses}'.`;
            if (missingFormClasses.length > 0) return wrong(errorMsg);

            // COL DIVS
            // check if there are 4 col divs inside row div
            const colDivs = Array.from(form.children);
            const totalAmount = 4;
            errorMsg = `The amount of col divs inside form row div should be ${totalAmount}, instead it's: ${colDivs.length} `;
            if (colDivs.length !== totalAmount) return wrong(errorMsg);

            // check if all cols are div tags
            errorMsg = "Some of the cols aren't div tags."
            for (let i = 0; i < colDivs.length; i++) {
                const div = colDivs[i].nodeName;
                const divNodeName = "DIV";
                if (div !== divNodeName) return wrong(errorMsg);
            }

            // check if the first 3 col divs have the right class
            const colDivsClass = "col-md-4";
            errorMsg = `Some of the first three col divs inside form row div are missing this Bootstrap class: '${colDivsClass}' .`;
            for (let i = 0; i < colDivs.length - 1; i++) {
                const colClass = colDivs[i].className;
                if (!colClass.includes(colDivsClass)) return wrong(errorMsg);
            }

            // check if last col div has the right margin class
            const lastCol = form.lastElementChild;
            const col12 = "col-12";
            errorMsg = `Last col div inside form row is missing this Bootstrap class: '${col12}'`;
            if (!lastCol.className.includes(col12)) return wrong(errorMsg);

            // FORM LABELS
            // check if there are 3 form labels
            const labelClass = "form-label";
            const labels = Array.from(form.getElementsByClassName(labelClass));
            const labelAmount = 3;
            errorMsg = `The amount of labels for form inputs with the Bootstrap class of '${labelClass}' should be ${labelAmount}, instead it's: ${labels.length} `;
            if (labels.length !== labelAmount) return wrong(errorMsg);

            // check if labels have inner text.
            errorMsg = "Some of the labels are missing an inner text.";
            for (let i = 0; i < labels.length; i++) {
                const innerText = labels[i].innerText;
                if (innerText.trim().length <= 1) return wrong(errorMsg);
            }

            // check if labels have a for attribute
            const labelsForAttrs = ["reviewTitle", "reviewText", "reviewName"]; // this list is used to check for inputs id's are matching
            for (let i = 0; i < labels.length; i++) {
                const forAttr = labels[i].getAttribute("for");
                let missingFor = "";
                if (forAttr !== labelsForAttrs[i]) missingFor = labelsForAttrs[i];
                errorMsg = `Some of the labels are missing their correct for attributes: ${missingFor}.`;
                if (!forAttr ||  missingFor) return wrong(errorMsg);
            }

            // check if labels inside cols
            errorMsg = "Some of the labels aren't inside of the col divs.";
            for (let i = 0; i < labels.length; i++) {
                const parent = labels[i].parentElement.className;
                const parentClass = "col-md-4";
                if (!parent.includes(parentClass)) return wrong(errorMsg);
            }

            // FORM INPUTS
            // check if there are 3 form inputs
            const inputClass = "form-control";
            const inputs = Array.from(form.getElementsByClassName(inputClass));
            const inputAmount = 3;
            errorMsg = `The amount of form inputs with the Bootstrap class of '${inputClass}' should be ${inputAmount}, instead it's: ${inputs.length} `;
            if (inputs.length !== inputAmount) return wrong(errorMsg);

            // check if inputs have a type attribute
            const inputType = "text";
            errorMsg = `Some of the inputs are missing the correct type attribute: ${inputType}`;
            for (let i = 0; i < inputs.length; i++) {
                const typeAttr = inputs[i].getAttribute("type");
                if (!typeAttr || !typeAttr.includes(inputType)) return wrong(errorMsg);
            }

            // check if inputs have the correct ids
            errorMsg = "Some of the inputs' ids are not matching their labels' for attribute value.";
            for (let i = 0; i < inputs.length; i++) {
                const id = inputs[i].getAttribute("id");
                if (id !== labelsForAttrs[i]) return wrong(errorMsg);
            }

            // check if inputs inside cols
            errorMsg = "Some of the inputs aren't inside of the col divs.";
            for (let i = 0; i < inputs.length; i++) {
                const parent = inputs[i].parentElement.className;
                const parentClass = "col-md-4";
                if (!parent.includes(parentClass)) return wrong(errorMsg);
            }

            // SUBMIT BUTTON
            // check if submit button exist
            const submitButton = form.querySelector("button");
            errorMsg = "Submit button inside reviews-form doesn't exist.";
            if (!submitButton) return wrong(errorMsg);

            // check if submit button has the right id
            const submitButtonId = submitButton.getAttribute("id");
            const correctSubmitId = "reviewButton";
            errorMsg = `Submit button inside reviews-form doesn't have the correct id: ${correctSubmitId}.`;
            if (!submitButtonId || !submitButtonId.includes(correctSubmitId)) return wrong(errorMsg);

            // check if submit button has the right type
            const submitType = "submit";
            const submitButtonType = submitButton.getAttribute("type");
            errorMsg = `Submit button inside reviews-form is missing the correct type attribute: ${submitType}`;
            if (!submitButtonType || !submitButtonType.includes(submitType)) return wrong(errorMsg);

            // check if submit button has the right classes
            const submitClasses = "btn btn-primary".split(" ");
            const missingSubmitClasses = submitClasses.filter(e => !submitButton.className.includes(e));
            errorMsg = `Submit button inside reviews-form is missing these Bootstrap classes: '${missingSubmitClasses}'`;
            if (missingSubmitClasses.length > 0) return wrong(errorMsg);

            // check if submit has an inner text
            const submitButtonText = submitButton.innerText;
            errorMsg = "Submit button inside reviews-form is missing an inner text.";
            if (submitButtonText.trim().length <= 1) return wrong(errorMsg);

            // check if submit button inside col
            errorMsg = "Submit button inside reviews-form isn't inside of a col div.";
            const submitParent = submitButton.parentElement.className;
            const submitParentClass = "col-12";
            if (!submitParent.includes(submitParentClass)) return wrong(errorMsg);

            return correct();
        }),
        this.page.execute(() => {
            // test 10
            // REVIEWS-ROW CONTAINER DIV
            // check if container div exist with the right class
            const reviews = document.getElementById("reviews");

            const reviewsContainer = reviews.lastElementChild;
            const reviewsContainerDiv = reviewsContainer.nodeName;
            const containerDiv = "DIV";
            const containerClass = "px-5";
            let errorMsg = `The last element inside reviews div should be a wrapper div with this Bootstrap class: '${containerClass}'  for the list of reviews.`;
            if (reviewsContainerDiv !== containerDiv || !reviewsContainer.className.includes(containerClass))
                return wrong(errorMsg);

            // REVIEWS ROW
            // check if row div exist
            const row = reviewsContainer.querySelector("div");
            errorMsg = "The row div inside wrapper div in reviews container doesn't exist.";
            if (!row) return wrong(errorMsg);

            // check if row div has an id
            const rowId = row.getAttribute("id");
            const correctRowId = "reviewsRow";
            errorMsg = `The row div inside wrapper div in reviews container is missing the correct id attribute: ${correctRowId}.`;
            if (!rowId || !rowId.includes(correctRowId)) return wrong(errorMsg);

            // check if row div has the right class
            const rowClass = "row";
            errorMsg = `The row div inside reviews container is missing this Bootstrap class: '${rowClass}'`;
            if (!row.className.includes(rowClass)) return wrong(errorMsg);

            // COL DIVS
            // check if there are 3 divs inside row div
            const colDivs = Array.from(row.children);
            const totalAmount = 3;
            errorMsg = `The amount of col divs inside reviews row div should be ${totalAmount}, instead it's: ${colDivs.length} `;
            if (colDivs.length !== totalAmount) return wrong(errorMsg);

            // check if all cols are div tags
            errorMsg = "Some of the reviews-cols aren't div tags."
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
            errorMsg = `Some of the col divs inside reviews row div are missing these Bootstrap classes: '${missingColClasses}' .`;
            if (missingColClasses.length > 0) return wrong(errorMsg);

            // CARD DIVS
            // check if 3 card divs exist with card class
            const cardClassNames = "card h-100"
            const cardDivs = Array.from(row.getElementsByClassName(cardClassNames));
            errorMsg = `The amount of card divs, with the right Bootstrap classes: '${cardClassNames}', inside reviews-col divs should be ${totalAmount}, instead it's: ${cardDivs.length} `;
            if (cardDivs.length !== totalAmount) return wrong(errorMsg);

            // check if all cards are div tags
            errorMsg = "Some of the reviews-cards aren't div tags."
            for (let i = 0; i < cardDivs.length; i++) {
                const div = cardDivs[i].nodeName;
                const divNodeName = "DIV";
                if (div !== divNodeName) return wrong(errorMsg);
            }

            // check if card inside col
            errorMsg = "Some of the reviews-cards aren't inside of the col divs.";
            for (let i = 0; i < cardDivs.length; i++) {
                const parent = cardDivs[i].parentElement.className;
                const parentClass = "col";
                if (!parent.includes(parentClass)) return wrong(errorMsg);
            }

            // CARD BODY DIVS
            // check if there are 3 card body div with right class
            const cardBodyDivs = Array.from(row.getElementsByClassName("card-body"));
            errorMsg = `The amount of card-body divs, with the right Bootstrap class, inside reviews-card divs should be ${totalAmount}, instead it's: ${cardBodyDivs.length} `;
            if (cardBodyDivs.length !== totalAmount) return wrong(errorMsg);

            // check if all card-bodies are div tags
            errorMsg = "Some of the reviews-card-bodies aren't div tags."
            for (let i = 0; i < cardBodyDivs.length; i++) {
                const div = cardBodyDivs[i].nodeName;
                const divNodeName = "DIV";
                if (div !== divNodeName) return wrong(errorMsg);
            }

            // check if card-body inside card
            errorMsg = "Some of the reviews-card-bodies aren't inside of the card divs.";
            for (let i = 0; i < cardBodyDivs.length; i++) {
                const parent = cardBodyDivs[i].parentElement.className;
                const parentClass = "card";
                if (!parent.includes(parentClass)) return wrong(errorMsg);
            }

            // CARD-TITLES H4
            // check if there are 3 card-titles with the right class
            const cardTitles = Array.from(row.getElementsByClassName("card-title"));
            errorMsg = `The amount of card-title h4 tags, with the right Bootstrap class, inside reviews-card-body divs should be ${totalAmount}, instead it's: ${cardTitles.length} `;
            if (cardTitles.length !== totalAmount) return wrong(errorMsg);

            // check if all card-titles are h4 tags
            errorMsg = "Some of the reviews-card-titles aren't h4 tags."
            for (let i = 0; i < cardTitles.length; i++) {
                const h4 = cardTitles[i].nodeName;
                const h4NodeName = "H4";
                if (h4 !== h4NodeName) return wrong(errorMsg);
            }

            // check if card-title inside card-body
            errorMsg = "Some of the reviews-card-titles aren't inside of the card-body divs.";
            for (let i = 0; i < cardTitles.length; i++) {
                const parent = cardTitles[i].parentElement.className;
                const parentClass = "card-body";
                if (parent !== parentClass) return wrong(errorMsg);
            }

            // check if card-titles have inner text.
            errorMsg = "Some of the reviews-card-titles are missing an inner text.";
            for (let i = 0; i < cardTitles.length; i++) {
                const innerText = cardTitles[i].innerHTML;
                if (innerText.trim().length <= 1) return wrong(errorMsg);
            }

            // BLOCKQUOTE
            // check if there are 3 blockquotes
            const blockquotes = Array.from(row.querySelectorAll("blockquote"));
            errorMsg = `The amount of blockquote tags, with the right Bootstrap class, inside reviews-card-body divs should be ${totalAmount}, instead it's: ${blockquotes.length} `;
            if (blockquotes.length !== totalAmount) return wrong(errorMsg);

            // check if blockquotes inside card-body
            errorMsg = "Some of the reviews-blockquotes aren't inside of the card-body divs.";
            for (let i = 0; i < blockquotes.length; i++) {
                const parent = blockquotes[i].parentElement.className;
                const parentClass = "card-body";
                if (parent !== parentClass) return wrong(errorMsg);
            }

            // check if blockquotes have the right classes
            const blockquotesClasses = "blockquote mb-0".split(" ");
            const temp2 = [];
            blockquotes.forEach(div => {
                temp2.push(blockquotesClasses.find(blockquoteClass => !div.className.includes(blockquoteClass)));
            });
            const missingBlockquoteClasses = [];
            temp2.forEach(e => e && missingBlockquoteClasses.push(e));
            errorMsg = `Some of the blockquotes inside reviews card-body div are missing these Bootstrap classes: '${missingBlockquoteClasses}' .`;
            if (missingBlockquoteClasses.length > 0) return wrong(errorMsg);

            // BLOCKQUOTE P
            // check if there are 3 texts with the right class
            const blockquoteTexts = Array.from(row.querySelectorAll("p"));
            errorMsg = `The amount of p tags inside blockquotes should be ${totalAmount}, instead it's: ${blockquoteTexts .length} `;
            if (blockquoteTexts.length !== totalAmount) return wrong(errorMsg);

            // check if texts are inside blockquotes
            errorMsg = "Some of the blockquote-texts aren't inside of the blockquotes.";
            for (let i = 0; i < blockquoteTexts.length; i++) {
                const parent = blockquoteTexts[i].parentElement.className;
                const parentClass = "blockquote";
                if (!parent.includes(parentClass)) return wrong(errorMsg);
            }

            // check if blockquote-texts have inner text.
            errorMsg = "Some of the blockquote-texts are missing an inner text.";
            for (let i = 0; i < blockquoteTexts.length; i++) {
                const innerText = blockquoteTexts[i].innerText;
                if (innerText.trim().length <= 1) return wrong(errorMsg);
            }

            // BLOCKQUOTE FOOTER
            // check if there are 3 blockquote-footers exist
            const blockquoteFooters = Array.from(row.querySelectorAll("footer"));
            errorMsg = `The amount of footer tags inside blockquotes should be ${totalAmount}, instead it's: ${blockquoteFooters.length} `;
            if (blockquoteFooters.length !== totalAmount) return wrong(errorMsg);

            // check if blockquote-footers have the right classes
            const blockquoteFooterClasses = "text-end blockquote-footer".split(" ");
            const temp3 = [];
            blockquoteFooters.forEach(div => {
                temp3.push(blockquoteFooterClasses.find(footerClass => !div.className.includes(footerClass)));
            });
            const missingBlockquoteFooterClasses = [];
            temp3.forEach(e => e && missingBlockquoteFooterClasses.push(e));
            errorMsg = `Some of the footers inside reviews blockquotes are missing these Bootstrap classes: '${missingBlockquoteFooterClasses}' .`;
            if (missingBlockquoteFooterClasses.length > 0) return wrong(errorMsg);

            // check if blockquote-footers have inner text.
            errorMsg = "Some of the blockquote-footers are missing an inner text.";
            for (let i = 0; i < blockquoteFooters.length; i++) {
                const innerText = blockquoteFooters[i].innerText;
                if (innerText.trim().length <= 1) return wrong(errorMsg);
            }

            // check if footers are inside blockquotes
            errorMsg = "Some of the blockquote-footers aren't inside of the blockquotes.";
            for (let i = 0; i < blockquoteFooters.length; i++) {
                const parent = blockquoteFooters[i].parentElement.className;
                const parentClass = "blockquote";
                if (!parent.includes(parentClass)) return wrong(errorMsg);
            }

            // check if blockquote-footers' inner text is italic.
            errorMsg = "Some of the blockquote-footers' inner text aren't italic.";
            for (let i = 0; i < blockquoteFooters.length; i++) {
                const innerTag = blockquoteFooters[i].firstElementChild;
                if (!innerTag) return wrong(errorMsg);

                const italicNode = innerTag.nodeName;
                const italic = "I";
                if (italicNode !== italic) return wrong(errorMsg);
            }

            return correct();
        }),
        this.page.execute(() => {
            // test 11
            // DYNAMIC REVIEWS
            // check if after entering inputs and submitting the values, renders a new content
            const reviewTitle = document.getElementById("reviewTitle");
            const reviewText = document.getElementById("reviewText");
            const reviewName = document.getElementById("reviewName");
            const submit = document.getElementById("reviewButton");
            const reviews = document.getElementById("reviewsRow");

            reviewTitle.value = "Yeah, you did it!";
            reviewText.value = "Good job!";
            reviewName.value = "bertcha";
            submit.click();
            const newReviewHTML = reviews.lastElementChild;

            // NEW COL DIV
            // check if new review is inside col
            const newReviewCol = newReviewHTML.parentElement.querySelector("div");
            let errorMsg = `The new dynamic review should be wrapped with a div tag.`;
            if (!newReviewCol) return wrong(newReviewHTML.outerHTML);

            // check if col wrapper div has the right classes
            const newReviewColClasses = "col-lg-4 col-md-6 py-3".split(" ");
            const missingNewReviewColClasses = newReviewColClasses.filter(e => !newReviewCol.className.includes(e));
            errorMsg = `The wrapper div for the new review in the reviews row div is missing these Bootstrap classes: '${missingNewReviewColClasses}'`;
            if (missingNewReviewColClasses.length > 0) return wrong(errorMsg);

            // NEW CARD DIV
            // check if new review is a card
            const newReviewCard = newReviewHTML.querySelector("div");
            errorMsg = `The new dynamic review should have a wrapper div inside col div.`;
            if (!newReviewCard) return wrong(errorMsg);

            // check if card  div has the right classes
            const newCardClasses = "card h-100".split(" ");
            const missingNewCardClasses = newCardClasses.filter(e => !newReviewCard.className.includes(e));
            errorMsg = `The new dynamic review  wrapper div inside col div should have these Bootstrap classes: ${missingNewCardClasses} `;
            if (missingNewCardClasses.length > 0) return wrong(errorMsg);

            // NEW CARD BODY DIV
            // check if there is card body div
            const newReviewCardBody = newReviewCard.querySelector("div");
            errorMsg = `The new dynamic review should have a wrapper div inside card div.`;
            if (!newReviewCardBody) return wrong(errorMsg);

            // check if there is card body div with right class
            const newCardBodyClass = "card-body";
            errorMsg = `The new dynamic review  wrapper div inside card div should have this Bootstrap class: ${newCardBodyClass} `;
            if (!newReviewCardBody.className.includes(newCardBodyClass)) return wrong(errorMsg);

            // NEW CARD-TITLE H4
            // check if there is card-title
            const newReviewCardTitle = newReviewCardBody.querySelector("h4");
            errorMsg = `The new dynamic review should have a h4 tag inside card-body div in reviews div.`;
            if (!newReviewCardTitle) return wrong(errorMsg);

            // check if card title with the right class
            const newCardTitleClass = "card-title";
            errorMsg = `The new dynamic review h4 tag inside card-body div  should have this Bootstrap class: ${newCardTitleClass} `;
            if (!newReviewCardTitle.className.includes(newCardTitleClass)) return wrong(errorMsg);

            // check if card-title has correct inner text.
            const newReviewCardTitleText = newReviewCardTitle.innerText;
            errorMsg = "The inner text for the h4 card title of the new dynamic review is incorrect.";
            if (newReviewCardTitleText.trim() !== reviewTitle.value) return wrong(errorMsg);

            // NEW BLOCKQUOTE
            // check if there is blockquote
            const newReviewBlockquote = newReviewCardBody.querySelector("blockquote");
            errorMsg = `The new dynamic review should have a blockquote tag inside card-body div.`;
            if (!newReviewBlockquote) return wrong(errorMsg);

            // check if blockquote has the right classes
            const newBlockquoteClasses = "blockquote mb-0".split(" ");
            const missingNewBlockquoteClasses = newBlockquoteClasses.filter(e => !newReviewBlockquote.className.includes(e));
            errorMsg = `The new dynamic review blockquote div inside card-body div should have these Bootstrap classes: ${missingNewBlockquoteClasses} `;
            if (missingNewBlockquoteClasses.length > 0) return wrong(errorMsg);

            // BLOCKQUOTE P
            // check if there is text
            const newReviewBlockquoteText = newReviewBlockquote.querySelector("p");
            errorMsg = `The new dynamic review should have a p tag inside blockquote tag in reviews div.`;
            if (!newReviewBlockquoteText) return wrong(errorMsg);

            // check if card-title has correct inner text.
            const newReviewBlockquoteTextInnerText = newReviewBlockquoteText.innerText;
            errorMsg = "The inner text for the p tag inside blockquote tag of the new dynamic review is incorrect.";
            if (newReviewBlockquoteTextInnerText.trim() !== reviewText.value) return wrong(errorMsg);

            // BLOCKQUOTE FOOTER
            // check if there is footer
            const newReviewBlockquoteFooter = newReviewBlockquote.querySelector("footer");
            errorMsg = `The new dynamic review should have a footer tag inside blockquote tag in reviews div.`;
            if (!newReviewBlockquoteFooter) return wrong(errorMsg);

            // check if card  div has the right classes
            const newBlockquoteFooterClasses = "text-end blockquote-footer".split(" ");
            const missingNewBlockquoteFooterClasses = newBlockquoteFooterClasses.filter(e => !newReviewBlockquoteFooter.className.includes(e));
            errorMsg = `The new dynamic review  footer tag inside blockquote tag should have these Bootstrap classes: ${missingNewBlockquoteFooterClasses} `;
            if (missingNewBlockquoteFooterClasses.length > 0) return wrong(errorMsg);

            // check if card-title has correct inner text.
            const newReviewBlockquoteFooterInnerText = newReviewBlockquoteFooter.innerText;
            errorMsg = "The inner text for the footer tag inside blockquote tag of the new dynamic review is incorrect.";
            if (newReviewBlockquoteFooterInnerText.trim() !== reviewName.value) return wrong(errorMsg);

            // check if blockquote-footer's inner text is italic.
            const innerTag = newReviewBlockquoteFooter.firstElementChild;
            const italic = "I";
            errorMsg = "The inner text for the footer tag inside blockquote tag of the new dynamic review is not italic.";
            if (!innerTag || innerTag.nodeName !== italic) return wrong(errorMsg);

            return correct();
        }),
        this.page.execute(() => {
            // test 12
            // DYNAMIC REVIEW
            // check if the name of the reviewer is anonymous when input is value is empty
            const reviewTitle = document.getElementById("reviewTitle");
            const reviewText = document.getElementById("reviewText");
            const reviewName = document.getElementById("reviewName");
            const submit = document.getElementById("reviewButton");
            const reviews = document.getElementById("reviewsRow");

            reviewTitle.value = "Yeah, you did it!";
            reviewText.value = "Good job!";
            reviewName.value = "";
            submit.click();

            const newReviewFooter = reviews.lastElementChild.querySelector("footer").innerText;
            const anon = "Anonymous";
            let errorMsg = `When the user doesn't enter any value for the name input, the blockquote-footer's inner text should be: ${anon}.`;
            if (!newReviewFooter.includes(anon)) return wrong(errorMsg);

            return correct();
        }),
        this.page.execute(() => {
            // test 13
            // check if the review title input have required attr
            let errorMsg = `Input tag with the id of 'reviewTitle' is missing a 'required' attribute. `;
            const titleReq = document.getElementById("reviewTitle").attributes.getNamedItem("required");
            if (!titleReq) return wrong(errorMsg);

            // check if the review text input have required attr
            errorMsg = `Input tag with the id of 'reviewText' is missing a 'required' attribute. `;
            const textReq = document.getElementById("reviewText").attributes.getNamedItem("required");
            if (!textReq) return wrong(errorMsg);

            return correct();

        }),
        this.page.execute(() => {
            // test 14
            // CONTACT DIV
            // check if contact div exist
            const contact = document.getElementById("contact");
            let errorMsg = "Contact div with the correct id doesn't exist inside the body.";
            if (!contact) return wrong(errorMsg);

            // check if contact div has the right classes
            const contactClasses = "container-fluid bg-light p-0".split(" ");
            const missingContactClasses = contactClasses.filter(e => !contact.className.includes(e));
            errorMsg = `Contact div is missing these Bootstrap classes: '${missingContactClasses}'`;
            if (missingContactClasses.length > 0) return wrong(errorMsg);

            // TEXT CONTAINER DIV
            // check if text container div exist
            const textContainer = contact.querySelector("div");
            errorMsg = "Contact div is missing a container div for all the text items.";
            if (!textContainer) return wrong(errorMsg);

            // check if text container div has the right classes
            const textContainerClasses = "container-fluid d-md-flex justify-content-between p-5".split(" ");
            const missingTextContainerClasses = textContainerClasses.filter(e => !textContainer.className.includes(e));
            errorMsg = `Text container div inside contact div is missing these Bootstrap classes: '${missingTextContainerClasses}'`;
            if (missingTextContainerClasses.length > 0) return wrong(errorMsg);

            // H2
            // check if h2 exist inside contact div
            const h2 = textContainer.querySelector("h2");
            errorMsg = `Text container div inside contact div is missing the h2 tag.`;
            if (!h2) return wrong(errorMsg);

            // check if h2 has the right classes
            const h2Classes = "display-5 w-100 mb-3 fw-bold".split(" ");
            const missingH2Classes = h2Classes.filter(e => !h2.className.includes(e));
            errorMsg = `The h2 tag in the contact div is missing these Bootstrap classes: '${missingH2Classes}'`;
            if (missingH2Classes.length > 0) return wrong(errorMsg);

            // check if h2 has the right text content
            const h2Content = "Contact Us";
            errorMsg = `The h2 tag in the contact div is missing the right inner text: ${h2Content}`;
            if (!h2.innerText.includes(h2Content)) return wrong(errorMsg);

            // INFO TEXT CONTAINER DIV
            // check if info container exist
            const infoContainer = textContainer.querySelector("div");
            errorMsg = "Text container div inside contact div is missing the container div for the information texts."
            if (!infoContainer) return wrong(errorMsg);

            // check if info container has the right class
            const infoContainerClasses = "container ps-0".split(" ");
            const missingInfoContainerClasses = infoContainerClasses.filter(e => !infoContainer.className.includes(e));
            errorMsg = `The info container div after h2 tag in the contact div is missing these Bootstrap classes: '${missingInfoContainerClasses}'`;
            if (missingInfoContainerClasses.length > 0) return wrong(errorMsg);

            // P TAGS
            // check if there are 3 p tags inside info container
            const pTags = Array.from(infoContainer.querySelectorAll("p"));
            const pTotal = 3;
            errorMsg = `There should be ${pTotal} p tags inside contact-info container div, instead there are ${pTags.length}.`
            if (pTags.length !== pTotal) return wrong(errorMsg);

            // check if p tags has the right class
            const fs5 = "fs-5"
            errorMsg = `Some of the p tags inside contact-info container div are missing the right Bootstrap class: '${fs5}'.`
            for (let i = 0; i < pTags.length; i++) {
                const pClass = pTags[i].className;
                if (!pClass.includes(fs5)) return wrong(errorMsg);
            }

            // check if p tags has the an inner-text
            errorMsg = `Some of the p tags inside contact-info container div are missing an inner text.`
            for (let i = 0; i < pTags.length; i++) {
                const pClass = pTags[i].innerText;
                if (pClass.trim().length <= 1) return wrong(errorMsg);
            }

            // ADRESS B TAG
            // check if b tag exist inside address p tag with right text
            const addressB = pTags[0].querySelector("b");
            const addressText = "Address:";
            errorMsg = `Address text in the contact-info container is missing the bold tag wrapping the word '${addressText}'.`;
            if (!addressB || addressB.innerText !== addressText) return wrong(errorMsg);

            // PHONE B TAG
            // check if b tag exist inside phone p tag with right text
            const phoneB = pTags[1].querySelector("b");
            const phoneText = "Phone Number:";
            errorMsg = `Phone text in the contact-info container is missing the bold tag wrapping the word '${phoneText}'.`;
            if (!phoneB || phoneB.innerText !== phoneText) return wrong(errorMsg);

            // EMAIL B TAG
            // check if b tag exist inside email p tag with right text
            const emailB = pTags[2].querySelector("b");
            const emailText = "Email:";
            errorMsg = `Email text in the contact-info container is missing the bold tag wrapping the word '${emailText}'.`;
            if (!emailB || emailB.innerText !== emailText) return wrong(errorMsg);

            // PHONE A TAG
            // check if b tag exist inside phone p tag with text
            const phoneA = pTags[1].querySelector("a");
            errorMsg = `Phone text in the contact-info container is missing the anchor tag wrapping the phone number.`;
            if (!phoneA || phoneA.innerText.trim().length <= 1) return wrong(errorMsg);

            // check if a tag has href attrs
            const phoneHref = pTags[1].querySelector("a").getAttribute("href");
            errorMsg = `Phone anchor tag in the contact-info container is missing the href attribute with the value of 'tel:'.`;
            if (!phoneHref || !phoneHref.includes("tel:")) return wrong(errorMsg);

            // EMAIL A TAG
            // check if b tag exist inside email p tag with text
            const emailA = pTags[2].querySelector("a");
            errorMsg = `Email text in the contact-info container is missing the anchor tag wrapping the email address.`;
            if (!emailA || emailA.innerText.trim().length <= 1) return wrong(errorMsg);

            // check if a tag has href attrs
            const emailHref = pTags[2].querySelector("a").getAttribute("href");
            errorMsg = `Email anchor tag in the contact-info container is missing the href attribute with the value of 'mailto:'.`;
            if (!emailHref || !emailHref.includes("mailto")) return wrong(errorMsg);

            // VISUALS CONTAINER DIV
            // check if container for visual items exist
            const visualsContainer = contact.lastElementChild;
            const nodeName = visualsContainer.nodeName;
            const div = "DIV";
            errorMsg = "Container div for the iframe and img tags is missing inside contact div.";
            if (!visualsContainer || nodeName !== div) return wrong(errorMsg);

            // check if container has the right classes
            const visualsContainerClasses = "container-fluid d-md-flex p-0".split(" ");
            const missingVisualsContainerClasses = visualsContainerClasses.filter(e => !visualsContainer.className.includes(e));
            errorMsg = `Container div for the iframe and img tags inside contact div is missing these Bootstrap classes: '${missingVisualsContainerClasses}'`;
            if (missingVisualsContainerClasses.length > 0) return wrong(errorMsg);

            // RATIO WRAPPER DIV
            // check if wrapper div for iframe exist
            const ratioDiv = visualsContainer.querySelector("div");
            errorMsg = "Wrapper div for the iframe tag is missing inside visuals container div in contact div.";
            if (!ratioDiv) return wrong(errorMsg);

            // check if wrapper div has the right classes
            const ratioDivClasses = "ratio ratio-16x9".split(" ");
            const missingRatioDivClasses = ratioDivClasses.filter(e => !ratioDiv.className.includes(e));
            errorMsg = `Wrapper div for the iframe tag inside visuals container div in contact div is missing these Bootstrap classes: '${missingRatioDivClasses}'`;
            if (missingRatioDivClasses.length > 0) return wrong(errorMsg);

            // IFRAME
            // check if iframe exist
            const iframe = ratioDiv.querySelector("iframe");
            errorMsg = "The iframe tag for the location is missing inside contact div.";
            if (!iframe) return wrong(errorMsg);

            // check if iframe src attrs exist
            const src = "https://www.google.com/maps/embed";
            const iframeSrc = iframe.getAttribute("src");
            errorMsg = `Iframe tag inside contact div is missing the src attribute, it should start like this: '${src}'`;
            if (!iframeSrc || !iframeSrc.includes(src)) return wrong(errorMsg);

            // check if iframe loading attrs exist
            const loading = "lazy";
            const iframeLoading = iframe.getAttribute("loading");
            errorMsg = `Iframe tag inside contact div is missing the loading attribute: '${loading}'`;
            if (!iframeLoading || !iframeLoading.includes(loading)) return wrong(errorMsg);

            // WRAPPER IMG
            // check if wrapper img exist
            const imgWrapper = visualsContainer.lastElementChild;
            const wrapperNodeName = imgWrapper.nodeName;
            errorMsg = "Wrapper div for the img tag is missing inside visuals wrapper div in contact div.";
            if (!imgWrapper || wrapperNodeName !== div) return wrong(errorMsg);

            // check if wrapper has the right classes
            const imgWrapperClasses = "container-fluid p-0".split(" ");
            const missingImgWrapperClasses = imgWrapperClasses.filter(e => !imgWrapper.className.includes(e));
            errorMsg = `Wrapper div for the img tag inside visuals wrapper div in  contact div is missing these Bootstrap classes: '${missingImgWrapperClasses}'`;
            if (missingImgWrapperClasses.length > 0) return wrong(errorMsg);

            // IMG
            // check if img exist inside contact
            const img = imgWrapper.querySelector("img");
            errorMsg = `The image tag inside contact div is missing.`;
            if (!img) return wrong(errorMsg);

            // check if img has the right class
            const imgClasses = "img-fluid";
            const missingImgClass = !img.className.includes(imgClasses);
            errorMsg = `The img tag inside contact div is missing this Bootstrap class: '${imgClasses}' .`;
            if (missingImgClass) return wrong(errorMsg);

            // check if img has the src attribute
            const imgSrc = img.getAttribute("src");
            errorMsg = `The img tag inside contact div is missing the src attribute.`;
            if (!imgSrc || imgSrc.trim().length <= 1) return wrong(errorMsg);

            // check if img has the alt attribute
            const alt = img.getAttribute("alt");
            errorMsg = `The img tag inside contact div is missing the alt attribute.`;
            if (!alt || alt.trim().length <= 1) return wrong(errorMsg);

            return correct()
        }),
        this.page.execute(() => {
            // test 15
            // FOOTER
            // check if footer exist in body
            const footer = document.getElementById("footer");
            const footerId = "footer";
            const footerNodeName = "FOOTER";
            let errorMsg = `The footer tag with the id of '${footerId}' is missing inside the body of the HTML document.`;
            if (!footer || footer.nodeName !== footerNodeName) return wrong(errorMsg);

            // check if footer has the right classes
            const footerClasses = "footer bg-dark".split(" ");
            const missingFooterClasses = footerClasses.filter(e => !footer.className.includes(e));
            errorMsg = `The footer on the bottom of the page is missing these Bootstrap classes: '${missingFooterClasses}'`;
            if (missingFooterClasses.length > 0) return wrong(errorMsg);

            // NAV CONTAINER DIV
            // check if container exist
            const navContainer = footer.querySelector("div");
            errorMsg = "The container div for nav list is missing inside the footer."
            if (!navContainer) return wrong(errorMsg);

            // check if container has the right classes
            const navContainerClasses = "container-fluid pt-5 pb-3".split(" ");
            const missingNavContainerClasses = navContainerClasses.filter(e => !navContainer.className.includes(e));
            errorMsg = `The container div for nav list inside the footer is missing these Bootstrap classes: '${missingNavContainerClasses}'`;
            if (missingNavContainerClasses.length > 0) return wrong(errorMsg);

            // UL
            // check if ul exist
            const ul = navContainer.querySelector("ul");
            errorMsg = "The ul tag in nav container div for the nav list is missing inside the footer.";
            if (!ul) return wrong(errorMsg);

            // check if ul has the right class
            const ulClass = "nav";
            errorMsg = `The ul tag in container div inside the footer is missing this Bootstrap class: '${ulClass}'`;
            if (!ul.className.includes(ulClass)) return wrong(errorMsg);

            // LIS
            // check if 5 li exist
            const liArr = Array.from(ul.querySelectorAll("li"));
            errorMsg = `There should be 5 li tags for each nav links inside the footer nav list, found: ${liArr.length}`;
            const liTotal = 5;
            if (liArr.length !== liTotal) return wrong(errorMsg);

            // check if all li has the right class
            const liClass = "nav-item";
            const liArrClass = liArr.filter(e => !e.className.includes(liClass))
            errorMsg = `All li tags  for each nav links inside the footer nav list should have the right Bootstrap class: '${liClass}'`;
            if (liArrClass.length > 0) return wrong(errorMsg);

            // ALL ANCHORS IN LI
            // check if there are 5  anchors
            const links = liArr.filter(e => e.querySelector("a"));
            errorMsg = `There should be a tags inside each li tags in the footer nav, found: ${links.length}.`;
            if (links.length !== liTotal) return wrong(errorMsg);

            // check if the  anchors have the right classes
            const aClasses = "nav-link link-secondary".split(" ");
            const temp = [];
            links.forEach(link => {
                temp.push(aClasses.find(e => !link.firstElementChild.className.includes(e)));
            });
            const missingLinkClasses = [];
            temp.forEach(e => e && missingLinkClasses.push(e));
            errorMsg = `Some of the anchor tags inside footer nav list are missing these Bootstrap classes: '${missingLinkClasses}' .`;
            if (missingLinkClasses.length > 0) return wrong(errorMsg);

            // HOME ANCHOR
            // check if the home anchor has the right href attr
            const aHome =  liArr[0].querySelector("a")
            const homeHref = "#home";
            const aHomeHref = aHome.getAttribute("href");
            errorMsg = `Inside footer nav list the first anchor tag for home is missing the right href attribute: ${homeHref}.`;
            if (!aHomeHref || !aHomeHref.includes(homeHref)) return wrong(errorMsg);

            // check if the home anchor has the right inner text
            const homeText = "Home";
            const aHomeText = aHome.innerText;
            errorMsg = `Inside footer nav list the first anchor tag for home is missing the right inner text: ${homeText}.`;
            if (!aHomeText.includes(homeText)) return wrong(errorMsg);

            // ABOUT ANCHOR
            // check if about anchor has the right href
            const aAbout = liArr[1].querySelector("a")
            const aAboutHref = aAbout.getAttribute("href");
            const aboutHref = "#about";
            errorMsg = `Inside footer nav list the anchor tag for about should have the right href attribute: ${aboutHref}.`;
            if (!aAboutHref || !aAboutHref.includes(aboutHref)) return wrong(errorMsg);

            // check if about anchor has the right inner text
            const aboutText = "About";
            const aAboutText = aAbout.innerText;
            errorMsg = `Inside footer nav list the anchor tag for about should have the right inner text: ${aboutText}.`;
            if (!aAboutText.includes(aboutText)) return wrong(errorMsg);

            // PRODUCTS ANCHOR
            // check if products anchor the right href
            const aProducts = liArr[2].querySelector("a");
            const aProductsHref = aProducts.getAttribute("href");
            const productsHref = "#products";
            errorMsg = `Inside footer nav list the anchor tag for products should have the right href attribute: ${productsHref}.`;
            if (!aProductsHref || !aProductsHref.includes(productsHref)) return wrong(errorMsg);

            // check if products anchor has the right inner text
            const productsText = "Products";
            const aProductsText = aProducts.innerText;
            errorMsg = `Inside footer nav list the anchor tag for products should have the right inner text: ${productsText}.`;
            if (!aProductsText.includes(productsText)) return wrong(errorMsg);

            // REVIEWS ANCHOR
            // check if reviews anchor the right href
            const aReviews = liArr[3].querySelector("a");
            const aReviewsHref = aReviews.getAttribute("href");
            const reviewsHref = "#reviews";
            errorMsg = `Inside footer nav list the anchor tag for reviews should have the right href attribute: ${reviewsHref}.`;
            if (!aReviewsHref || !aReviewsHref.includes(reviewsHref)) return wrong(errorMsg);

            // check if reviews anchor has the right inner text
            const reviewsText = "Reviews";
            const aReviewsText = aReviews.innerText;
            errorMsg = `Inside footer nav list the anchor tag for reviews should have the right inner text: ${reviewsText}.`;
            if (!aReviewsText.includes(reviewsText)) return wrong(errorMsg);

            // CONTACT ANCHOR
            // check if contact anchor the right href
            const aContact = liArr[4].querySelector("a");
            const aContactHref = aContact.getAttribute("href");
            const contactHref = "#contact";
            errorMsg = `Inside footer nav list the anchor tag for contact should have the right href attribute: ${contactHref}.`;
            if (!aContactHref || !aContactHref.includes(contactHref)) return wrong(errorMsg);

            // check if contact anchor has the right inner text
            const contactText = "Contact";
            const aContactText = aContact.innerText;
            errorMsg = `Inside footer nav list the anchor tag for contact should have the right inner text: ${contactText}.`;
            if (!aContactText.includes(contactText)) return wrong(errorMsg);

            // check if the contact anchor has the aria-current attr
            const ariaCurr = "page";
            const aContactAria = aContact.getAttribute("aria-current");
            errorMsg = `Inside footer nav list the anchor tag for contact is missing the right aria-current attribute: ${ariaCurr}.`;
            if (!aContactAria || !aContactAria.includes(ariaCurr)) return wrong(errorMsg);

            // SPAN CONTAINER
            // check if container exist
            const spanContainer = Array.from(footer.querySelectorAll("div"))[1];
            errorMsg = "The container div for the copyright text span is missing in the footer.";
            if (!spanContainer) return wrong(errorMsg);

            // check if container has the right classes
            const spanContainerClasses = "container-fluid pb-5 px-4".split(" ");
            const missingSpanContainerClasses = spanContainerClasses.filter(e => !spanContainer.className.includes(e));
            errorMsg = `The container div for the copyright text span inside the footer is missing these Bootstrap classes: '${missingSpanContainerClasses}'`;
            if (missingSpanContainerClasses.length > 0) return wrong(errorMsg);

            // SPAN
            // check if span exist
            const span = spanContainer.querySelector("span");
            errorMsg = "The span tag for the copyright text inside a container is missing in the footer.";
            if (!span) return wrong(errorMsg);

            // check if span has the right class
            const spanClasses = "text-muted px-1".split(" ");
            const missingSpanClasses = spanClasses.filter(e => !span.className.includes(e));
            errorMsg = `The span tag for the copyright text inside a container inside the footer is missing these Bootstrap classes: '${spanClasses}'`;
            if (missingSpanClasses.length > 0) return wrong(errorMsg);

            // check if span has the right inner text
            const innerText = "2021 Hyperskill Cafe";
            errorMsg = `The span tag for the copyright text inside a container inside the footer is missing the right inner text: ${innerText}`;
            if (!span.innerText.trim().includes(innerText)) return wrong(errorMsg);

            return correct();
        }),
    ]
}

it('Test stage', async function () {
    try {
        this.timeout(30000)
    } catch (ignored) {
    }
    await new CafeTest().runTests()
}, 30000)