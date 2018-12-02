//////////////// COPY CODE BLOCK ////////////////
// Iterate over the string and replace code characters as needed
export const getDisplayString = string => [].map.call(string, s => {
    if (s.match(/</)) return '&lt;';
    else if (s.match(/>/)) return '&gt;';
    else if (s.match(/\n|\r/)) return '<br />';
    else if (s.match(/\s/)) return '&nbsp;';
    else return s;
}).join('');

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
    textColor: `#0d006d`,
    containerPadding: '0 1rem 1rem',
    containerBackgroundColor: '#dbd6ff',
    containerColor: textColor,
    containerMarginBottom: '2rem',
    displayCodeWidth: '80%',
    copyButtonWidth: '20%',
    copyButtonHeight: '2rem',
    copyButtonColor: textColor,
    copyButtonBackgroundColor: '#ffffff',
    copyButtonOutline: `2px solid ${textColor}`,
    copyButtonFontSize: '1rem'
};

export const getMergedOptions = customOptions => {
    return {...defaultOptions, ...customOptions};
};