import { getDisplayString, getClipboardString } from './helpers';
import styles from './styles';

export default (string, opts = {}) => {
    opts.unique = Math.floor(Math.random() * 0xFFFF).toString(16)
    const { container, displayCode, copyButton } = styles(opts);

    return `
        <div class='${container}'>
            <pre class='${displayCode}'>
                ${getDisplayString(string, opts)}
            </pre>
            <button
                type='button'
                class='${copyButton}'
                onclick="(function() {
                    var textarea = document.createElement('textarea');
                    var button = document.querySelector('.${copyButton}');

                    textarea.innerHTML = '${getClipboardString(string)}';
                    document.body.appendChild(textarea);
                    textarea.select();

                    button.innerHTML = 'Copied!';
                    setTimeout(function() { button.innerHTML = 'Copy'; }, 1000);

                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                })();"
            >Copy</button>
        </div>
    `;
};