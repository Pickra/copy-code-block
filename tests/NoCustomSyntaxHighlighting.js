const url = 'HTML&selectedStory=Syntax%20highlighting%2C%20no%20custom%20styles';
const containerLabel = 'span[class^="containerLabel"]';
const code = 'pre[class^="displayCode"] code';
const hljsTag = `${code} .hljs-tag`;
const hljsName = `${hljsTag} .hljs-name`;
const hljsAttr = `${hljsTag} .hljs-attr`;
const hljsString = `${hljsTag} .hljs-string`;

module.exports = {
    "Test syntax highlighted display code": browser => {
        browser
            .url(browser.launchUrl + url)
            .assert.containsText(containerLabel, 'xml code block.')
            .assert.visible(code)
            .assert.cssClassPresent(code, 'hljs')
            .assert.cssClassPresent(code, 'xml')
            .assert.visible(hljsTag)
            .assert.containsText(hljsTag, "<")
            .assert.visible(hljsName)
            .assert.containsText(hljsName, "div")
            .assert.visible(hljsAttr)
            .assert.containsText(hljsAttr, "class")
            .assert.visible(hljsString)
            .assert.containsText(hljsString, "cool-container");

        browser.expect.element(hljsTag)
            .to.have.css('color').which.equals('rgba(217, 30, 24, 1)');

        browser.expect.element(hljsString)
            .to.have.css('color').which.equals('rgba(0, 128, 0, 1)');
            
        browser.end();
    }
};