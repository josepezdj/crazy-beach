import { LitElement, html } from 'lit';
import styles from './ranking.scss';
import { playerService } from '../../services/player-service';
import { CRAZY_BEACH } from '../../data/constants';

import iconArrowDown from '../../../assets/icons/icon-arrow-down.png';
import iconArrowUp from '../../../assets/icons/icon-arrow-up.png';
import iconTrophy from '../../../assets/icons/icon-trophy.png';

export class Ranking extends LitElement {
    static get properties() {
        return {
            currentPlayer: { type: Object },
            players: { type: Array },
            currentPoints: { type: Number },
            currentMaxPoints: { type: Number },
            isRankingCollapsed: { type: Boolean, reflect: true },
        };
    }

    constructor() {
        super();
        this.currentPlayer = playerService.getCurrentPlayer();
        this.players = playerService.getAllPlayers();
        this.currentPoints = 0;
        this.currentMaxPoints = 0;
    }

    firstUpdated() {
        this.currentPlayer = playerService.getCurrentPlayer();
        this.players = playerService.getAllPlayers();
        this.isRankingCollapsed = false;
    }

    render() {
        return html`
            <section
                class="ranking ${this.isRankingCollapsed
                    ? 'ranking-hide'
                    : 'ranking-show'}"
            >
                <div class="ranking__header">
                    <a
                        href="#"
                        class="ranking__header--link"
                        id="ranking__header--link"
                        @click="${this.onRankingClick}"
                    >
                        <h3 class="ranking__title">
                            ${CRAZY_BEACH.MAIN_APP.RANKING.TITLE}
                        </h3>
                    </a>
                    <img
                        src="${this.isRankingCollapsed
                            ? iconArrowDown
                            : iconArrowUp}"
                        alt="icono de flecha hacia
                        abajo"
                        class="ranking__arrow
                        ranking__arrow--${this.isRankingCollapsed
                            ? 'down'
                            : 'up'}"
                    />
                </div>
                <ul class="ranking__stats">
                    <li class="ranking__stats--item">
                        <img
                            src="${iconTrophy}"
                            alt="icono de un trofeo"
                            class="ranking__stats--icon"
                        />
                    </li>
                    <li class="ranking__stats--item">
                        ${CRAZY_BEACH.MAIN_APP.RANKING.COL_NAME}
                    </li>
                    <li class="ranking__stats--item">
                        ${CRAZY_BEACH.MAIN_APP.RANKING.COL_POINTS}
                    </li>
                    <li class="ranking__stats--item">
                        ${CRAZY_BEACH.MAIN_APP.RANKING.COL_MAX_POINTS}
                    </li>
                </ul>
                <div class="ranking__data">${this.renderPlayers()}</div>
            </section>
        `;
    }

    renderPlayers() {
        this.players = playerService.getAllPlayers();
        if (this.players !== -1)
            return html` ${this.players.map((player, i) => {
                return html`
                    <ul class="ranking__players">
                        <li class="ranking__players--player">${i + 1}</li>
                        <li class="ranking__players--player">${player.name}</li>
                        <li class="ranking__players--player">
                            ${player.currentPoints}
                        </li>
                        <li class="ranking__players--player">
                            ${player.maxPoints}
                        </li>
                    </ul>
                `;
            })}`;
    }

    onRankingClick(e) {
        e.stopPropagation();
        if (e.currentTarget.id === 'ranking__header--link') {
            this.isRankingCollapsed = this.isRankingCollapsed ? false : true;
            this.dispatchEvent(
                new CustomEvent('cb-ranking-click', {
                    detail: this.isRankingCollapsed,
                })
            );
        }
    }

    static get styles() {
        return styles;
    }
}

customElements.define('crazy-beach-ranking-component', Ranking);
