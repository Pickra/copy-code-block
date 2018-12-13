import { configure } from '@storybook/html';

const stories = require.context('../examples', true, /\.stories\.js$/);

function loadStories() {
    stories.keys().forEach(fileName => stories(fileName));
}

configure(loadStories, module);