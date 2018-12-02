import { configure } from '@storybook/html';

const stories = require.context('../src/examples', true, /\.stories\.js$/);

function loadStories() {
    stories.keys().forEach(fileName => stories(fileName));
}

configure(loadStories, module);