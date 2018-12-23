const url = 'HTML&selectedStory=Code%20File';
const button = 'button[class^="copyButton"]';

const container = 'div[class^="container"]';
const containerLabel = 'span[class^="containerLabel"]';
const code = 'pre[class^="displayCode"] code';

const expected = `
<div class='cool-container'>
    <p class='cool-description'>Get ready for...</p>
    <ul class='cool-list'>
        <li class='cool-item'>rainbows</li>
        <li class='cool-item'>and</li>
        <li class='cool-item'>unicorns</li>
    </ul>
</div>`;

const codeContent = expected.slice(1);

module.exports = {
    beforeEach: browser => {
        browser
            .url(browser.launchUrl + url);
    },

    "Test copy to clipboard functionality": browser => {
        browser
            .waitForElementVisible(button)
            .click(button)
            .executeAsync(function(done) {
                // Get clipboard value...
                navigator.clipboard.readText().then(done);
            }, [], function(res) {
                // ...compare it to expected value
                browser.assert.ok(res.value === expected, 'clipboard value === expected');
            })
            .end();
    },

    "Test display code": browser => {
        browser
            .assert.visible(container)
            .assert.visible(containerLabel)
            .assert.containsText(containerLabel, 'code block.')
            .assert.visible(code)
            .assert.cssClassNotPresent(code, 'hljs')
            .assert.containsText(code, codeContent)
            .end();
    },

    "Test default colors": browser => {
        browser.expect.element(container)
            .to.have.css('color').which.equals('rgba(32, 32, 32, 1)');

        browser.expect.element(container)
            .to.have.css('background-color').which.equals('rgba(247, 247, 247, 1)');
            
        browser.end();
    }
};