import { LitElement, html } from 'lit';
import styles from './crazy-beach-game-page.scss';
import './import';

export class GamePage extends LitElement {
    static get properties() {
        return {
            user: { type: Object },
        };
    }

    constructor() {
        super();
        this.user = {
            name: 'Pepe',
            points: 0,
        };
    }

    firstUpdated() {
        this.user = JSON.parse(window.sessionStorage.getItem('user'));

    }

    render() {
        return html`
            <div class="gamepage">
                <h1>Game</h1>
                <p>${this.user.name}</p>
            </div>
        `;
    }

    static get styles() {
        return styles;
    }
}

customElements.define('crazy-beach-game-page', GamePage);
