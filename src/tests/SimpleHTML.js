const url = 'Simple%20HTML&selectedStory=Single%20quotes';
const button = '#single';

module.exports = {
    beforeEach: browser => {
        browser
            .url(browser.launchUrl + url)
            .pause(1)
            .frame(0);
    },

    "Simple HTML": browser => {
        const paste = 'paste-here';
        const id = `#${paste}`;

        browser
            .waitForElementVisible(button)
            .click(button)
            .moveToElement(id, null, null)
            .mouseButtonClick('right')
            // .keys([browser.Keys.COMMAND, browser.Keys.V])
            // .keys(['P', 'ENTER'])
            .moveTo(null, null, 500)
            // .mouseButtonClick()
            .getValue(id, res => {
                browser.assert.ok(res.value, 'therell b something here when the damn thing works');
            })
    }
};