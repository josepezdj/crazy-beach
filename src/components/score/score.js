import { LitElement, html } from 'lit';
import styles from './score.scss';
import 'fa-icons';

export class Score extends LitElement {
    static get properties() {
        return {
            score: { type: Number },
            isRankingCollapsed: { type: Boolean },
        };
    }

    constructor() {
        super();
        this.score = 0;
        this.isRankingCollapsed = false;
    }

    render() {
        return html`
            <section
                class="score ranking-${this.isRankingCollapsed
                    ? 'hide'
                    : 'show'}"
            >
                <div class="score__content">
                    <div class="score__number">
                        <span>${this.score}</span>
                    </div>
                    <h3 class="score__title">Puntos</h3>
                </div>
            </section>
        `;
    }

    static get styles() {
        return styles;
    }
}

customElements.define('crazy-beach-score-component', Score);
