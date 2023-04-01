import { LitElement, html } from 'lit';
import styles from './ranking.scss';
import { playerService } from '../../services/player-service';
import 'fa-icons';
import { CRAZY_BEACH } from '../../data/constants';

export class Ranking extends LitElement {
    static get properties() {
        return {
            currentPlayer: { type: Object },
            players: { type: Array },
            currentPoints: { type: Number },
            currentMaxPoints: { type: Number },
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
    }

    render() {
        return html`
            <section class="ranking">
                <h3 class="ranking__title">
                    ${CRAZY_BEACH.MAIN_APP.RANKING.TITLE}
                </h3>
                <ul class="ranking__stats">
                    <li>
                        <fa-icon class="fas fa-trophy" size="1.20em"></fa-icon>
                    </li>
                    <li>${CRAZY_BEACH.MAIN_APP.RANKING.COL_NAME}</li>
                    <li>${CRAZY_BEACH.MAIN_APP.RANKING.COL_POINTS}</li>
                    <li>${CRAZY_BEACH.MAIN_APP.RANKING.COL_MAX_POINTS}</li>
                </ul>
                ${this.renderPlayers()}
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
                            ${player.id === this.currentPlayer.id
                                ? this.currentPoints
                                : player.currentPoints}
                        </li>
                        <li class="ranking__players--player">
                            ${player.id === this.currentPlayer.id
                                ? this.currentMaxPoints
                                : player.maxPoints}
                        </li>
                    </ul>
                `;
            })}`;
    }

    static get styles() {
        return styles;
    }
}

customElements.define('crazy-beach-ranking-component', Ranking);
