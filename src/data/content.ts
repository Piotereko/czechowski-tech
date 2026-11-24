export interface ExternalLink {
  label: string;
  href: string;
}

export interface CaseStudy {
  id: string;
  kicker: string;
  title: string;
  paragraphs: string[];
  outcome?: string;
  environment?: string;
  links: ExternalLink[];
  illustration: {
    src: string;
    alt: string;
    width: number;
    height: number;
    caption: string;
  };
  layout: "wide-top" | "split-left" | "split-right" | "wide-architectural";
}

export interface TimelineLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface TimelineEntry {
  id: string;
  period: string;
  title: string;
  summary: string;
  bullets?: string[];
  links?: TimelineLink[];
}

export interface SkillGroup {
  category: string;
  items: string;
}

export interface ResultEntry {
  event: string;
  outcome: string;
}

export const SITE = {
  name: "Piotr Czechowski",
  domain: "czechowski.tech",
  title: "Piotr Czechowski — Edge AI Engineer",
  description:
    "Full Stack AI Engineer at Unleash Live. Building edge AI at the seam of computer vision, embedded systems, and live video — on the device, not only in the cloud.",
  location: "Warsaw / Ulsan",
} as const;

export const SOCIAL_LINKS = {
  linkedin: {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/piotr-czechowski4",
  },
  github: {
    label: "GitHub",
    href: "https://github.com/Piotereko",
  },
  email: {
    label: "Email",
    display: "czechowski.contact@gmail.com",
    href: "mailto:czechowski.contact@gmail.com",
  },
} as const;

