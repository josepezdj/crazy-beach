import {LitElement, html} from 'lit';
import styles from './login.scss';
import './import';

export class Login extends LitElement {
  static get styles() {
    return styles;
  }

  render() {
    return html`
        <h2>Login</h2>
        <crazy-beach-button-widget
            label="Jugar"
        ></crazy-beach-button-widget>
    `;
  }
}

customElements.define('crazy-beach-login-component', Login);