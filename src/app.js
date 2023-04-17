import { LitElement, html } from 'lit';
import styles from './app.scss';

export class App extends LitElement {
    render() {
        return html`
            <div class="app">
                <slot></slot>
            </div>
        `;
    }

    static get styles() {
        return [styles];
    }
}

customElements.define('crazy-beach-app', App);
