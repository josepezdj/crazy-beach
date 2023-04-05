import { LitElement, html } from 'lit';
import styles from './crazy-beach-game-page.scss';
import { ifDefined } from 'lit/directives/if-defined.js';
import { getLevelByPoints } from '../../data/levels-api';
import { playerService } from '../../services/player-service';
import { CRAZY_BEACH } from '../../data/constants';
import './import';

export class GamePage extends LitElement {
    static get properties() {
        return {
            currentPlayer: { type: Object },
            currentPoints: { type: Number },
            currentMaxPoints: { type: Number },
            players: { type: Array },
            currentLevel: { type: Object },
            color: { type: String },
            score: { type: Number },
            counter: { type: Function },
            flashMessage: { type: String },
            messageType: { type: String },
            buttonLabel: { type: String },
            isLeftPressed: { type: Boolean },
            isRightPressed: { type: Boolean },
            isGameOn: { type: Boolean },
            isStartButtonDisabled: { type: Boolean },
            beachAnimation: { type: Boolean },
            feetDisabled: { type: Boolean },
            isRankingCollapsed: { type: Boolean },
            scoreColor: { type: String },
        };
    }

    constructor() {
        super();
        this.currentPlayer = playerService.getCurrentPlayer();
        this.currentPoints = this.currentPlayer.currentPoints;
        this.currentMaxPoints = this.currentPlayer.maxPoints;
        this.players = playerService.getAllPlayers();
        this.currentLevel = getLevelByPoints(this.currentMaxPoints);
        this.color = 'red';
        this.scoreColor = 'green';
        this.flashMessage = '';
        this.messageType = '';
        // MessageType Values:
        // levelup / gameover / ranking3 / ranking2 / ranking1 / countdown
        this.isLeftPressed = false;
        this.isRightPressed = false;
        this.isGameOn = false;
        this.isStartButtonDisabled = false;
        this.beachAnimation = false;
        this.feetDisabled = true;
        this.isRankingCollapsed = false;
    }

    firstUpdated() {
        this.buttonLabel =
            this.currentPoints > 0
                ? CRAZY_BEACH.GAME.BTN_START.RESTART
                : CRAZY_BEACH.GAME.BTN_START.START;
    }

    onRankingClick(e) {
        this.isRankingCollapsed = e.detail;
    }

