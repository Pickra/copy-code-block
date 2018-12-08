//////////////// COPY CODE BLOCK ////////////////
// Iterate over the string and replace code characters as needed

// use the ambient hljs by default
let hljs = window.hljs;

try {
    // try to import hljs if there is no ambient version
    // not importing any languages; leaving that up to the consumer
    hljs = hljs || require('highlight.js/lib/highlight')
} catch (e) {
    // do nothing
}

if (hljs) hljs.configure({ useBR: true })

const escapeString = string => [].map.call(string, s => {
    if (s.match(/</)) return '&lt;';
    else if (s.match(/>/)) return '&gt;';
    // else if (s.match(/ /)) return '&nbsp;';
    else if (s.match(/\n/)) return '<br/>'
    else return s;
}).join('')

const AUTO_LANGUAGE = 'auto'

export const getDisplayString = (string, { lang }) => {
    const escaped = escapeString(string)
    const codeBlock = document.createElement('code');
    codeBlock.innerHTML = escaped;

    if (lang !== undefined) {
        if (!hljs) {
            // falls back to not using hljs
            console.warn('hightlight.js is not available')
        } else if (lang !== AUTO_LANGUAGE && !hljs.getLanguage(lang)) {
            // falls back to not using hljs
            console.warn(`hightlight.js does not recognize the language '${lang}'.`)
        } else {
            if (lang !== AUTO_LANGUAGE) {
                codeBlock.className = `${lang}`;
            }

            hljs.highlightBlock(codeBlock);
        }
    }

    return codeBlock.outerHTML;
};

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
    containerMarginBottom: '2rem',
    displayCodeWidth: '80%',
    copyButtonWidth: '20%',
    copyButtonHeight: '2rem',
    copyButtonOutline: `2px solid`,
    copyButtonFontSize: '1rem'
};

const defaultColors = {
    background: 'white',
    foreground: '#0d006d',
}

export const getMergedOptions = customOptions => {
    return {...defaultOptions, ...customOptions};
};

export const mergeColors = customColors => {
    return {...defaultColors, ...customColors};
};
