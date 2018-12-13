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