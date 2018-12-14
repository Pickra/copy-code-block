import { storiesOf } from '@storybook/html';
import copyCodeBlock from '../src/copyCodeBlock';
import { customStyles, customHtml, opts } from './customHtml';
import { usageExample, usageExampleJsHighlight } from './helpers';
import hljs from 'highlight.js/lib/highlight';

// Register languages for hljs
hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));

const a11yLightStyle = require('!url-loader!highlight.js/styles/a11y-light.css');
const draculaStyle = require('!url-loader!highlight.js/styles/dracula.css');

const htmlExample = `
<div class='cool-container'>
    <p class='cool-description'>Get ready for...</p>
    <ul class='cool-list'>
        <li class='cool-item'>rainbows</li>
        <li class='cool-item'>and</li>
        <li class='cool-item'>unicorns</li>
    </ul>
</div>`;

storiesOf('HTML', module)
    .add('Default', () => `
        <link rel="stylesheet" href="${draculaStyle}">
        <h1>Default</h1>
        <h2>Example Code</h2>
        ${copyCodeBlock(htmlExample) /* Will not run through hljs */}
        <h2>Usage</h2>
        ${copyCodeBlock(usageExample(), usageExampleJsHighlight)}
    `)
    .add('Custom styles, no syntax highlighting', () => `
        <link rel="stylesheet" href="${draculaStyle}">
        <h1>Custom styles, no syntax highlighting</h1>
        <h2>Example Code</h2>
        ${copyCodeBlock(htmlExample, customStyles) /* Still not run through hljs */}
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
        ${copyCodeBlock(htmlExample, {lang: 'xml'}) /* Run through hljs, no custom styles */}
        <h2>Usage</h2>
        ${copyCodeBlock(usageExample({lang: 'xml'}), usageExampleJsHighlight)}
    `)
    .add('Syntax highlighting & custom styles', () => `
        <link rel="stylesheet" href="${a11yLightStyle}">
        <h1>Syntax highlighting & custom styles</h1>
        <h2>Example Code</h2>
        ${customHtml(htmlExample) /* Run through hljs, w/custom styles */}
        <h2>Usage</h2>
        ${copyCodeBlock(usageExample(opts), usageExampleJsHighlight)}
    `)
    .add('Return DOM element', () => {
        const options = {shouldReturnDomEl: true};
        const container = document.createElement('div');

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = draculaStyle;

        const exampleHeader = document.createElement('h2');
        exampleHeader.innerHTML = 'Example Code';

        const domEl = copyCodeBlock(htmlExample, options);

        const usageHeader = document.createElement('h2');
        usageHeader.innerHTML = 'Usage Code';

        const jsUsageExample = document.createElement('div');
        jsUsageExample.innerHTML = copyCodeBlock(usageExample(options), usageExampleJsHighlight);

        container.append(link, exampleHeader, domEl, usageHeader, jsUsageExample);
        return container;
    });
