import {LitElement, html} from 'lit';
import styles from './my-element.scss';

export class MyElement extends LitElement {
  static get styles() {
    return styles;
  }

  render() {
    return html`<h1>Crazy Beach</h1>`;
  }
}

customElements.define('my-element', MyElement);