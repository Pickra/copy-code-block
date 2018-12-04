//////////////// COPY CODE BLOCK ////////////////
// Iterate over the string and replace code characters as needed
let hljs;

try {
    // not importing any languages
    hljs = require('highlight.js/lib/highlight')
} catch (e) {
    // do nothing
}

const escapeString = string => [].map.call(string, s => {
    if (s.match(/</)) return '&lt;';
    else if (s.match(/>/)) return '&gt;';
    else if (s.match(/ /)) return '&nbsp;';
    else return s;
}).join('')

export const getDisplayString = hljs
?   (string, { lang }) => {
    // if (lang && !hljs.getLanguage(lang)) {
    //     hljs.registerLanguage(lang, require(`highlight.js/lib/languages/${lang}`));
    // }
    const codeBlock = document.createElement('code');
    codeBlock.className = `${lang}`;
    codeBlock.innerHTML = escapeString(string);
    hljs.highlightBlock(codeBlock);
    return codeBlock.outerHTML;
}
:   str => escapeString(str).replace(/\n/g, '<br/>');

export const getClipboardString = string => string
    // Replace carriage returns or newlines with encoded newlines
    .replace(/(\r|\n)/g, '\\n')
    // Escape nested single quotes
    .replace(/'/g, '\\\'')
    // Replace double quptes w/HTML entity
    .replace(/"/g, '&quot;');

//////////////// STYLES ////////////////
const textColor = `#0d006d`;

const defaultOptions = {
    containerPadding: '0 1rem 1rem',
    containerColor: textColor,
    containerMarginBottom: '2rem',
    displayCodeWidth: '80%',
    copyButtonWidth: '20%',
    copyButtonHeight: '2rem',
    copyButtonColor: textColor,
    copyButtonOutline: `2px solid`,
    copyButtonFontSize: '1rem'
};

const defaultColors = {
    background: '#ffffff',
    foreground: '#0d006d',
}

export const getMergedOptions = customOptions => {
    return {...defaultOptions, ...customOptions};
};

export const mergeColors = customColors => {
    return {...defaultColors, ...customColors};
};