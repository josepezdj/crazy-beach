import { LitElement, html } from 'lit';
import styles from './input.scss';
import { CRAZY_BEACH } from '../../data/constants';

export class Input extends LitElement {
    static get properties() {
        return {
            id: { type: String },
            type: { type: String },
            inputValue: { type: String },
            maxLength: { type: String },
            color: { type: String },
            legend: { type: String },
            size: { type: String },
            isFullWidth: { type: Boolean, attribute: 'fullwidth' },
            isInvalid: { type: Boolean },
        };
    }

    constructor() {
        super();
        this.id = 'cb-input'
        this.type = 'text';
        this.placeholder = '';
        this.isFullWidth = false;
        this.isInvalid = false;
    }

    firstUpdated() {
        // Input config
        this.inputElement = this.shadowRoot.getElementById(`${this.id}`);
        this.inputElement.setAttribute('type', this.type);
        if (this.maxLength) this.inputElement.setAttribute('maxLength', this.maxLength);
    }

    render() {
        return html`
            <div
                class="input"
            >
                <fieldset class="input-fieldset${this.isInvalid ? '--invalid' : ''}">
                    <legend class="input-fieldset__legend" align="left">${this.legend}*</legend>
                    <input
                        class="input-input"
                        id="${this.id}"
                        data-test-id="input"
                        name="input"
                        value="${this.inputValue}"
                        @input="${this.onInputValue}"
                        @keypress="${this.onInputValue}"
                        @focusout="${this.onInputFocusout}"
                        autocomplete="off"
                    />
                </fieldset>
            </div>
        `;
    }

    onInputValue(e) {
        if (e.keyCode == 13) e.preventDefault();
        console.log(e.data);
        const value = e.target.value;
        if (value !== undefined && value !== null) {
            this.inputValue = value;
            this.dispatchEvent(new CustomEvent('cb-input-value', {
                detail: e.target.value,
            }));
        }
    }

    onInputFocusout(e) {
        const value = e.target.value;
        if (value !== undefined && value !== null) {
            this.inputValue = value;
            this.dispatchEvent(new CustomEvent('cb-input-focusout', {
                detail: e.target.value,
            }));
        }
    }

    static get styles() {
        return [styles];
    }
}

customElements.define('crazy-beach-input-widget', Input);
