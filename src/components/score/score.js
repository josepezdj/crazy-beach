import { LitElement, html } from 'lit';
import styles from './score.scss';

export class Score extends LitElement {
    static get properties() {
        return {
            score: { type: Number },
            isRankingCollapsed: { type: Boolean },
            color: { type: String, reflect: true },
        };
    }

    constructor() {
        super();
        this.score = 0;
        this.color = 'green';
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
                    <div
                        class="score__number score__number--color-${this.color}"
                    >
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
