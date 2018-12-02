import csjs from 'csjs-inject';

const defaultOptions = {
    containerBackgroundColor: 'red',
    containerColor: 'green'
};

const getMergedOptions = customOptions => {
    return {...defaultOptions, ...customOptions};
};

export default customOptions => {
    const {
        containerBackgroundColor, containerColor
    } = getMergedOptions(customOptions);

    return csjs`
        .container {
            display: flex;
            padding: 1rem;
            margin-bottom: 2rem;
            box-sizing: border-box;
            background-color: ${containerBackgroundColor};
            color: ${containerColor}
        }   

        .displayCode {
            flex-basis: 80%;
            max-width: 80%;
        }

        .copyButton {
            flex-basis: 20%;
            max-width: 20%;
            height: 2rem;
            outline: 2px solid black;
            align-self: center;
        }

        .copyButton:hover {
            cursor: pointer;
        }
    `;
};