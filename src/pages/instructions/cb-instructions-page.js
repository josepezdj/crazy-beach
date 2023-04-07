import { LitElement, html } from 'lit';
import styles from './cb-instructions-page.scss';
import { playerService } from '../../services/player-service';
import instructions from '../../assets/images/instructions-page-bg.jpg';
import { CRAZY_BEACH } from '../../data/constants';

class InstructionsPage extends LitElement {
    static get properties() {
        return {
            currentPlayer: { type: Object },
        };
    }

    constructor() {
        super();
        this.currentPlayer = playerService.getCurrentPlayer();
        this.goBackUrl = '/juego';
        this.instructionsText = CRAZY_BEACH.INSTRUCTIONS;
    }

    render() {
        return html`
            <section class="instructions-page">
                <div class="instructions-page__bg--container">
                    <img src="${instructions}" class="instructions-page__bg" />
                </div>
                <crazy-beach-header-component
                    currentPlayer="${JSON.stringify(this.currentPlayer)}"
                    goBackUrl="${this.goBackUrl}"
                ></crazy-beach-header-component>
                <h1 class="instructions-page__title">
                    ${CRAZY_BEACH.MAIN_APP.INSTRUCTIONS}
                </h1>
                <ul class="instructions-page__content">
                    ${Object.values(this.instructionsText).map((paragraph) => {
                        return html` <li .innerHTML="${paragraph}"></li> `;
                    })}
                </ul>
            </section>
        `;
    }

    static get styles() {
        return [styles];
    }
}

customElements.define('crazy-beach-instructions-page', InstructionsPage);
