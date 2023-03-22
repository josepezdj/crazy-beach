import { LitElement, html } from 'lit';
import styles from './input.scss';

export class Input extends LitElement {
    static get properties() {
        return {
            id: { type: String },
            type: { type: String },
            inputValue: { type: String },
            color: { type: String },
            label: { type: String },
            size: { type: String },
            isFullWidth: { type: Boolean, attribute: 'fullwith' },
        };
    }

    constructor() {
        super();
        this.id = 'input'
        this.type = 'text';
        this.placeholder = '';
        this.isFullWidth = false;
    }

    firstUpdated() {
        this.inputElement = this.shadowRoot.querySelector('input[data-id=input]');
        this.inputElement.setAttribute('type', this.type);
        this.inputElement.setAttribute('placeholder', this.placeholder);
    }

    render() {
        return html`
            <div
                class="input"
            >
                <fieldset>
                    <label class="input__label" for="input">${this.label}</label>
                    <input class="input__input" id="${this.id}" data-id="input" name="input" />
                </fieldset>
            </div>
        `;
    }

    static get styles() {
        return styles;
    }
}

customElements.define('crazy-beach-input-widget', Input);
