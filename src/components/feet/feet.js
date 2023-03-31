import { LitElement, html } from 'lit';
import styles from './feet.scss';
import { CRAZY_BEACH } from '../../data/constants';
import logo from '../../assets/images/feet.png';
import './import';

class Feet extends LitElement {
    static get properties() {
        return {
            side: { type: String },
        };
    }

    constructor() {
        super();
        this.side = 'left';
    }

    firstUpdated() {
    }

    render() {
        return html`
            <section class="feet">
                <div class="feet__container">
                    <crazy-beach-foot-component side="left" @cb-foot-click="${this.onFootClick}"></crazy-beach-foot-component>
                    <crazy-beach-foot-component side="right" @cb-foot-click="${this.onFootClick}"></crazy-beach-foot-component>
                </div>
            </section>
        `;
    }

    onFootClick(e) {
        this.dispatchEvent(
            new CustomEvent('cb-feet-click', {
                detail: e.detail,
            })
          );
    }

    static get styles() {
        return styles;
    }
}

customElements.define('crazy-beach-feet-component', Feet);
