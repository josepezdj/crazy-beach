import { LitElement, html } from 'lit';
import styles from './cb-about-page.scss';
import { playerService } from '../../services/player-service';
import { CRAZY_BEACH } from '../../data/constants';
import beach from '../../assets/images/beach-bg-small.jpg';
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
                <img src="${beach}" class="about-page__bg" />
                <crazy-beach-header-component
                    currentPlayer="${JSON.stringify(this.currentPlayer)}"
                    goBackUrl="${this.goBackUrl}"
                ></crazy-beach-header-component>
                <article class="about-page__content">
                    <div class="about-page__title--container">
                        <h1 class="about-page__title">
                            ${CRAZY_BEACH.MAIN_APP.ABOUT}
                        </h1>
                    </div>
                    <ul class="about-page__list">
                        <li class="about-page__item">
                            <p>${CRAZY_BEACH.ABOUT.VERSION}</p>
                            <p class="about-page__version">
                                ${packageJson.version}
                            </p>
                        </li>
                        <li class="about-page__item">
                            <p>${CRAZY_BEACH.ABOUT.DESCRIPTION}</p>
                            <p class="about-page__description">
                                ${packageJson.description}
                            </p>
                        </li>
                        <li class="about-page__item">
                            <p>${CRAZY_BEACH.ABOUT.AUTHOR}</p>
                            <p class="about-page__author">
                                ${packageJson.author}
                            </p>
                        </li>
                        <li class="about-page__item">
                            <p>${CRAZY_BEACH.ABOUT.LICENSE}</p>
                            <p class="about-page__license">
                                ${packageJson.license}
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

customElements.define('crazy-beach-about-page', AboutPage);
