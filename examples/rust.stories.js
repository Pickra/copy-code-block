import { storiesOf } from '@storybook/html';
import copyCodeBlock from '../src/copyCodeBlock';
import { usageExample, usageExampleJsHighlight } from './helpers';
import hljs from 'highlight.js/lib/highlight';

// Register languages for hljs
hljs.registerLanguage('rust', require('highlight.js/lib/languages/rust'));
hljs.registerLanguage('js', require('highlight.js/lib/languages/javascript'));

const a11yLightStyle = require('!url-loader!highlight.js/styles/a11y-light.css');
const draculaStyle = require('!url-loader!highlight.js/styles/dracula.css');

const rustExample = `
#![meta "meta-string"]
fn main() {
    // The statements here will be executed when the compiled binary is called

    // Print text to the console
    println!("Hello World!");
}
`.trim();

const hljsOpts = {
  lang: 'rust',
  colors: {
    textColor: '#222',
    function: '#266',
    title: '#a42',
    comment: '#2a2',
    built_in: '#a26',
    string: '#288',
    meta: '#555',
    metaString: '#d2d' /* camelCase is converted to hyphen-case */
  }
};

const noHljsOpts = {
  colors: {
    background: '#111',
    textColor: '#efa'
  }
}

storiesOf('Rust', module)
  .add('Default', () => `
    <link rel="stylesheet" href="${draculaStyle}">
    <h1>Default</h1>
    <h2>Example Code</h2>
    ${copyCodeBlock(rustExample)}
    <h2>Usage</h2>
    ${copyCodeBlock(usageExample(), usageExampleJsHighlight)}
  `)
  .add('Custom styles, no syntax highlighting', () => `
    <link rel="stylesheet" href="${draculaStyle}">
    <h1>Custom styles, no syntax highlighting</h1>
    <h2>Example Code</h2>
    ${copyCodeBlock(rustExample, noHljsOpts)}
    <h2>Usage</h2>
    ${copyCodeBlock(usageExample(noHljsOpts), usageExampleJsHighlight)}
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
    ${copyCodeBlock(rustExample, {lang: 'rust'})}
    <h2>Usage</h2>
    ${copyCodeBlock(usageExample({lang: 'rust'}), usageExampleJsHighlight)}
  `)
  .add('Syntax highlighting & custom styles', () => `
    <link rel="stylesheet" href="${draculaStyle}">
    <h1>Syntax highlighting, no custom styles</h1>
    <h2>Example Code</h2>
    ${copyCodeBlock(rustExample, hljsOpts)}
    <h2>Usage</h2>
    ${copyCodeBlock(usageExample(hljsOpts), usageExampleJsHighlight)}
  `);
