import { LitElement, html } from 'lit';
import styles from './cb-ranking-page.scss';
import 'fa-icons';
import { playerService } from '../../services/player-service';
import ranking from '../../assets/images/ranking-bg.jpg';
import { CRAZY_BEACH } from '../../data/constants';

class RankingPage extends LitElement {
    static get properties() {
        return {
            currentPlayer: { type: Object },
            players: { type: Array },
        };
    }

    constructor() {
        super();
        this.currentPlayer = playerService.getCurrentPlayer();
        this.players = playerService.getAllPlayers();
        this.goBackUrl = '/juego';
    }

    render() {
        return html`
            <section class="ranking-page">
                <img src="${ranking}" class="ranking-page__bg" />
                <crazy-beach-header-component
                    currentPlayer="${JSON.stringify(this.currentPlayer)}"
                    goBackUrl="${this.goBackUrl}"
                ></crazy-beach-header-component>
                <article class="ranking-page__content">
                    <div class="ranking-page__title--container">
                        <h1 class="ranking-page__title">
                            ${CRAZY_BEACH.MAIN_APP.RANKING.TITLE}
                        </h1>
                    </div>
                    <ul class="ranking-page__stats">
                        <li>
                            <fa-icon
                                class="fas fa-trophy"
                                size="1.20em"
                            ></fa-icon>
                        </li>
                        <li>${CRAZY_BEACH.MAIN_APP.RANKING.COL_NAME}</li>
                        <li>${CRAZY_BEACH.MAIN_APP.RANKING.COL_POINTS}</li>
                        <li>${CRAZY_BEACH.MAIN_APP.RANKING.COL_MAX_POINTS}</li>
                    </ul>
                    <div class="ranking-page__data">
                        ${this.renderPlayers()}
                    </div>
                </article>
            </section>
        `;
    }

    renderPlayers() {
        this.players = playerService.getAllPlayers();
        if (this.players !== -1)
            return html` ${this.players.map((player, i) => {
                return html`
                    <ul class="ranking-page__players">
                        <li class="ranking-page__players--player">${i + 1}</li>
                        <li class="ranking-page__players--player">
                            ${player.name}
                        </li>
                        <li class="ranking-page__players--player">
                            ${player.currentPoints}
                        </li>
                        <li class="ranking-page__players--player">
                            ${player.maxPoints}
                        </li>
                    </ul>
                `;
            })}`;
    }

    static get styles() {
        return [styles];
    }
}

customElements.define('crazy-beach-ranking-page', RankingPage);
