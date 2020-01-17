import csjs from 'csjs';
import insertCss from 'insert-css';
import { getMergedOptions, mergeColors } from './utils';

const ignoredColors = [
    'textColor',
    'background',
    'buttonTextColor',
    'buttonBackground',
];

export default customOptions => {
    const colors = mergeColors(customOptions.colors);

    const {
        containerPadding, containerMarginBottom, displayCodeWidth,
        copyButtonPadding, copyButtonWidth, copyButtonFontSize, copyButtonOutline
    } = getMergedOptions(customOptions);

    const cssMap = csjs`
        .container {
            display: flex;
            padding: ${containerPadding};
            margin-bottom: ${containerMarginBottom};
            box-sizing: border-box;
            background-color: ${colors.background};
            color: ${colors.textColor};
            position: relative;
        }

        .container code {
            display: block;
            overflow-x: auto;
            padding: 0 1rem 1rem;
        }

        .container pre { margin: 0; }

        .containerLabel {
            position: absolute;
            height: 1px;
            width: 1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
        }

        .displayCode {
            max-width: 100%;
        }

        .copyButton {
            padding: 0.5rem;
            flex-basis: ${copyButtonWidth};
            max-width: ${copyButtonWidth};
            color: ${colors.buttonTextColor || colors.textColor};
            background-color: ${colors.buttonBackground || colors.background};
            border: 1px solid ${colors.textColor};
            border-top: 0;
            border-right: 0;
            border-radius: 0 0 0 2px;
            font-size: ${copyButtonFontSize};
            align-self: center;
            margin-left: 1em;
            position: absolute;
            top: 0;
            right: 0;
        }

        .copyButton:hover, .copyButton:focus {
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
        }).join('\n');
    const hasTextColorOverride = customOptions.colors && !!customOptions.colors.textColor

    // hljs overrides
    insertCss(
        csjs.getCss(cssMap) + hljsStyles + `
            .${cssMap.container} .hljs {
                background: ${colors.background};
                color: ${hasTextColorOverride ? colors.textColor : ''};
            }
            .${cssMap.container} .hljs-emphasis { font-style: italic; }
            .${cssMap.container} .hljs-strong { font-weight: bold; }
        `
    );

    return cssMap;
};
