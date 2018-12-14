import { getDisplayString, getClipboardString } from './utils';
import styles from './styles';

export default (string, opts = {}) => {
    const { lang = 'HTML', shouldReturnDomEl = false } = opts;
    const { container, displayCode, copyButton } = styles(opts);
    const buttonText = 'Click to copy';

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

    if (shouldReturnDomEl) {
        const section = document.createElement('section');
        section.classList.add(container) ;
        section.setAttribute('aria-label', lang + ' code block');
        section.setAttribute('tabindex', 0);

        const pre = document.createElement('pre');
        pre.classList = displayCode;
        pre.innerHTML = getDisplayString(string, opts);

        const button = document.createElement('button');
        const buttonId = `${copyButton}-${lang}-DOM-element`;
        button.innerHTML = buttonText;
        button.classList = copyButton;
        button.id = buttonId;
        button.type = 'button';
        button.setAttribute('aria-live', 'polite');
        button.setAttribute('onclick', onclick(buttonId));

        section.append(pre, button);
        return section;
    }

    return `
        <section class='${container}' aria-label='${lang} code block' tabindex='0'>
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
};