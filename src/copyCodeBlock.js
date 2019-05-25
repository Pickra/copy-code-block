import { getDisplayString, getClipboardString } from './utils';
import styles from './styles';

export default (string, opts = {}) => {
    const { lang, shouldReturnDomEl = false } = opts;
    const { container, displayCode, copyButton, containerLabel } = styles(opts);

    const buttonText = 'Click to copy';
    const label = `${lang ? lang + ' ': ''}code block.`;
    const labelId = `${copyButton}`.slice(11);

    const onclick = btnId => `(function() {
        var textarea = document.createElement('textarea');
        var button = document.querySelector('#${btnId}');

        textarea.innerHTML = '${getClipboardString(string)}';
        document.body.appendChild(textarea);
        textarea.select();

        button.innerHTML = 'Copied!';
        setTimeout(function() { button.innerHTML = '${buttonText}'; }, 1500);

        document.execCommand('copy');
        document.body.removeChild(textarea);
    })();`;

    const code = `
        <div class='${container}' aria-labelledby='${labelId}' tabindex='0'>
            <span id='${labelId}' class='${containerLabel}'>${label}</span>
            <pre class='${displayCode}'>${getDisplayString(string, opts)}</pre>
            <button
                type='button'
                class='${copyButton}'
                id='${copyButton}'
                aria-live='polite'
                onclick="${onclick(copyButton)}"
            >${buttonText}</button>
        </div>
    `;

    if (shouldReturnDomEl) {
        const div = document.createElement('div');
        div.innerHTML = code;
        return div.children[0];  
    }

    return code;
};