    render() {
        return html`
            <section
                class="gamepage ${this.isRankingCollapsed
                    ? 'ranking-hide'
                    : 'ranking-show'}"
            >
                <crazy-beach-header-component
                    currentPlayer="${JSON.stringify(this.currentPlayer)}"
                ></crazy-beach-header-component>
                <crazy-beach-ranking-component
                    currentPoints="${this.currentPoints}"
                    currentMaxPoints="${this.currentMaxPoints}"
                    currentPlayer="${JSON.stringify(this.currentPlayer)}"
                    players="${JSON.stringify(this.players)}"
                    ?isRankingCollapsed="${this.isRankingCollapsed}"
                    @cb-ranking-click="${this.onRankingClick}"
                ></crazy-beach-ranking-component>
                <crazy-beach-beach-component
                    score="${this.currentPoints}"
                    ?beach-animation="${this.beachAnimation}"
                    currentLevel="${JSON.stringify(this.currentLevel)}"
                    ?feetDisabled="${this.feetDisabled}"
                    ?isRankingCollapsed="${this.isRankingCollapsed}"
                ></crazy-beach-beach-component>
                <crazy-beach-sand-component
                    color="${this.color}"
                    ?beachAnimation="${this.beachAnimation}"
                    ?isRankingCollapsed="${this.isRankingCollapsed}"
                ></crazy-beach-sand-component>
                <crazy-beach-feet-component
                    ?isDisabled="${ifDefined(this.feetDisabled)}"
                    @cb-feet-click="${this.onFeetClick}"
                ></crazy-beach-feet-component>
                ${this.flashMessage !== ''
                    ? html` <div
                          class="beach__flash-message beach__flash-message--${this
                              .messageType}"
                      >
                          <p>${this.flashMessage}</p>
                      </div>`
                    : null}
                <crazy-beach-score-component
                    score="${this.currentPoints}"
                    color="${this.scoreColor}"
                    ?isRankingCollapsed="${this.isRankingCollpased}"
                ></crazy-beach-score-component>
                <div class="gamepage__button">
                    <crazy-beach-button-widget
                        color="blue"
                        label="${this.buttonLabel}"
                        ?isInvalid="${this.isStartButtonDisabled}"
                        @cb-button-click="${this.onStartButtonClick}"
                    ></crazy-beach-button-widget>
                </div>
            </section>
        `;
    }

    onStartButtonClick() {
        if (!this.isGameOn) {
            this.isGameOn = true;
            this.buttonLabel = CRAZY_BEACH.GAME.BTN_START.STOP;
            this.startGame();
        } else {
            this.isGameOn = false;
            this.buttonLabel =
                this.currentPoints > 0
                    ? CRAZY_BEACH.GAME.BTN_START.RESTART
                    : CRAZY_BEACH.GAME.BTN_START.START;
            this.stopGame();
        }
    }

    startGame() {
        // Count to 3
        this._fireCountdown();
    }

    stopGame() {
        this.color = 'red';
        this.scoreColor = 'green';
        this.feetDisabled = true;
        this.buttonLabel =
            this.currentPoints > 0
                ? CRAZY_BEACH.GAME.BTN_START.RESTART
                : CRAZY_BEACH.GAME.BTN_START.START;
        this._stopCounter();
    }
    onFeetClick(e) {
        const side = e.detail;

        if (this.color === 'red') {
            this.gameOver();
        } else {
            if (side === 'left') {
                if (this.isLeftPressed) {
                    this.subtractPoint();
                } else {
                    this._sandmove();
                    this.addPoint();
                    this.isRightPressed = false;
                    this.isLeftPressed = true;
                }
            } else if (side === 'right') {
                if (this.isRightPressed) {
                    this.subtractPoint();
                } else {
                    this._sandmove();
                    this.addPoint();
                    this.isLeftPressed = false;
                    this.isRightPressed = true;
                }
            }
        }
    }

    addPoint() {
        this.scoreColor = 'green';
        this.currentPoints = this.currentPoints += 1;
        this.recordCurrentPoints();
        this.recordMaxPoints();
    }

    subtractPoint() {
        this.scoreRedColorEffect();
        this.currentPoints =
            this.currentPoints !== 0 ? (this.currentPoints -= 1) : 0;
        this.recordCurrentPoints();
    }

    scoreRedColorEffect() {
        this.scoreColor = 'red';
        setTimeout(() => {
            this.scoreColor = 'green';
        }, 500);
    }
    recordCurrentPoints() {
        playerService.updateCurrentPlayer('currentPoints', this.currentPoints);
    }

    recordMaxPoints() {
        if (this.currentPoints > this.currentMaxPoints) {
            this.currentMaxPoints = this.currentPoints;
            playerService.updateCurrentPlayer(
                'maxPoints',
                this.currentMaxPoints
            );
        }
    }

    gameOver() {
        // Erase current points
        this.currentPoints = 0;
        // Throw red color effect on score
        this.scoreRedColorEffect();
        // Set current player points to zero
        playerService.updateCurrentPlayer('currentPoints', this.currentPoints);
        // Game over flash-message
        this._setMessage(CRAZY_BEACH.GAME.FLASH_MESSAGES.GAME_OVER, 'gameover');
        setTimeout(() => {
            this._setMessage('');
        }, 4000);
        // Change score color to 'alert'

        // Stop counter
        this.stopGame();
    }

    _fireCountdown() {
        this.isStartButtonDisabled = true;
        this._setMessage(
            CRAZY_BEACH.GAME.FLASH_MESSAGES.COUNTDOWN.THREE,
            'countdown'
        );
        const countdownTimer = setTimeout(() => {
            this._setGreenCounter();
            this.isStartButtonDisabled = false;
            this._setMessage('');
            this.beachAnimation = true;
            this.feetDisabled = false;
        }, 3000);
        setTimeout(() => {
            this._setMessage(
                CRAZY_BEACH.GAME.FLASH_MESSAGES.COUNTDOWN.ONE,
                'countdown'
            );
        }, 2000);
        setTimeout(() => {
            this._setMessage(
                CRAZY_BEACH.GAME.FLASH_MESSAGES.COUNTDOWN.TWO,
                'countdown'
            );
        }, 1000);
    }

    _setMessage(msg, type = 'levelup') {
        this.flashMessage = msg;
        this.messageType = type;
    }

    _setGreenCounter() {
        this.color = 'green';
        const time =
            Math.max(10000 - this.currentPoints * 100, 2000) +
            Math.random(-1500, 1500);
        this.counter = setTimeout(() => {
            this._setRedCounter();
        }, time);
    }

    _setRedCounter() {
        this.color = 'red';
        this.counter = setTimeout(() => {
            this._setGreenCounter();
        }, 3000);
    }

    _stopCounter() {
        clearTimeout(this.counter);
        this.beachAnimation = false;

        const sand = this._getSandElement();
        sand.style.animationPlayState = 'paused';
    }

    _sandmove() {
        const sand = this._getSandElement();
        sand.style.animationPlayState = 'running';
        setTimeout(() => {
            sand.style.animationPlayState = 'paused';
        }, 200);
    }

    _getSandElement() {
        return this.shadowRoot
            .querySelector('crazy-beach-sand-component')
            .shadowRoot.querySelector('.beach__background--sand');
    }

    static get styles() {
        return styles;
    }
}

customElements.define('crazy-beach-game-page', GamePage);
