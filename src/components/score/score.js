import { LitElement, html } from 'lit';
import styles from './score.scss';
import 'fa-icons';

export class Score extends LitElement {
    static get properties() {
        return {
            score: { type: Number },
        };
    }

    constructor() {
        super();
        this.score = 0;
    }

    render() {
        return html`
            <section class="score">
                <h3 class="score__title">Puntos</h3>
                <div class="score__number">
                    <span>${this.score}</span>
                </div>
            </section>
        `;
    }

    static get styles() {
        return styles;
    }
}

customElements.define('crazy-beach-score-component', Score);
