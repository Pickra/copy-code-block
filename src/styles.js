import csjs from 'csjs';
import insertCss from 'insert-css';
import { getMergedOptions, mergeColors } from './helpers';

const ignoredColors = [
    'textColor',
    'background',
    'buttonTextColor',
    'buttonBackground',
];

export default customOptions => {
    const colors = mergeColors(customOptions.colors);

    const {
        containerPadding,
        containerMarginBottom, displayCodeWidth, copyButtonWidth,
        copyButtonHeight, copyButtonFontSize, copyButtonOutline
    } = getMergedOptions(customOptions);

    const cssMap = csjs`
        .container {
            display: flex;
            padding: ${containerPadding};
            margin-bottom: ${containerMarginBottom};
            box-sizing: border-box;
            background-color: ${colors.background};
            color: ${colors.textColor};
        }

        .container code {
            display: block;
            overflow-x: auto;
            padding: 0.5em;
        }

        .container pre {
            margin: 0;
        }

        .displayCode {
            flex-basis: ${displayCodeWidth};
            max-width: ${displayCodeWidth};
        }

        .copyButton {
            height: ${copyButtonHeight};
            padding: 0;
            flex-basis: ${copyButtonWidth};
            max-width: ${copyButtonWidth};
            color: ${colors.buttonTextColor || colors.textColor};
            background-color: ${colors.buttonBackground || colors.background};
            outline: ${copyButtonOutline} ${colors.textColor};
            border: none;
            font-size: ${copyButtonFontSize};
            align-self: center;
            box-sizing: border-box;
            margin-left: 1em;
            min-width: 3em;
        }

        .copyButton:hover {
            cursor: pointer;
            color: ${colors.buttonBackground || colors.background};
            background-color: ${colors.buttonTextColor || colors.textColor};
        }
    `;

    const hljsStyles = Object.keys(colors)
        .filter(k => ignoredColors.indexOf(k) === -1)
        .map(name => {
            // convert from camelCase to hyphen-case
            const type = name.replace(/[A-Z]/g, char => `-${char.toLowerCase()}`);
            return `.${cssMap.container} .hljs-${type} { color: ${colors[name]}; }`;
        }).join('\n')

    insertCss(csjs.getCss(cssMap) + hljsStyles + `
    .${cssMap.container} .hljs-emphasis { font-style: italic; }
    .${cssMap.container} .hljs-strong { font-weight: bold; }
    `)



    return cssMap;
};
