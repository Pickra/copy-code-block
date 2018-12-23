const url = 'HTML&selectedStory=Syntax%20highlighting%20%26%20custom%20styles';
const hljsTag = 'pre[class^="displayCode"] code .hljs-tag';
const hljsName = `${hljsTag} .hljs-name`;
const hljsAttr = `${hljsTag} .hljs-attr`;
const hljsString = `${hljsTag} .hljs-string`;

const colors = {
    [hljsTag]: 'rgba(170, 255, 170, 1)',
    [hljsName]: 'rgba(238, 170, 136, 1)',
    [hljsAttr]: 'rgba(255, 170, 187, 1)',
    [hljsString]: 'rgba(170, 187, 238, 1)'
};

module.exports = {
    "Test syntax highlighted display code": browser => {
        browser.url(browser.launchUrl + url);

        Object.entries(colors).forEach(entry => {
            browser.expect.element(entry[0])
                .to.have.css('color').which.equals(entry[1]);
        });

        browser.end();
    }
};