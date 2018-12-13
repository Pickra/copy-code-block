import copyCodeBlock from '../src/copyCodeBlock';

export const opts = {
    lang: 'html',
    colors: {
        background: '#222',
        textColor: '#fff',
        attr: '#fab',
        string: '#abe',
        tag: '#afa',
        name: '#ea8'
    }
};

export const customStyles = {
    // no hljs
    colors: { background: "#fa8072", textColor: "#4e2576"},
    displayCodeWidth: "50%",
    copyButtonWidth: "50%"
};

export const customHtml = string => copyCodeBlock(string, opts);
