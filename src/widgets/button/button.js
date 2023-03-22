import { LitElement, html } from 'lit';
import styles from './button.scss';

export class Button extends LitElement {
    static get properties() {
        return {
            type: { type: String },
            color: { type: String },
            label: { type: String },
            size: { type: String },
            isFullWidth: { type: Boolean, attribute: 'fullwith' },
        };
    }

    constructor() {
        super();
        this.type = 'button';
        this.color = 'blue';
        this.label = 'entrar';
        this.size = 'normal';
        this.isFullWidth = false;
    }

    render() {
        return html`
            <div
                class="btn btn-${this.color} ${this.isFullWidth
                    ? 'w100'
                    : ''} btn-${this.size}"
            >
                <button type="button">${this.label}</button>
            </div>
        `;
    }

    static get styles() {
        return styles;
    }
}

customElements.define('crazy-beach-button-widget', Button);
