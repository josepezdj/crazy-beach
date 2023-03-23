import { LitElement, html } from 'lit';
import { Router } from '@vaadin/router';
import styles from './login.scss';
import './import';

export class Login extends LitElement {
    static get properties() {
        return {
            name: { type: String },
        };
    }

    constructor() {
        super();
        this.user = {
            name: 'Jose',
            points: 0,
        };
    }

    firstUpdated() {
        this.addEventListener('button-click', event => {
            window.sessionStorage.setItem('user', JSON.stringify(this.user));
            Router.go(`/juego`);
          });
    }

    render() {
        return html`
            <h2>Login</h2>
            <crazy-beach-button-widget
                label="Jugar"
            ></crazy-beach-button-widget>
            <crazy-beach-input-widget
                type="text"
            ></crazy-beach-input-widget>
        `;
    }

    static get styles() {
        return styles;
    }
}

customElements.define('crazy-beach-login-component', Login);
