import { PRESS, SELECTED_RESULTS } from "@/data/content";

export function SelectedResults() {
  return (
    <section
      id="results"
      className="page-section"
      aria-labelledby="results-heading"
    >
      <div className="container">
        <div className="section-header">
          <h2 id="results-heading" className="section-title">
            Selected results
          </h2>
        </div>

        <ul className="results-list">
          {SELECTED_RESULTS.map((item) => (
            <li key={item.event} className="result-item">
              <span className="result-event">{item.event}</span>
              <span className="result-outcome">{item.outcome}</span>
            </li>
          ))}
        </ul>

        <p className="press-line">
          Coverage:{" "}
          <a
            href={PRESS.wutArticle.href}
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            {PRESS.wutArticle.label}
          </a>
          . {PRESS.broadcastText} Team:{" "}
          <a
            href={PRESS.hardCounterGithub.href}
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            {PRESS.hardCounterGithub.label}
          </a>{" "}
          ·{" "}
          <a
            href={PRESS.hardCounterLinkedin.href}
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            {PRESS.hardCounterLinkedin.label}
          </a>
        </p>
      </div>
    </section>
  );
}
