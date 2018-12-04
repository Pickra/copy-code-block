import { storiesOf } from '@storybook/html';
import copyCodeBlock from '../copyCodeBlock';
import custom from './custom';

import hljs from 'highlight.js/lib/highlight';

// Register XML/HTML
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));

// Register Rust
hljs.registerLanguage('rust', require('highlight.js/lib/languages/rust'));

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

const rustExample = `
#![meta "meta-string"]
fn main() {
    // The statements here will be executed when the compiled binary is called

    // Print text to the console
    println!("Hello World!");
}
`;

storiesOf('Simple HTML', module)
    .add('Single quotes', () => `
        ${singleQuotesExample}
        ${copyCodeBlock(singleQuotesExample, { lang: 'html' })}
        <textarea id='paste-here'></textarea>
    `)
    .add('Double quotes', () => `
        ${doubleQuotesExample}
        ${copyCodeBlock(doubleQuotesExample, { lang: 'html' })}
    `)
    .add('Custom options', () => `
        ${doubleQuotesExample}
        ${custom(doubleQuotesExample)}
    `)
    .add('Rust example', () => copyCodeBlock(rustExample, {
        lang: 'rust',
        colors: {
            foreground: '#222',
            function: '#266',
            title: '#a42',
            comment: '#2a2',
            built_in: '#a26',
            string: '#288',
            meta: '#555',
            metaString: '#d2d'
        }
    }));