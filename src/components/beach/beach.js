import { LitElement, html } from 'lit';
import styles from './beach.scss';
import { ifDefined } from 'lit/directives/if-defined.js';
import gradient from '../../assets/images/gradient.png';
import { getLevelByPoints } from '../../data/levels-api';
import { playerService } from '../../services/player-service';
import './import';

class Beach extends LitElement {
    static get properties() {
        return {
            currentLevel: { type: Object, reflect: true },
            currentPlayer: { type: Object },
            flashMessage: { type: String },
            messageType: { type: String },
            color: { type: String },
            score: { type: Number },
            beachAnimation: { type: Boolean, attribute: 'beach-animation' },
            feetDisabled: { type: Boolean },
        };
    }

    constructor() {
        super();
        this.flashMessage = '';
        this.messageType = '';
        this.score = 0;
        this.currentPlayer = playerService.getCurrentPlayer();
        this.currentLevel = getLevelByPoints(this.currentPlayer.maxPoints);
        this.color = 'red';
        this.beachAnimation = false;
    }

    firstUpdated() {
        this.currentPlayer = playerService.getCurrentPlayer();
        if (this.currentPlayer === -1) {
            this.currentLevel = getLevelByPoints(0);
        }

        this.shadowRoot.querySelector('.sand-scroll').style.animationPlayState =
            'paused';
    }

    render() {
        return html`
            <section class="beach level-${this.getCurrentLevel().id}">
                <div class="beach__title--container">
                    <h2 class="beach__title--text">
                        ${this.getCurrentLevel().name}
                    </h2>
                </div>
                <crazy-beach-boat-component
                    color=${this.color}
                    ?isMoving="${this.beachAnimation}"
                >
                </crazy-beach-boat-component>
                <div class="beach__background">
                    <img
                        class="beach__background--gradient"
                        src="${gradient}"
                        alt=""
                    />
                    <div class="beach__background--sand-container">
                        <div class="beach__background--sand sand-scroll"></div>
                    </div>
                </div>
                <crazy-beach-feet-component
                    ?isDisabled="${ifDefined(this.feetDisabled)}"
                    @cb-feet-click="${this.onFeetClick}"
                ></crazy-beach-feet-component>
                ${this.flashMessage !== ''
                    ? html` <div
                          class="beach__flash-message beach__flash-message--${this
                              .messageType}"
                      >
                          <p>${this.flashMessage}</p>
                      </div>`
                    : null}
                <crazy-beach-score-component
                    score="${this.score}"
                ></crazy-beach-score-component>
            </section>
        `;
    }

    getCurrentLevel() {
        return getLevelByPoints(this.score);
    }

    onFeetClick(e) {
        const side = e.detail;
        this.dispatchEvent(
            new CustomEvent('cb-beach-feet-click', {
                detail: side,
            })
        );
    }

    static get styles() {
        return styles;
    }
}

customElements.define('crazy-beach-beach-component', Beach);
