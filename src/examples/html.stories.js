
import { storiesOf } from '@storybook/html';
import copyCodeBlock from '../copyCodeBlock';
import customHtml from './customHtml';

import hljs from 'highlight.js/lib/highlight';

const hljsStyle = require('!url-loader!highlight.js/styles/a11y-light.css');

// Register XML/HTML
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));

// Default hljs theme if no colors are supplied
// import 'highlight.js/styles/a11y-dark.css';

const singleQuotesExample = `
<div class='cool-container'>
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
        ${copyCodeBlock(singleQuotesExample) /* Will not run through hljs */}
    `)
    .add('Double quotes', () => `
        ${doubleQuotesExample}
        ${copyCodeBlock(doubleQuotesExample, { lang: 'html' }) /* Will run through hljs, but without custom styling */}
    `)
    .add('With syntax highlighting & built-in style', () => `
        <link rel="stylesheet" href="${hljsStyle}">
        <h2>This example is using "highlight.js/styles/a11y-light.css"</h2>
        ${doubleQuotesExample}
        ${copyCodeBlock(doubleQuotesExample, { lang: 'html' }) /* Includes custom styling */}
    `)
    .add('With syntax highlighting & custom style', () => `
        ${doubleQuotesExample}
        ${customHtml(doubleQuotesExample) /* Includes custom styling */}
    `);
