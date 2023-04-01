import { LitElement, html } from 'lit';
import styles from './crazy-beach-home-page.scss';
import 'fa-icons';
import { localstorageService } from '../../services/localstorage-service';
import { playerService } from '../../services/player-service';
import { Router } from '@vaadin/router';
import { CRAZY_BEACH } from '../../data/constants';
import './import';

class HomePage extends LitElement {
    static get properties() {
        return {
            messages: { type: Array },
            name: { type: String },
            currentPlayer: { type: Object },
            players: { type: Array },
            isInvalid: { type: Boolean },
        };
    }

    constructor() {
        super();
        this.messages = [];
        this.isInvalid = true;
    }

    firstUpdated() {
        if (localstorageService.getStateFromLocalStorage() === -1) {
            this.currentPlayer = '';
            this.players = [];
            this.name = '';
        } else {
            this.currentPlayer = playerService.getCurrentPlayer();
            this.players = playerService.getAllPlayers();
            this.name = this.currentPlayer.name;
        }
    }

    render() {
        return html`
            <section class="homepage">
                <div class="homepage__logo">
                    <fa-icon class="fas fa-umbrella-beach" size="5em"></fa-icon>
                    <div class="homepage__logo--text">
                        <span>${CRAZY_BEACH.MAIN_APP.TITLE1}</span>
                        <span>${CRAZY_BEACH.MAIN_APP.TITLE2}</span>
                    </div>
                </div>
                <div class="login">
                    <h2 class="login__title">${CRAZY_BEACH.LOGIN.TITLE}</h2>
                    <div class="login__input">
                        <crazy-beach-input-widget
                            id="cb-login-input"
                            type="text"
                            legend="${CRAZY_BEACH.LOGIN.INPUT_LEGEND}"
                            maxLength="${CRAZY_BEACH.LOGIN.INPUT_MAX_LENGTH}"
                            ?isInvalid="${this.isInvalid}"
                            @cb-input-value="${this.onInputValue}"
                            @cb-input-focusout="${this.onInputFocussout}"
                        ></crazy-beach-input-widget>
                        ${this.messages.length > 0
                            ? html`
                                  <div class="login__input--messages">
                                      ${this.messages.map((msg) => {
                                          return html`
                                              <p class="login__input--message">
                                                  ${msg}
                                              </p>
                                          `;
                                      })}
                                  </div>
                              `
                            : null}
                    </div>
                </div>
                <div class="login__button">
                    <crazy-beach-button-widget
                        id="cb-login-button"
                        label="${CRAZY_BEACH.LOGIN.ENTER_BTN_TEXT}"
                        fullWidth
                        ?isInvalid="${this.isInvalid}"
                        @cb-button-click="${this.onButtonClick}"
                    ></crazy-beach-button-widget>
                </div>
            </section>
        `;
    }

    onInputValue(e) {
        const value = e.detail;
        const regExp = /^[A-Za-z0-9]*$/;
        const checkCharacters = regExp.test(value);
        if (checkCharacters) {
            this.messages = this.messages.filter(
                (msg) =>
                    msg !== CRAZY_BEACH.LOGIN.ERR_MESSAGES.INVALID_CHARACTERS
            );

            if (value.length < CRAZY_BEACH.LOGIN.INPUT_MIN_LENGTH) {
                this.isInvalid = true;
                const msgAlreadyDisplaying = this.messages.find(
                    (msg) =>
                        msg === CRAZY_BEACH.LOGIN.ERR_MESSAGES.TOO_SHORT_NAME
                );
                if (!msgAlreadyDisplaying)
                    this.messages = [
                        ...this.messages,
                        CRAZY_BEACH.LOGIN.ERR_MESSAGES.TOO_SHORT_NAME,
                    ];
            } else {
                this.isInvalid = false;
                this.messages = this.messages.filter(
                    (msg) =>
                        msg !== CRAZY_BEACH.LOGIN.ERR_MESSAGES.TOO_SHORT_NAME
                );
                this.name = value;
            }
        } else {
            this.isInvalid = true;
            const msgAlreadyDisplaying = this.messages.find(
                (msg) =>
                    msg === CRAZY_BEACH.LOGIN.ERR_MESSAGES.INVALID_CHARACTERS
            );
            if (!msgAlreadyDisplaying) {
                this.messages = [
                    ...this.messages,
                    CRAZY_BEACH.LOGIN.ERR_MESSAGES.INVALID_CHARACTERS,
                ];
            }
        }
        this.validate();
    }

    onInputFocussout() {}

    validate() {
        const input = this.shadowRoot.querySelectorAll('#cb-login-input')[0];
        const button = this.shadowRoot.querySelectorAll('#cb-login-button')[0];
        if (this.isInvalid) {
            input.setAttribute('isInvalid', true);
            button.setAttribute('isInvalid', true);
        } else {
            input.removeAttribute('isInvalid');
            button.removeAttribute('isInvalid');
        }
    }

    onButtonClick() {
        const state = localstorageService.getStateFromLocalStorage();
        if (state !== -1) {
            const foundPlayer = localstorageService.findPlayerInStatePlayers(
                this.name
            );
            if (foundPlayer !== -1) playerService.setCurrentPlayer(foundPlayer);
            else {
                const player = playerService.createNewPlayer(this.name);
                state.currentPlayer = player;
                state.players.push(player);
                localstorageService.saveStateToLocalStorage(state);
            }
        } else {
            const newPlayer = playerService.createNewPlayer(this.name);
            const newState = localstorageService.createNewEmptyState();
            newState.currentPlayer = newPlayer;
            newState.players.push(newPlayer);
            localstorageService.saveStateToLocalStorage(newState);
        }
        Router.go('/juego');
    }

    static get styles() {
        return [styles];
    }
}

customElements.define('crazy-beach-home-page', HomePage);
