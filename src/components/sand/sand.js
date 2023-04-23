import { LitElement, html } from 'lit';
import styles from './sand.scss';
import gradient from '../../../assets/images/gradient.png';
import './import';

export class Sand extends LitElement {
	static get properties() {
		return {
			color: { type: String, reflect: true },
			beachAnimation: { type: Boolean, reflect: true },
			isRankingCollapsed: { type: Boolean },
		};
	}

	constructor() {
		super();
		this.color = 'red';
		this.beachAnimation = false;
		this.isRankingCollapsed = false;
	}

	firstUpdated() {
		this.shadowRoot.querySelector('.sand-scroll').style.animationPlayState =
            'paused';
	}

	render() {
		return html`
            <div
                class="beach__background ranking-${this.isRankingCollapsed
		? 'hide'
		: 'show'}"
            >
                <crazy-beach-boat-component
                    color=${this.color}
                    ?isMoving="${this.beachAnimation}"
                    ?isRankingCollapsed="${this.isRankingCollapsed}"
                >
                </crazy-beach-boat-component>
                <img
                    class="beach__background--gradient"
                    src="${gradient}"
                    alt=""
                />
                <div class="beach__background--sand-container">
                    <div class="beach__background--sand sand-scroll"></div>
                </div>
            </div>
        `;
	}

	static get styles() {
		return styles;
	}
}

customElements.define('crazy-beach-sand-component', Sand);
