import { LitElement, html } from 'lit';
import styles from './button.scss';

export class Button extends LitElement {
    static get properties() {
        return {
            id: { type: String },
            type: { type: String },
            color: { type: String },
            label: { type: String },
            size: { type: String },
            isFullWidth: { type: Boolean, attribute: 'fullwidth' },
            isInvalid: { type: Boolean },
        };
    }

    constructor() {
        super();
        this.id = 'cb-button';
        this.type = 'button';
        this.color = 'blue';
        this.label = 'entrar';
        this.size = 'normal';
        this.isFullWidth = false;
        this.isInvalid = false;
    }

    render() {
        return html`
            <div
                class="btn btn-${this.color} ${this.isFullWidth
                    ? 'btn--w100'
                    : ''} btn-${this.size} ${this.isInvalid ? 'invalid' : ''}"
            >
                <button id="${this.id}" ?disabled="${this.isInvalid}" @click="${this._handleClick}" type="button">${this.label}</button>
            </div>
        `;
    }

    _handleClick() {
        this.dispatchEvent(
          new CustomEvent('cb-button-click')
        );
      }

    static get styles() {
        return styles;
    }
}

customElements.define('crazy-beach-button-widget', Button);
