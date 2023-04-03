import { LitElement, html } from 'lit';
import styles from './beach.scss';
import { getLevelByPoints } from '../../data/levels-api';
import { playerService } from '../../services/player-service';
import './import';

class Beach extends LitElement {
    static get properties() {
        return {
            currentLevel: { type: Object, reflect: true },
            currentPlayer: { type: Object },
            score: { type: Number },
            beachAnimation: { type: Boolean, attribute: 'beach-animation' },
            isRankingCollapsed: { type: Boolean },
        };
    }

    constructor() {
        super();

        this.currentPlayer = playerService.getCurrentPlayer();
        this.currentLevel = getLevelByPoints(this.currentPlayer.maxPoints);
        this.beachAnimation = false;
        this.isRankingCollapsed = false;
        this.score = 0;
    }

    firstUpdated() {
        this.currentPlayer = playerService.getCurrentPlayer();
        if (this.currentPlayer === -1) {
            this.currentLevel = getLevelByPoints(0);
        }
    }

    render() {
        return html`
            <section
                class="beach level-${this.getCurrentLevel().id} ${this
                    .isRankingCollapsed
                    ? 'ranking-hide'
                    : 'ranking-show'}"
            >
                <div class="beach__title--container">
                    <h2 class="beach__title--name">
                        ${this.getCurrentLevel().name}
                    </h2>
                    <p class="beach__title--location">
                        ${this.getCurrentLevel().location}
                    </p>
                    <p class="beach__title--country">
                        ${this.getCurrentLevel().country}
                    </p>
                </div>
            </section>
        `;
    }

    getCurrentLevel() {
        return getLevelByPoints(this.score);
    }

    static get styles() {
        return styles;
    }
}

customElements.define('crazy-beach-beach-component', Beach);
