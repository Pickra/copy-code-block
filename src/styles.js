import csjs from 'csjs';
import insertCss from 'insert-css';
import { getMergedOptions, mergeColors } from './helpers';

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
            color: ${colors.foreground};
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
            color: ${colors.foreground};
            background-color: ${colors.background};
            outline: ${copyButtonOutline} ${colors.foreground};
            border: none;
            font-size: ${copyButtonFontSize};
            align-self: center;
            box-sizing: border-box;
            margin-left: 1em;
            min-width: 3em;
        }

        .copyButton:hover {
            cursor: pointer;
            color: ${colors.background};
            background-color: ${colors.foreground};
        }
    `;

    const hljsStyles = Object.keys(colors).map(name => {
        switch (name) {
            case 'background':
                return `.${cssMap.container} .hljs { background: ${colors[name]}; }`;
            case 'foreground':
                return `.${cssMap.container} .hljs { color: ${colors[name]}; }`;
            default:
                const type = name.replace(/[A-Z]/g, char => `-${char.toLowerCase()}`);
                return `.${cssMap.container} .hljs-${type} { color: ${colors[name]}; }`;
        }
    }).filter(p => p).join('\n')

    insertCss(csjs.getCss(cssMap) + hljsStyles + `
    .${cssMap.container} .hljs-emphasis { font-style: italic; }
    .${cssMap.container} .hljs-strong { font-weight: bold; }
    .${cssMap.container} .hljs {
        display: block;
        overflow-x: auto;
        padding: 0.5em;
    }`)



    return cssMap;
};
