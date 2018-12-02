import csjs from 'csjs-inject';
import { getMergedOptions } from './helpers';

export default customOptions => {
    const {
        containerBackgroundColor, containerColor, containerPadding,
        containerMarginBottom, displayCodeWidth, copyButtonWidth,
        copyButtonHeight, copyButtonColor, copyButtonBackgroundColor,
        copyButtonOutline, copyButtonFontSize
    } = getMergedOptions(customOptions);

    return csjs`
        .container {
            display: flex;
            padding: ${containerPadding};
            margin-bottom: ${containerMarginBottom};
            box-sizing: border-box;
            background-color: ${containerBackgroundColor};
            color: ${containerColor};
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
            color: ${copyButtonColor};
            background-color: ${copyButtonBackgroundColor};
            outline: ${copyButtonOutline};
            border: none;
            font-size: ${copyButtonFontSize};
            align-self: center;
        }

        .copyButton:hover {
            cursor: pointer;
            color: ${copyButtonBackgroundColor};
            background-color: ${copyButtonColor};
        }
    `;
};