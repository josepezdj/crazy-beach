import { LitElement, html } from 'lit';
import styles from './cb-ranking-page.scss';
import 'fa-icons';
import { localstorageService } from '../../services/localstorage-service';
import { playerService } from '../../services/player-service';
import { Router } from '@vaadin/router';
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
        this.goBackUrl = '/juego';
    }

    render() {
        return html`
            <section class="ranking-page">
                <crazy-beach-header-component
                    currentPlayer="${JSON.stringify(this.currentPlayer)}"
                    goBackUrl="${this.goBackUrl}"
                ></crazy-beach-header-component>
                <h1>${CRAZY_BEACH.MAIN_APP.RANKING.TITLE}</h1>
            </section>
        `;
    }

    static get styles() {
        return [styles];
    }
}

customElements.define('crazy-beach-ranking-page', RankingPage);
