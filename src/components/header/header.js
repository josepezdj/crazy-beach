import { LitElement, html } from 'lit';
import styles from './header.scss';
import { playerService } from '../../services/player-service';
import 'fa-icons';
import { CRAZY_BEACH } from '../../data/constants';

export class Header extends LitElement {
    static get properties() {
        return {
            currentPlayer: { type: Object, reflect: true },
        };
    }

    constructor() {
        super();
        this.currentPlayer = playerService.getCurrentPlayer();
    }

    render() {
        return html`
            <div class="header">
                <nav class="header__nav">
                    <a class="header__goback" href="/">
                        <fa-icon
                            class="fas fa-arrow-left"
                            size="1.2em"
                        ></fa-icon>
                    </a>
                    <div class="header__icon-app">
                        <div class="header__icon-text">
                            <span>${CRAZY_BEACH.MAIN_APP.TITLE1}</span>
                        </div>
                        <fa-icon
                            class="fas fa-umbrella-beach"
                            size="2em"
                        ></fa-icon>
                        <div class="header__icon-text">
                            <span>${CRAZY_BEACH.MAIN_APP.TITLE2}</span>
                        </div>
                    </div>
                    <ul class="header__list">
                        <!-- <li class="header__item">
                            <a class="header__link" href="#">
                                <fa-icon class="fas fa-scroll header__account--link" size="1.5em"></fa-icon>
                            </a>
                        </li>
                        <li class="header__item">
                            <a class="header__link" href="#">
                                <fa-icon class="fas fa-medal header__account--link" size="1.5em"></fa-icon>
                            </a>
                        </li> -->
                        <li class="header__item">
                            <div class="header__account">
                                <span class="header__account--name"
                                    >${this.currentPlayer?.name}</span
                                >
                                <a href="#">
                                    <fa-icon
                                        class="fas fa-bars header__account--icon"
                                    ></fa-icon>
                                </a>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        `;
    }

    static get styles() {
        return styles;
    }
}

customElements.define('crazy-beach-header-component', Header);
