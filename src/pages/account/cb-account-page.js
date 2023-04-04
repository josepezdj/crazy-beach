import { LitElement, html } from 'lit';
import styles from './cb-account-page.scss';
import 'fa-icons';
import { localstorageService } from '../../services/localstorage-service';
import { playerService } from '../../services/player-service';
import { Router } from '@vaadin/router';
import { CRAZY_BEACH } from '../../data/constants';

class AccountPage extends LitElement {
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

    render() {
        return html`
            <section>
                <h1>${CRAZY_BEACH.MAIN_APP.ACCOUNT}</h1>
            </section>
        `;
    }

    static get styles() {
        return [styles];
    }
}

customElements.define('crazy-beach-account-page', AccountPage);