export const HERO = {
  headline: "I build edge AI that has to work in the field.",
  subline:
    "Full Stack AI Engineer at Unleash Live. I work at the seam of computer vision, embedded systems and live video — on the device, not only in the cloud.",
  primaryCta: {
    label: "View selected work",
    href: "#work",
  },
} as const;

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "miniband",
    kicker: "D4D × EDTH Seoul · October 2026",
    title: "MiniBand",
    paragraphs: [
      "At the Korean Defense Tech Hackathon in Seoul, our team built MiniBand. Instead of sending full video, we run detection and depth models on the edge, then squeeze a compact scene update over BLE to the operator, who reconstructs a shared 3D view. The idea is simple: bandwidth should follow surprise — we send an update when the operator’s predicted state no longer matches what we see.",
      "I worked on getting detection and depth running on an Intel Arc iGPU, and on pushing useful data through a narrow BLE link. This was a four-person team: Piotr Czechowski, Andrii Olkhovych, Ikrombek Obloqulov and Matteo Huck. We took part; we did not place, and we did not win an award.",
    ],
    links: [
      {
        label: "Repository",
        href: "https://github.com/def4alt/minband",
      },
      // [TODO: official D4D project / showcase URL, if Piotr has one]
      // [TODO: demo recording or stills he is willing to publish, with other participants' privacy in mind]
    ],
    illustration: {
      src: "/illustrations/miniband-edge.webp",
      alt: "Technical illustration of an edge camera module projecting a geometric depth frustum over a terrain contour mesh, transmitting a narrowband cyan delta pulse to a handheld operator display reconstructing the 3D scene.",
      width: 1376,
      height: 768,
      caption: "Edge perception to compact delta update over BLE",
    },
    layout: "wide-top",
  },
  {
    id: "voiceops-map",
    kicker: "EDTH Warsaw · June 2026",
    title: "VoiceOps Map",
    paragraphs: [
      "In tactical settings, updating a map by hand slows operators down. With the HardCounter team — Aleksander Jeżowski, Denis Lisovytskiy, Rafał Lasota and myself — we built VoiceOps Map for the European Defense Tech Hackathon in Warsaw (organized by EY, Poland’s Ministry of National Defence, and the Polish Development Fund), on a challenge set by Lysk.",
      "An operator presses push-to-talk and speaks a field report. The system transcribes the speech, pulls out the intent, geocodes it, and updates a shared live map for everyone connected. Voice is processed on a wearable Raspberry Pi 5, on-device, so raw audio does not have to leave the unit.",
    ],
    outcome:
      "First place at the European Defense Tech Hackathon in Warsaw.",
    links: [
      {
        label: "Demo",
        href: "https://lnkd.in/d7Y_Aq_D",
      },
      // [TODO: repository URL — Piotr will add this later]
    ],
    illustration: {
      src: "/illustrations/voiceops-wearable.webp",
      alt: "Technical still life of a wearable push-to-talk single-board voice unit resting beside a dark topographic live map display, linked by an ice-cyan waveform ribbon into geocoded waypoint pins.",
      width: 1376,
      height: 768,
      caption: "On-device voice processing to shared topographic map",
    },
    layout: "split-left",
  },
  {
    id: "rackmedic",
    kicker: "StarkHacks, Purdue University · April 2026",
    title: "RackMedic",
    paragraphs: [
      "Data centers need constant thermal monitoring; an overheating blade has to be handled quickly and safely. At StarkHacks 2026 — a large hardware hackathon at Purdue University, with about 1,000 participants from more than ten countries — I built RackMedic, an autonomous maintenance robot, with Mateusz, Svieta and Denis.",
      "Distributed ESP32-C6 thermal sensors (ESP-IDF, FreeRTOS, MQTT) feed anomaly triage. A rover servos visually to AprilTag / ArUco markers, a robotic arm extracts the faulty blade, and an incident report lands on the operator dashboard (Next.js, Auth0, WebSockets, gamepad teleoperation). I owned the orchestration layer that ties the sensors, triage, robot control and dashboard together, and helped organize sponsorship (TME, PwC CTech, support from Warsaw University of Technology) and the team’s media.",
    ],
    outcome:
      "First place, Microsoft Track (AI & Automation). Second place, Best Use of Viam. Judges also noted that the team found and worked around a bug in the sponsor’s arm-control code, and wrote control scripts from scratch.",
    links: [
      {
        label: "Devpost",
        href: "https://devpost.com/software/rackmedic",
      },
      {
        label: "WUT (EN)",
        href: "https://eng.pw.edu.pl/News/WUT-students-conquer-the-USA",
      },
      {
        label: "WUT (PL)",
        href: "https://www.pw.edu.pl/aktualnosci/studenci-pw-podbili-stany-zjednoczone",
      },
    ],
    illustration: {
      src: "/illustrations/rackmedic-bench.webp",
      alt: "Technical still life of an autonomous wheeled maintenance rover with an articulated robotic arm aligned via ice-cyan optical vectors to an AprilTag marker and a warm server rack blade.",
      width: 1376,
      height: 768,
      caption: "Thermal triage, fiducial alignment, and autonomous blade extraction",
    },
    layout: "split-right",
  },
  {
    id: "unleash-live",
    kicker: "Unleash Live · Sydney, remote · July 2026–present",
    title: "Developer Platform for live video analytics",
    paragraphs: [
      "Unleash Live is a Sydney-based company building live video analytics for enterprise customers. I work there remotely as a Full Stack AI Engineer, owning features end-to-end across backend, frontend and cloud ML.",
      "I enhance the Developer Platform for AI model training, evaluation and annotation workflows (vision tasks, dataset slices, evaluation matrices), ship full-stack features from design through production (API and React / TypeScript UI), build and harden deployment and inference paths on AWS (SageMaker, Bedrock), and contribute to computer-vision tooling — for example misdetection and misclassification flows, and classification-task support — across the API and the frontend.",
    ],
    environment:
      "TypeScript · React · Python · AWS (SageMaker, Bedrock) · Azure · computer vision · Docker",
    links: [
      // [TODO: official Unleash Live company URL]
    ],
    illustration: {
      src: "/illustrations/unleash-platform.webp",
      alt: "Isometric technical illustration of a live video analytics and computer vision evaluation bench showing a multi-frame detection strip, a calibrated evaluation matrix grid, and an inference pipeline from camera optics to cloud layers.",
      width: 1376,
      height: 768,
      caption: "Live video analytics, training workflows, and evaluation tooling",
    },
    layout: "wide-architectural",
  },
];

