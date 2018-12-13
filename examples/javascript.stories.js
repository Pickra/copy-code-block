import { storiesOf } from '@storybook/html';
import copyCodeBlock from '../src/copyCodeBlock';
import { customStyles } from './customHtml';
import { usageExample, usageExampleJsHighlight } from './helpers';
import hljs from 'highlight.js/lib/highlight';

// Register languages for hljs
hljs.registerLanguage('js', require('highlight.js/lib/languages/javascript'));

const a11yLightStyle = require('!url-loader!highlight.js/styles/a11y-light.css');
const draculaStyle = require('!url-loader!highlight.js/styles/dracula.css');

const jsExample = `
import { Pants } from 'fancy-things';

var cool = 'cool';
let stuff = 'stuff';
const things = 'things';

function coolStuffAndThings(a, b, c) {
    return \`\$\{a\}\ \$\{b\}\ and \$\{c\}\`;
}

coolStuffAndThings(cool, stuff, things);
Pants();
`;

storiesOf('Javascript', module)
    .add('Default', () => `
        <link rel="stylesheet" href="${draculaStyle}">
        <h1>Default</h1>
        <h2>Example Code</h2>
        ${copyCodeBlock(jsExample) /* Will not run through hljs */}
        <h2>Usage</h2>
        ${copyCodeBlock(usageExample(), usageExampleJsHighlight)}
    `)
    .add('Custom styles, no syntax highlighting', () => `
        <link rel="stylesheet" href="${draculaStyle}">
        <h1>Custom styles, no syntax highlighting</h1>
        <h2>Example Code</h2>
        ${copyCodeBlock(jsExample, customStyles) /* Still not run through hljs */}
        <h2>Usage</h2>
        ${copyCodeBlock(usageExample(customStyles), usageExampleJsHighlight)}
    `)
    .add('Syntax highlighting, no custom styles', () => `
        <link rel="stylesheet" href="${a11yLightStyle}">
        <h1>Syntax highlighting, no custom styles</h1>
        <p>
            This example uses
            <a
                href="https://github.com/highlightjs/highlight.js/blob/master/src/styles/a11y-light.css"
                target="_blank"
            >a11y-light.css</a>
            from highlight.js, by adding it to the HTML's stylesheets.
        </p>
        <h2>Example Code</h2>
        ${copyCodeBlock(jsExample, {lang: 'js'}) /* Run through hljs, no custom styles */}
        <h2>Usage</h2>
        ${copyCodeBlock(usageExample({lang: 'js'}), usageExampleJsHighlight)}
    `)
    .add('Syntax highlighting & custom styles', () => `
        <link rel="stylesheet" href="${a11yLightStyle}">
        <h1>Syntax highlighting & custom styles</h1>
        <h2>Example Code</h2>
        ${copyCodeBlock(jsExample, usageExampleJsHighlight) /* Run through hljs, w/custom styles */}
        <h2>Usage</h2>
        ${copyCodeBlock(usageExample(usageExampleJsHighlight), usageExampleJsHighlight)}
    `);