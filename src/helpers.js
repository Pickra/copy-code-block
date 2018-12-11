//////////////// COPY CODE BLOCK ////////////////

// use the ambient hljs by default
let hljs = window.hljs;

try {
    // try to import hljs if there is no ambient version
    // not importing any languages; leaving that up to the consumer
    hljs = hljs || require('highlight.js/lib/highlight')
} catch (e) {
    // do nothing
}

const AUTO_LANGUAGE = 'auto'

export const getDisplayString = (string, { lang }) => {
    if (lang === undefined) {
        return `<code>${string}</code>`;
    }

    if (!hljs) {
        // falls back to not using hljs
        console.warn('hightlight.js is not available');
    } else if (lang !== AUTO_LANGUAGE && !hljs.getLanguage(lang)) {
        // falls back to not using hljs
        console.warn(`hightlight.js does not recognize the language '${lang}'.`);
    } else {
        const highlighted = lang !== AUTO_LANGUAGE
            ? hljs.highlight(lang, string, true)
            : hljs.highlightAuto(string);

        return `<code class="hljs ${lang}">${highlighted.value}</code>`;
    }

    return `<code>${string}</code>`;
};

export const getClipboardString = string => string
    // Get rid of carriage returns
    .replace(/\r/g, '')
    // Replace newlines with encoded newlines
    .replace(/\n/g, '\\n')
    // Escape nested single quotes
    .replace(/'/g, '\\\'')
    // Replace double quptes w/HTML entity
    .replace(/"/g, '&quot;');

//////////////// STYLES ////////////////
const textColor = `#202020`;

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
    background: '#f7f7f7',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    textColor: textColor,
}

export const getMergedOptions = customOptions => {
    return {...defaultOptions, ...customOptions};
};

export const mergeColors = customColors => {
    return {...defaultColors, ...customColors};
};
