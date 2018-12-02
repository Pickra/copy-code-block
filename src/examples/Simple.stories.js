import { storiesOf } from '@storybook/html';
import copyCodeBlock from '../copyCodeBlock';
import custom from './custom';

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

const doubleQuotesExample = singleQuotesExample.replace(/'/g, '"');

storiesOf('Simple HTML', module)
    .add('Single quotes', () => `
        ${singleQuotesExample}
        ${copyCodeBlock(singleQuotesExample)}
    `)
    .add('Double quotes', () => `
        ${doubleQuotesExample}
        ${copyCodeBlock(doubleQuotesExample)}
    `)
    .add('Custom options', () => `
        ${doubleQuotesExample}
        ${custom(doubleQuotesExample)}
    `);