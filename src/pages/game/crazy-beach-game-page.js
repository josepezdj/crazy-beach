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
            currentLevel: { type:Object },
            score: { type: Number },
            color: { type: String },
            counter: { type: Function },
            flashMessage: { type: String },
            messageType: { type: String },
            buttonLabel: { type: String },
            isLeftPressed: { type: Boolean },
            isRightPressed: { type: Boolean },
            isGameOn: { type: Boolean },
        };
    }

    constructor() {
        super();
        this.currentPlayer = playerService.getCurrentPlayer();
        this.currentPoints = this.currentPlayer.currentPoints;
        this.currentMaxPoints = this.currentPlayer.maxPoints;
        this.players = playerService.getAllPlayers();
        this.currentLevel = getLevelByPoints(this.currentMaxPoints);
        this.score = 0;
        this.color = 'red';
        this.flashMessage = '';
        this.messageType = '';
        this.buttonLabel = CRAZY_BEACH.GAME.BTN_START.START;
        this.isLeftPressed = false;
        this.isRightPressed = false;
        this.isGameOn = false;
    }

    firstUpdated() {
    }

    render() {
        return html`
            <section class="gamepage">
                <crazy-beach-header-component
                    currentPlayer="${ifDefined(this.currentPlayer)}"
                ></crazy-beach-header-component>
                <crazy-beach-ranking-component
                    currentPlayer="${ifDefined(this.currentPlayer)}"
                    players="${this.players}"
                ></crazy-beach-ranking-component>
                <crazy-beach-beach-component
                    color="${this.color}"
                    score="${this.score}"
                    currentLevel="${JSON.stringify(this.currentLevel)}"
                    @cb-feet-click="${this.onFeetClick}"
                ></crazy-beach-beach-component>
                <div class="gamepage__button">
                    <crazy-beach-button-widget
                        color="blue"
                        label="${this.buttonLabel}"
                        @cb-button-click="${this.onStartButtonClick}"
                    ></crazy-beach-button-widget>
                </div>
            </section>
        `;
    }

    onStartButtonClick() {
    }

    startGame() {
        //Start boat movement
        // Count to 3
        // Change color to green
    
        // Reset points?

        // Start/Reset counter

        // Start/Stop music upon color
    }

    stopGame() {

    }

    onFeetClick(e) {
        const side = e.detail;
        if (side === 'left') {
            // Check counter is on
    
            // Check color of the flag

            // Check whether the other btn was pressed before or not

            // Add or substract point/s

            // Change score color (green +1 pt / red -1 pt)

            // Update ranking (currentPoints, maxPoints)

            // Messages (level up, ranking up)

            // Game over message
        }
    }

    _fireCountdown() {
        
    }

    _changeFlagColor(color) {
        const boat = this._getBoatElement();
        if (boat !== null && boat !== undefined) {
            if (color === 'red') {
                boat.querySelector('.boat__flag--green').style.visibility = 'hidden';
                boat.querySelector('.boat__flag--red').style.visibility = 'visible';
            } else {
                boat.querySelector('.boat__flag--green').style.visibility = 'visible';
                boat.querySelector('.boat__flag--red').style.visibility = 'hidden';
            }
        }
    }

    _setGreenCounter() {
        const time = Math.max(10000 - this.score * 100, 2000) + Math.random(-1500, 1500);
        clearTimeout(this.counter);
        this.counter = setTimeout(() => {
            this.color = 'green';
        }, time);
    }

    _setRedCounter() {
        clearTimeout(this.counter);
        this.counter = setTimeout(() => {
            this.color = 'red';
        }, 3000);
    }

    _sandMovement(mode) {
        if (mode === 'start') {
            this._getSandElement().classList.add('sand-scroll');
        } else this._getSandElement().classList.remove('sand-scroll');
    }

    _boatMovement(mode) {
        if (mode === 'start') {
            this._getBoatElement().classList.add('boat-move');
        } else this._getBoatElement().classList.remove('boat-move');
    }

    _wavesMovement(mode) {
        if (mode === 'start') {
            this._getWavesElement().classList.add('waves-move');
        } else this._getWavesElement().classList.remove('waves-move');
    }

    _getBoatElement() {
        return this.shadowRoot.querySelector('crazy-beach-beach-component')
            .shadowRoot.querySelector('crazy-beach-boat-component')
            .shadowRoot.querySelector('.boat__figure');
    }

    _getWavesElement() {
        return this.shadowRoot.querySelector('crazy-beach-beach-component')
        .shadowRoot.querySelector('crazy-beach-boat-component')
        .shadowRoot.querySelector('.boat__bg');
    }

    _getSandElement() {
        return this.shadowRoot.querySelector('crazy-beach-beach-component')
        .shadowRoot.querySelector('.beach__background--sand');
    }

    static get styles() {
        return styles;
    }
}

customElements.define('crazy-beach-game-page', GamePage);
