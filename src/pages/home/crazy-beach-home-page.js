import { LitElement, html } from 'lit';
import styles from './crazy-beach-home-page.scss';
import './import';

export class HomePage extends LitElement {
    static get styles() {
        return styles;
    }

    render() {
        return html`
            <div class="homepage">
                <h1>Crazy Beach</h1>
                <p>HomePage</p>
                <crazy-beach-header-component></crazy-beach-header-component>
                <crazy-beach-login-component></crazy-beach-login-component>
            </div>
        `;
    }
}

customElements.define('crazy-beach-home-page', HomePage);
