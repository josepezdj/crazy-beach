import { LitElement, html } from 'lit';
import styles from './boat.scss';
import boat from '../../../assets/images/boat.png';
import waves from '../../../assets/images/waves.png';

class Boat extends LitElement {
	static get properties() {
		return {
			color: { type: String },
			isMoving: { type: Boolean },
			isRankingCollapsed: { type: Boolean },
		};
	}

	constructor() {
		super();
		this.color = 'red';
		this.isMoving = false;
		this.isRankingCollapsed = false;
	}

	render() {
		return html`
            <div
                class="boat ranking-${this.isRankingCollapsed
		? 'hide'
		: 'show'}"
                id="boat"
            >
                <div class="boat__image-container">
                    <figure
                        class="boat__figure boat__figure--${this.color} ${this
	.isMoving
	? 'boat-move'
	: ''}"
                    >
                        <img
                            class="boat__figure--img"
                            src="${boat}"
                            alt="dibujo de un barquito velero"
                        />
                        <span
                            class="boat__flag boat__flag--${this.color}"
                            alt=""
                        ></span>
                    </figure>
                    <img
                        class="boat__bg ${this.isMoving ? 'waves-move' : ''}"
                        src="${waves}"
                        alt="dubujo de unas olas"
                    />
                </div>
            </div>
        `;
	}

	static get styles() {
		return styles;
	}
}

customElements.define('crazy-beach-boat-component', Boat);
