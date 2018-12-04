const url = 'Simple%20HTML&selectedStory=Single%20quotes';
const button = 'button[class^="copyButton"]';

const expected = `
<div class='cool-container'>
    <h1 class='cool-header'>HEY EVERYBODY</h1>
    <p class='cool-description'>Get ready for...</p>
    <ul class='cool-list'>
        <li class='cool-item'>rainbows</li>
        <li class='cool-item'>and</li>
        <li class='cool-item'>unicorns</li>
    </ul>
</div>`;

module.exports = {
    beforeEach: browser => {
        browser
            .url(browser.launchUrl + url)
            .pause(1)
            .frame(0);
    },

    "Simple HTML": browser => {
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
    }
};