import { LitElement, html } from 'lit';
import styles from './crazy-beach-game-page.scss';
import { ifDefined } from 'lit/directives/if-defined.js';
import { getLevelByPoints } from '../../data/levels-api';
import { playerService } from '../../services/player-service';
import './import';

export class GamePage extends LitElement {
    static get properties() {
        return {
            currentLevel: { type:Object },
            currentPlayer: { type: Object },
            currentPoints: { type: Number },
            currentPlayerMaxPoints: { type: Number },
            players: { type: Array },
            score: { type: Number },
            color: { type: String },
            counter: { type: Function },
            boat: { type: Object },
            isLeftPressed: { type: Boolean },
            isRightPressed: { type: Boolean },
            messages: { type: Array },
        };
    }

    constructor() {
        super();
        this.currentPlayer = playerService.getCurrentPlayer();
        this.currentPlayerCurrentPoints = this.currentPlayer.currentPoints;
        this.currentPlayerMaxPoints = this.currentPlayer.maxPoints;
        this.players = playerService.getAllPlayers();
        this.currentLevel = getLevelByPoints();
        this.score = 0;
        this.color = 'red';
        this.messages = [];
    }

    firstUpdated() {
        document.addEventListener('cb-color-change', this.onColorChange)
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
                    currentLevel="${ifDefined(this.currentLevel)}"
                    @cb-feet-click="${this.onFeetClick}"
                ></crazy-beach-beach-component>
                <div class="gamepage__button">
                    <crazy-beach-button-widget
                        color="blue"
                        label="Empezar"
                        @cb-button-click="${this.onStartButton}"
                    ></crazy-beach-button-widget>
                </div>
                <crazy-beach-score-component
                    score="${this.score}"
                ></crazy-beach-score-component>
            </section>
        `;
    }

    onColorChange(e) {
        const color = e.detail;
        if (color === 'red') {
            // Stop counter

            // Stop motion

            // Call green timer

        } else {
            // Start counter

            // Start motion

            // Call red timer
        }
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

    onStartButton() {
        // If a game is running, ask before reset!
        console.log('Start button clicked');
        this._startGame();
    }

    fireCountdown() {
        
    }

    _startGame() {
        //Start boat movement
        // Count to 3
        // Change color to green
    
        // Reset points?

        // Start/Reset counter

        // Start/Stop music upon color
    }

    _stopGame() {

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
