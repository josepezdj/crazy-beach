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
        };
    }

    constructor() {
        super();
    }

    firstUpdated() {
        this.currentPlayer = playerService.getCurrentPlayer();
        this.players = playerService.getAllPlayers();
    }

    render() {
        return html`
            <section class="ranking">
                <h3 class="ranking__title">${CRAZY_BEACH.MAIN_APP.RANKING}</h3>
                <ul class="ranking__stats">
                    <li><fa-icon class="fas fa-trophy" size="1.20em"></fa-icon></li>
                    <li>Nombre</li>
                    <li>Max. Puntos</li>
                </ul>
                    ${this.players?.map((player, i) => {
                        return html`
                            <ul class="ranking__players">
                                <li class="ranking__players--player">${i + 1}</li>
                                <li class="ranking__players--player">${player.name}</li>
                                <li class="ranking__players--player">${player.maxPoints}</li>
                            </ul>
                        `
                    })}
            </section>
        `;
    }

    static get styles() {
        return styles;
    }
}

customElements.define('crazy-beach-ranking-component', Ranking);