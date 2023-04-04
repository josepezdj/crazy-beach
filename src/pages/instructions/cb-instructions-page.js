import { LitElement, html } from 'lit';
import styles from './cb-instructions-page.scss';
import 'fa-icons';
import { localstorageService } from '../../services/localstorage-service';
import { playerService } from '../../services/player-service';
import { Router } from '@vaadin/router';
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
    }

    render() {
        return html`
            <section class="instructions-page">
                <crazy-beach-header-component
                    currentPlayer="${JSON.stringify(this.currentPlayer)}"
                    goBackUrl="${this.goBackUrl}"
                ></crazy-beach-header-component>
                <h1>${CRAZY_BEACH.MAIN_APP.INSTRUCTIONS}</h1>
            </section>
        `;
    }

    static get styles() {
        return [styles];
    }
}

customElements.define('crazy-beach-instructions-page', InstructionsPage);
