const url = 'HTML&selectedStory=Custom%20styles%2C%20no%20syntax%20highlighting';
const container = 'div[class^="container"]';

module.exports = {
    "Test syntax highlighted display code": browser => {
        browser.url(browser.launchUrl + url);

        browser.expect.element(container)
            .to.have.css('color').which.equals('rgba(78, 37, 118, 1)');

        browser.expect.element(container)
            .to.have.css('background-color').which.equals('rgba(250, 128, 114, 1)');

        browser.end();
    }
};