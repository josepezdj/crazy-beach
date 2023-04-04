import { LitElement, html } from 'lit';
import styles from './cb-account-page.scss';
import 'fa-icons';
import { playerService } from '../../services/player-service';
import beach from '../../assets/images/beach-bg-small.jpg';
import player from '../../assets/images/player.png';
import { CRAZY_BEACH } from '../../data/constants';

class AccountPage extends LitElement {
    static get properties() {
        return {
            currentPlayer: { type: Object },
        };
    }

    constructor() {
        super();
        this.currentPlayer = playerService.getCurrentPlayer();
        this.goBackUrl = '/juego';
    }

    render() {
        return html`
            <section class="account-page">
                <img src="${beach}" class="account-page__bg" />
                <img src="${player}" class="account-page__bg--player" />
                <crazy-beach-header-component
                    currentPlayer="${JSON.stringify(this.currentPlayer)}"
                    goBackUrl="${this.goBackUrl}"
                ></crazy-beach-header-component>
                <article class="account-page__content">
                    <div class="account-page__title--container">
                        <h1 class="account-page__title">
                            ${this.currentPlayer.name}
                        </h1>
                    </div>
                    <ul class="account-page__list">
                        <li class="account-page__item">
                            <p>
                                ${CRAZY_BEACH.MAIN_APP.RANKING.COL_MAX_POINTS}
                            </p>
                            <p class="account-page__author">
                                ${this.currentPlayer.maxPoints}
                            </p>
                        </li>
                        <li class="account-page__item">
                            <p>${CRAZY_BEACH.MAIN_APP.RANKING.COL_POINTS}</p>
                            <p class="account-page__description">
                                ${this.currentPlayer.currentPoints}
                            </p>
                        </li>
                    </ul>
                </article>
            </section>
        `;
    }

    static get styles() {
        return [styles];
    }
}

customElements.define('crazy-beach-account-page', AccountPage);