export const TIMELINE: TimelineEntry[] = [
  {
    id: "wut-mini",
    period: "October 2023",
    title: "Warsaw University of Technology (MiNI)",
    summary:
      "Started B.Sc. in Computer Science and Information Systems (English-taught).",
    bullets: [
      "Enrolled at the Faculty of Mathematics and Information Science (MiNI), Warsaw University of Technology.",
      "Continuing coursework in parallel with the University of Ulsan exchange and preparing a bachelor’s thesis on unsupervised clustering of exoplanet data.",
      "Expected completion in February 2027, followed by plans to pursue a master’s degree.",
    ],
  },
  {
    id: "bryohive",
    period: "November 2025",
    title: "Bryohive · BEST Hacking League, Warsaw",
    summary:
      "1st place in Hardware — modular, off-grid moss façade system.",
    // [TODO: public project link for Bryohive, if any]
    bullets: [
      "Awarded 1st place in Hardware at BEST Hacking League in Warsaw.",
      "Built a modular, off-grid moss façade system combining sensor fusion and solar tracking.",
    ],
  },
  {
    id: "rave",
    period: "January 2026",
    title: "R.A.V.E. · BITEhack VII, Kraków",
    summary:
      "1st place in Robotics — two-player physical driving console.",
    // [TODO: public project link for R.A.V.E., if any]
    bullets: [
      "Led the software and hardware architecture for the Robotic Audio-Visual Entertainer (R.A.V.E.).",
      "Implemented PID motor control in C++ and ESP-NOW feedback under 150 ms.",
      "Stack: C++, PID motor control, ESP-NOW.",
    ],
  },
  {
    id: "pwc-poland",
    period: "February–June 2026",
    title: "Generative AI Intern · PwC Poland",
    summary:
      "Built end-to-end AI products in the CTech / GenAI team.",
    bullets: [
      "Owned AI Builders, a gamified LLM course, from design through production.",
      "Contributed to an internal chatbot and agent platform.",
      "Worked within PwC Poland’s CTech / GenAI team.",
    ],
  },
  {
    id: "rackmedic-timeline",
    period: "April 2026",
    title: "RackMedic · StarkHacks, Purdue University",
    summary:
      "1st Microsoft Track, 2nd Best Use of Viam — autonomous data-center maintenance robot.",
    bullets: [
      "Owned the orchestration layer tying distributed thermal sensors, anomaly triage, robot control, and the operator dashboard together.",
      "Visually servoed a rover to AprilTag / ArUco markers for robotic-arm blade extraction, writing custom arm-control scripts from scratch to work around a sponsor bug.",
      "Built with Mateusz, Svieta, and Denis; helped organize sponsorship (TME, PwC CTech, WUT) and team media.",
      "Stack: ESP32-C6 (ESP-IDF, FreeRTOS, MQTT), AprilTag / ArUco, Next.js, Auth0, WebSockets.",
    ],
    links: [
      { label: "Case study", href: "#rackmedic" },
      {
        label: "Devpost",
        href: "https://devpost.com/software/rackmedic",
        external: true,
      },
      {
        label: "WUT (EN)",
        href: "https://eng.pw.edu.pl/News/WUT-students-conquer-the-USA",
        external: true,
      },
    ],
  },
  {
    id: "voiceops-timeline",
    period: "June 2026",
    title: "VoiceOps Map · EDTH Warsaw",
    summary:
      "1st place — on-device push-to-talk voice reporting to a shared live map.",
    bullets: [
      "Built with the HardCounter team (Aleksander Jeżowski, Denis Lisovytskiy, Rafał Lasota) on a challenge set by Lysk.",
      "Transcribes push-to-talk field reports, extracts intent, geocodes locations, and updates a shared live map.",
      "Processes voice on-device on a wearable Raspberry Pi 5 so raw audio stays on the unit.",
    ],
    links: [
      { label: "Case study", href: "#voiceops-map" },
      {
        label: "Demo",
        href: "https://lnkd.in/d7Y_Aq_D",
        external: true,
      },
      {
        label: "HardCounter GitHub",
        href: "https://github.com/HardCounter",
        external: true,
      },
    ],
  },
  {
    id: "unleash-live-timeline",
    period: "July 2026–present",
    title: "Full Stack AI Engineer · Unleash Live",
    summary:
      "Remote (Sydney) — live video analytics and Developer Platform.",
    bullets: [
      "Enhance the Developer Platform for AI model training, evaluation, and annotation workflows (vision tasks, dataset slices, evaluation matrices).",
      "Ship full-stack features end-to-end across backend APIs, React / TypeScript UI, and computer-vision tooling (misdetection/misclassification flows, classification-task support).",
      "Build and harden deployment and inference paths on AWS (SageMaker, Bedrock).",
      "Stack: TypeScript, React, Python, AWS (SageMaker, Bedrock), Azure, computer vision, Docker.",
    ],
    links: [{ label: "Case study", href: "#unleash-live" }],
  },
  {
    id: "scalentic",
    period: "September 2026–present",
    title: "Part-time Full Stack AI Developer · Scalentic",
    // [TODO: Scalentic company URL, if Piotr wants the name linked]
    summary:
      "In parallel with Unleash Live and the Korea exchange.",
  },
  {
    id: "uou-exchange",
    period: "September–23 December 2026",
    title: "Exchange · University of Ulsan, South Korea (GKS)",
    summary:
      "GKS exchange semester alongside WUT coursework and thesis prep.",
    bullets: [
      "Exchange semester at the University of Ulsan, South Korea (GKS).",
      "Continued coursework at Warsaw University of Technology in parallel.",
      "Prepared a bachelor’s thesis on unsupervised clustering of exoplanet data.",
    ],
  },
  {
    id: "miniband-timeline",
    period: "October 2026",
    title: "MiniBand · D4D × EDTH, Seoul",
    summary:
      "Edge detection and depth with compact BLE 3D scene delta updates.",
    bullets: [
      "Ran detection and depth models on an Intel Arc iGPU instead of streaming full video.",
      "Transmitted compact scene updates over a narrow BLE link when the operator’s predicted state diverged from observed state, reconstructing a shared 3D view.",
      "Built in a four-person team with Andrii Olkhovych, Ikrombek Obloqulov, and Matteo Huck.",
      "Stack: Intel Arc iGPU, edge detection & depth models, BLE.",
    ],
    links: [
      { label: "Case study", href: "#miniband" },
      {
        label: "Repository",
        href: "https://github.com/def4alt/minband",
        external: true,
      },
    ],
  },
  {
    id: "bsc-completion",
    period: "February 2027",
    title: "Expected B.Sc. completion",
    summary:
      "Expected completion of the bachelor’s degree; planning to pursue a master’s.",
  },
];

