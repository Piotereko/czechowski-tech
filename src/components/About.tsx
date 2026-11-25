import { ABOUT } from "@/data/content";

export function About() {
  return (
    <section id="about" className="page-section" aria-labelledby="about-heading">
      <div className="container">
        <div className="section-header">
          <h2 id="about-heading" className="section-title">
            About
          </h2>
        </div>

        <div className="about-grid">
          <div className="about-copy">
            {ABOUT.paragraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <dl className="skills-inventory" aria-label="Technical skills">
            {ABOUT.skills.map((group) => (
              <div key={group.category} className="skill-row">
                <dt className="skill-category">{group.category}</dt>
                <dd className="skill-items" style={{ margin: 0 }}>
                  {group.items}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
