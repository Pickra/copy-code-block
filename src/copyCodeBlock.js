import { getDisplayString, getClipboardString } from './utils';
import styles from './styles';

export const copyCodeBlock = (string, opts = {}) => {
    const lang = opts && opts.lang || '';
    const { container, displayCode, copyButton } = styles(opts);
    const buttonText = 'Click to copy';

    return `
        <section class='${container}' aria-label='${lang} code block' tabindex='0'>
            <pre class='${displayCode}'>${getDisplayString(string, opts)}</pre>
            <button
                type='button'
                class='${copyButton}'
                aria-live='polite'
                onclick="(function() {
                    var textarea = document.createElement('textarea');
                    var button = document.querySelector('.${copyButton}');

                    textarea.innerHTML = '${getClipboardString(string)}';
                    document.body.appendChild(textarea);
                    textarea.select();

                    button.innerHTML = 'Copied!';
                    setTimeout(function() { button.innerHTML = '${buttonText}'; }, 1500);

                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                })();"
            >${buttonText}</button>
        </section>
    `;
};