export const ABOUT = {
  // [TODO: portrait photo, if Piotr wants one in About]
  paragraphs: [
    "I am Piotr Czechowski, a Full Stack AI Engineer based in Warsaw, currently on exchange in Ulsan, South Korea, through December 2026. I build at the intersection of hardware and AI: embedded firmware, robotics, computer vision, and full-stack products.",
    "I study Computer Science and Information Systems at Warsaw University of Technology (MiNI), in an English-taught bachelor’s program I started in October 2023 and expect to finish in February 2027. After the bachelor’s, I plan to pursue a master’s.",
    "I work in Polish (native) and English (fluent, C1/C2, used daily in professional technical work).",
  ],
  skills: [
    {
      category: "Languages",
      items: "Python, TypeScript / JavaScript, C++, C, C#, SQL",
    },
    {
      category: "AI / ML",
      items:
        "PyTorch, computer vision, NLP, LLM agents (LangChain / LangGraph, tool-calling, RAG), prompt engineering",
    },
    {
      category: "Embedded",
      items:
        "ESP32 (ESP-IDF, FreeRTOS, ESP-NOW), Arduino, Raspberry Pi, MQTT, sensor fusion, KiCad",
    },
    {
      category: "Full stack",
      items:
        "React, Next.js, FastAPI, Pydantic, Docker, AWS, Azure, Git, CI/CD",
    },
  ] as SkillGroup[],
} as const;

export const SELECTED_RESULTS: ResultEntry[] = [
  {
    event: "StarkHacks 2026, Purdue",
    outcome: "RackMedic: 1st, Microsoft Track; 2nd, Best Use of Viam",
  },
  {
    event: "EDTH Warsaw, June 2026",
    outcome: "VoiceOps Map: 1st place",
  },
  {
    event: "BITEhack VII, Kraków, January 2026",
    outcome: "R.A.V.E.: 1st, Robotics",
  },
  {
    event: "BEST Hacking League, Warsaw, November 2025",
    outcome: "Bryohive: 1st, Hardware",
  },
];

export const PRESS = {
  wutArticle: {
    label: "WUT students conquer the USA",
    href: "https://eng.pw.edu.pl/News/WUT-students-conquer-the-USA",
  },
  broadcastText:
    "Live appearance on the Polish breakfast TV program Pytania na śniadanie (June 2026), and an interview on Polish Radio 4.",
  hardCounterGithub: {
    label: "HardCounter on GitHub",
    href: "https://github.com/HardCounter",
  },
  hardCounterLinkedin: {
    label: "HardCounter on LinkedIn",
    href: "https://linkedin.com/company/hardcounter-team",
  },
} as const;

export const CONTACT = {
  headline: "Happy to talk.",
  line: "LinkedIn, GitHub, or email — whatever is easiest.",
} as const;
