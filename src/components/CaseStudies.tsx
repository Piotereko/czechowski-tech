import Image from "next/image";
import { CASE_STUDIES, type CaseStudy } from "@/data/content";

function CaseCopy({ study }: { study: CaseStudy }) {
  return (
    <div>
      <p className="case-kicker">{study.kicker}</p>
      <h3 className="case-title">{study.title}</h3>
      <div className="case-body">
        {study.paragraphs.map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>
      {study.outcome && <p className="case-outcome">{study.outcome}</p>}
      {study.links.length > 0 && (
        <div className="case-links">
          {study.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function CaseFigure({
  study,
  sizes,
  showEnv,
}: {
  study: CaseStudy;
  sizes: string;
  showEnv?: boolean;
}) {
  return (
    <figure className="case-figure">
      <Image
        src={study.illustration.src}
        alt={study.illustration.alt}
        width={study.illustration.width}
        height={study.illustration.height}
        sizes={sizes}
      />
      {showEnv && study.environment ? (
        <figcaption className="case-env">{study.environment}</figcaption>
      ) : (
        <figcaption className="case-figcaption">
          {study.illustration.caption}
        </figcaption>
      )}
    </figure>
  );
}

export function CaseStudies() {
  return (
    <section id="work" className="page-section" aria-labelledby="work-heading">
      <div className="container">
        <div className="section-header">
          <h2 id="work-heading" className="section-title">
            Selected work
          </h2>
        </div>

        <div className="case-list">
          {CASE_STUDIES.map((study) => {
            if (study.layout === "wide-top") {
              return (
                <article key={study.id} id={study.id} className="case-scene">
                  <div className="scene-wide-top">
                    <CaseFigure
                      study={study}
                      sizes="(max-width: 900px) 100vw, 1120px"
                    />
                    <div className="scene-wide-top-content">
                      <div>
                        <p className="case-kicker">{study.kicker}</p>
                        <h3 className="case-title">{study.title}</h3>
                        {study.links.length > 0 && (
                          <div className="case-links">
                            {study.links.map((link) => (
                              <a
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                className="text-link"
                              >
                                {link.label}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="case-body">
                        {study.paragraphs.map((paragraph, idx) => (
                          <p key={idx}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            }

            if (study.layout === "wide-architectural") {
              return (
                <article key={study.id} id={study.id} className="case-scene">
                  <div className="scene-wide-arch">
                    <CaseFigure
                      study={study}
                      sizes="(max-width: 900px) 100vw, 1120px"
                      showEnv
                    />
                    <div className="scene-wide-arch-grid">
                      <div>
                        <p className="case-kicker">{study.kicker}</p>
                        <h3 className="case-title">{study.title}</h3>
                      </div>
                      <div className="case-body">
                        {study.paragraphs.map((paragraph, idx) => (
                          <p key={idx}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            }

            const splitClass =
              study.layout === "split-left"
                ? "scene-split scene-split--left"
                : "scene-split scene-split--right";

            return (
              <article key={study.id} id={study.id} className="case-scene">
                <div className={splitClass}>
                  <div className="scene-split-visual">
                    <CaseFigure
                      study={study}
                      sizes="(max-width: 960px) 100vw, 640px"
                    />
                  </div>
                  <div className="scene-split-copy">
                    <CaseCopy study={study} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
