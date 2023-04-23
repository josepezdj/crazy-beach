import { LitElement, html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import styles from './feet.scss';
import './import';

class Feet extends LitElement {
	static get properties() {
		return {
			side: { type: String },
			isDisabled: { type: Boolean },
		};
	}

	constructor() {
		super();
		this.side = 'left';
	}

	render() {
		return html`
            <section class="feet">
                <div class="feet__container">
                    <crazy-beach-foot-component
                        side="left"
                        ?isDisabled="${ifDefined(this.isDisabled)}"
                        @cb-foot-click="${this.onFootClick}"
                    ></crazy-beach-foot-component>
                    <crazy-beach-foot-component
                        side="right"
                        ?isDisabled="${ifDefined(this.isDisabled)}"
                        @cb-foot-click="${this.onFootClick}"
                    ></crazy-beach-foot-component>
                </div>
            </section>
        `;
	}

	onFootClick(e) {
		const side = e.detail;
		this.dispatchEvent(
			new CustomEvent('cb-feet-click', {
				detail: side,
			})
		);
	}

	static get styles() {
		return styles;
	}
}

customElements.define('crazy-beach-feet-component', Feet);
