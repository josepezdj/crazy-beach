import { LitElement, html } from 'lit';
import styles from './cb-about-page.scss';
import 'fa-icons';
import { playerService } from '../../services/player-service';
import { Router } from '@vaadin/router';
import { CRAZY_BEACH } from '../../data/constants';
import packageJson from '../../../package.json';

class AboutPage extends LitElement {
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
            <section class="about-page">
                <crazy-beach-header-component
                    currentPlayer="${JSON.stringify(this.currentPlayer)}"
                    goBackUrl="${this.goBackUrl}"
                ></crazy-beach-header-component>
                <h1 class="about-page__title">${CRAZY_BEACH.MAIN_APP.ABOUT}</h1>
                <article>
                    <h2 class="about-page__subtitle"></h2>
                    <ul>
                        <li>
                            <p>${CRAZY_BEACH.ABOUT.VERSION}</p>
                        </li>

                        <p class="about-page__description">
                            ${packageJson.description}
                        </p>
                        <p class="about-page__author">${packageJson.author}</p>
                        <p class="about-page__license">
                            ${packageJson.license}
                        </p>
                    </ul>
                </article>
            </section>
        `;
    }

    static get styles() {
        return [styles];
    }
}

customElements.define('crazy-beach-about-page', AboutPage);
