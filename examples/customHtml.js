import copyCodeBlock from '../src/copyCodeBlock';

export const opts = {
    lang: 'xml',
    colors: {
        background: '#222',
        textColor: '#fff',
        attr: '#fab',
        string: '#abe',
        tag: '#afa',
        name: '#ea8'
    }
};

export const cssOverrides = {
    cssOverrides: `
        .container {
            position: relative;
        }
        .displayCode {
            max-width: 100%;
        }
        .copyButton {
            padding: 0.5rem;
            outline: none;
            border: 1px solid #fff;
            border-top: 0;
            border-right: 0;
            border-radius: 0 0 0 2px;
            position: absolute;
            top: 0;
            right: 0;
            font-size: 0.75rem;
        }
    `
};

export const customStyles = {
    // no hljs
    colors: { background: "#fa8072", textColor: "#4e2576"},
    displayCodeWidth: "50%",
    copyButtonWidth: "50%"
};

export const customHtml = (string, customOpts = opts) => copyCodeBlock(string, customOpts);
