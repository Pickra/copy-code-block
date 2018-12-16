import { getDisplayString, getClipboardString } from './utils';
import styles from './styles';

export default (string, opts = {}) => {
    const { lang, shouldReturnDomEl = false } = opts;
    const { container, displayCode, copyButton } = styles(opts);
    const buttonText = 'Click to copy';
    const label = lang ? `${lang} code block` : 'code block';

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
        <section class='${container}' aria-label='${label}' tabindex='0'>
            <pre class='${displayCode}'>${getDisplayString(string, opts)}</pre>
            <button
                type='button'
                class='${copyButton}'
                id='${copyButton}'
                aria-live='polite'
                onclick="${onclick(copyButton)}"
            >${buttonText}</button>
        </section>
    `;

    if (shouldReturnDomEl) {
        const div = document.createElement('div');
        div.innerHTML = code;
        return div.children[0];  
    }

    return code;
};