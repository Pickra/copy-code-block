
import { storiesOf } from '@storybook/html';
import copyCodeBlock from '../copyCodeBlock';

import hljs from 'highlight.js/lib/highlight';

// Register Rust
hljs.registerLanguage('rust', require('highlight.js/lib/languages/rust'));

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
    textColor: '#efa',
  }
}

storiesOf('Rust', module)
  .add('Rust with syntax hilighting', () => copyCodeBlock(rustExample, hljsOpts))
  .add('Rust without styntax hilighting', () => copyCodeBlock(rustExample, noHljsOpts));