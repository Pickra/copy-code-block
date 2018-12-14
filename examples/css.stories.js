import { storiesOf } from '@storybook/html';
import copyCodeBlock from '../src/copyCodeBlock';
import { customStyles } from './customHtml';
import { usageExample, usageExampleJsHighlight } from './helpers';
import hljs from 'highlight.js/lib/highlight';

// Register languages for hljs
hljs.registerLanguage('css', require('highlight.js/lib/languages/css'));
hljs.registerLanguage('javascript', require('highlight.js/lib/languages/javascript'));

const a11yLightStyle = require('!url-loader!highlight.js/styles/a11y-light.css');
const draculaStyle = require('!url-loader!highlight.js/styles/dracula.css');

const opts = {
    lang: 'css',
    colors: {
        'selector-class': 'rebeccapurple',
        attribute: 'green',
        number: 'salmon'
    }
};

const cssExample = `
    .cool-container {
        display: flex;
        border: 1px solid salmon;
        font-size: 16px;
    }

    .cool-description {
        padding: 1rem;
        flex-basis: 80%;
        max-width: 80%;
    }

    .cool-list {
        flex-basis: 20%;
        max-width: 20%;
    }

    .cool-item { color: salmon; }
`;

storiesOf('CSS', module)
    .add('Code File', () => `
        <link rel="stylesheet" href="${draculaStyle}">
        <h1>Code File</h1>
        <h2>Example Code</h2>
        ${copyCodeBlock(cssExample) /* Will not run through hljs */}
        <h2>Usage</h2>
        ${copyCodeBlock(usageExample(null, 'css'), usageExampleJsHighlight)}
    `)
    .add('Code String', () => `
        <link rel="stylesheet" href="${draculaStyle}">
        <h1>Code String</h1>
        <h2>Example Code</h2>
        ${copyCodeBlock(cssExample) /* Will not run through hljs */}
        <h2>Usage</h2>
        ${copyCodeBlock(usageExample(), usageExampleJsHighlight)}
    `)
    .add('Custom styles, no syntax highlighting', () => `
        <link rel="stylesheet" href="${draculaStyle}">
        <h1>Custom styles, no syntax highlighting</h1>
        <h2>Example Code</h2>
        ${copyCodeBlock(cssExample, customStyles) /* Still not run through hljs */}
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
        ${copyCodeBlock(cssExample, {lang: 'css'}) /* Run through hljs, no custom styles */}
        <h2>Usage</h2>
        ${copyCodeBlock(usageExample({lang: 'css'}), usageExampleJsHighlight)}
    `)
    .add('Syntax highlighting & custom styles', () => `
        <link rel="stylesheet" href="${a11yLightStyle}">
        <h1>Syntax highlighting & custom styles</h1>
        <h2>Example Code</h2>
        ${copyCodeBlock(cssExample, opts) /* Run through hljs, w/custom styles */}
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

        const domEl = copyCodeBlock(cssExample, options);

        const usageHeader = document.createElement('h2');
        usageHeader.innerHTML = 'Usage Code';

        const jsUsageExample = document.createElement('div');
        jsUsageExample.innerHTML = copyCodeBlock(usageExample(options), usageExampleJsHighlight);

        container.append(link, exampleHeader, domEl, usageHeader, jsUsageExample);
        return container;
    });