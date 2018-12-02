import { storiesOf } from '@storybook/html';
import copyCodeBlock from '../copyCodeBlock';

const singleQuotesExample = 
`<div class='cool-container'>
    <h1 class='cool-header'>HEY EVERYBODY</h1>
    <p class='cool-description'>Get ready for...</p>
    <ul class='cool-list'>
        <li class='cool-item'>rainbows</li>
        <li class='cool-item'>and</li>
        <li class='cool-item'>unicorns</li>
    </ul>
</div>`;

const doubleQuotesExample = 
`<div class="cool-container">
    <h1 class="cool-header">HEY EVERYBODY</h1>
    <p class="cool-description">Get ready for...</p>
    <ul class="cool-list">
        <li class="cool-item">rainbows</li>
        <li class="cool-item">and</li>
        <li class="cool-item">unicorns</li>
    </ul>
</div>`;

const opts = { containerBackgroundColor: 'salmon' };

storiesOf('Simple HTML', module)
    .add('Single quotes', () => `
        ${singleQuotesExample}
        ${copyCodeBlock(singleQuotesExample)}
    `)
    .add('Double quotes', () => `
        ${doubleQuotesExample}
        ${copyCodeBlock(doubleQuotesExample)}
    `)
    .add('Custom Colors', () => `
        ${doubleQuotesExample}
        ${copyCodeBlock(doubleQuotesExample, opts)}
    `);