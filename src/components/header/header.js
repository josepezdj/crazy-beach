import { LitElement, html } from 'lit';
import styles from './header.scss';

export class Header extends LitElement {
    static get styles() {
        return styles;
    }

    render() {
        return html`<h2>Header</h2>`;
    }
}

customElements.define('crazy-beach-header-component', Header);
