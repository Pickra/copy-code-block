import { getDisplayString, getClipboardString } from './helpers';
import styles from './styles';

export default (string, opts) => {
    const { container, displayCode, copyButton } = styles(opts);

    return `
        <div class='${container}'>
            <span class='${displayCode}'>
                ${getDisplayString(string)}
            </span>
            <button
                type='button'
                class='${copyButton}'
                onclick="(function() {
                    var el = document.createElement('textarea');
                    el.innerHTML = '${getClipboardString(string)}';
                    document.body.appendChild(el);
                    el.select();
                    document.execCommand('copy');
                    document.body.removeChild(el);
                })();"
            >Copy</button>
        </div>
    `;
};