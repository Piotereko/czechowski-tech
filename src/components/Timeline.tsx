import { TIMELINE } from "@/data/content";

export function Timeline() {
  return (
    <section
      id="timeline"
      className="page-section"
      aria-labelledby="timeline-heading"
    >
      <div className="container">
        <div className="section-header">
          <h2 id="timeline-heading" className="section-title">
            Timeline
          </h2>
        </div>

        <ol className="timeline-list">
          {TIMELINE.map((entry) => (
            <li key={`${entry.period}-${entry.text.slice(0, 16)}`} className="timeline-item">
              <span className="timeline-period">{entry.period}</span>
              <p className="timeline-text">{entry.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
