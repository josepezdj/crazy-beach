import { LitElement, html } from 'lit';
import styles from './header.scss';
import { playerService } from '../../services/player-service';
import logo from '../../assets/icons/favicon-72x72.png';
import iconArrowLeft from '../../assets/icons/icon-arrow-left.png';
import iconInstructions from '../../assets/icons/icon-instructions.png';
import iconInfo from '../../assets/icons/icon-info.png';
import iconMedal from '../../assets/icons/icon-medal.png';
import iconUser from '../../assets/icons/icon-user.png';
import { CRAZY_BEACH } from '../../data/constants';

export class Header extends LitElement {
    static get properties() {
        return {
            currentPlayer: { type: Object, reflect: true },
            goBackUrl: { type: String },
        };
    }

    constructor() {
        super();
        this.currentPlayer = playerService.getCurrentPlayer();
        this.goBackUrl = '/';
    }

    render() {
        return html`
            <div class="header">
                <nav class="header__nav">
                    <a class="header__goback" href="${this.goBackUrl}">
                        <img src="${iconArrowLeft}" alt"icono de una sombrilla
                        de playa">
                    </a>

                    <div class="header__icon-app">
                        <div class="header__icon-text">
                            <span>${CRAZY_BEACH.MAIN_APP.TITLE1}</span>
                        </div>
                        <img src="${logo}" alt"icono de una sombrilla de playa">
                        <div class="header__icon-text">
                            <span>${CRAZY_BEACH.MAIN_APP.TITLE2}</span>
                        </div>
                    </div>

                    <div class="header__list">
                        <div class="header__item">
                            <div class="header__account">
                                <span class="header__account--name"
                                    >${this.currentPlayer?.name}</span
                                >
                                <div class="header__account--icon">
                                    <input
                                        type="checkbox"
                                        class="header__menu--input"
                                        id="header__menu--input"
                                        @input="${this.onMenuClick}"
                                    />
                                    <label
                                        for="header__menu--input"
                                        class="header__menu--label"
                                    >
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="header__menu--off-canvas">
                        <ul class="header__menu--off-canvas__list">
                            <li class="header__menu--off-canvas__item">
                                <a
                                    class="header__menu--off-canvas__link"
                                    href="/instrucciones"
                                >
                                    <img src="${iconInstructions}" alt"icono de
                                    un documento">
                                    ${CRAZY_BEACH.MAIN_APP.INSTRUCTIONS}
                                </a>
                            </li>
                            <li class="header__menu--off-canvas__item">
                                <a
                                    class="header__menu--off-canvas__link"
                                    href="/ranking"
                                >
                                    <img src="${iconMedal}" alt"icono de una
                                    medalla">
                                    ${CRAZY_BEACH.MAIN_APP.RANKING.TITLE}
                                </a>
                            </li>
                            <li class="header__menu--off-canvas__item">
                                <a
                                    class="header__menu--off-canvas__link"
                                    href="/cuenta"
                                >
                                    <img src="${iconUser}" alt"icono de una
                                    persona"> ${CRAZY_BEACH.MAIN_APP.ACCOUNT}
                                </a>
                            </li>
                            <hr />
                            <li class="header__menu--off-canvas__item">
                                <a
                                    class="header__menu--off-canvas__link"
                                    href="acerca"
                                >
                                    <img src="${iconInfo}" alt"icono de un
                                    símbolo de interrogación">
                                    ${CRAZY_BEACH.MAIN_APP.ABOUT}
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        `;
    }

    onMenuClick(e) {
        const value = e.target.checked;
        const target = this.shadowRoot.querySelector(
            '.header__menu--off-canvas'
        );
        const hr = target.querySelector('hr');
        const menuList = target.querySelector(
            '.header__menu--off-canvas__list'
        );
        if (value) {
            target.style.height = '200px';
            // target.style.padding = '16px 0';
            menuList.style.fontSize = '12px';
            hr.style.opacity = '1';
        } else {
            target.style.height = '0';
            // target.style.padding = '0';
            menuList.style.fontSize = '0';
            hr.style.opacity = '0';
        }
    }

    static get styles() {
        return styles;
    }
}

customElements.define('crazy-beach-header-component', Header);
