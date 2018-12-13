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

// Iterate over the string and replace code characters as needed
const escapeString = string => [].map.call(string, s => {
    if (s.match(/</)) return '&lt;';
    else if (s.match(/>/)) return '&gt;';
    else if (s.match(/\n/)) return '<br/>';
    else return s;
}).join('')

export const getDisplayString = (string, { lang }) => {
    if (lang === undefined) {
        return `<code>${escapeString(string)}</code>`;
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

    return `<code>${escapeString(string)}</code>`;
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
    containerPadding: '0 1rem 0 0',
    containerMarginBottom: '2rem',
    displayCodeWidth: '80%',
    copyButtonWidth: '20%',
    copyButtonPadding: '1rem 0',
    copyButtonOutline: `2px solid`,
    copyButtonFontSize: '1rem'
};

const defaultColors = {
    background: '#f7f7f7',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    textColor: textColor
}

export const getMergedOptions = customOptions => {
    return {...defaultOptions, ...customOptions};
};

export const mergeColors = customColors => {
    return {...defaultColors, ...customColors};
};

//////////////// STORYBOOK EXAMPLES //////////////// 
const displayOpts = opts => '{' + Object.entries(opts).map(arr => {
    const key = arr[0];
    const val = arr[1];

    if (typeof val === "object") { return ` ${key}: ${displayOpts(val)}`; }
    if (key.indexOf('-') > 0) { return ` '${key}': '${val}'` }

    return ` ${key}: '${val}'`;
}) + '}';

export const usageExample = (opts = null) => {
    const options = !opts ? '' : `const options = ${displayOpts(opts)};`;
    const optionsExample = !opts ? '' : ', options';

const hljs = !opts || !opts.lang ? '' : `
import hljs from 'highlight.js/lib/highlight';
// Register language for hljs
hljs.registerLanguage('${opts.lang}', require('highlight.js/lib/langs/${opts.lang}'));
`;

return `
import copyCodeBlock from 'copyCodeBlock';
${hljs}

const htmlString = 'Just pretend this is the Example Code from above';
${options}
copyCodeBlock(htmlString${optionsExample});
`
};

export const usageExampleJsHighlight = {
    lang: 'js',
    colors: {
        background: '#282a36',
        textColor: '#fff',
        comment: 'salmon',
        built_in: '#fff',
        attr: 'lightblue'
    }
};
