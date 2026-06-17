// Single source of truth for projects, shared by the homepage (ProjectClock)
// and the /work/[slug] detail pages.

export type Project = {
  slug: string; // -> /work/<slug>
  name: string; // shown in PP Editorial New
  year: string; // shown in Geist Mono
  image: string; // landscape preview under /public
  blurb: string; // one-line summary, shown on the homepage card
  description: string; // 1–3 short paragraphs for the detail page
  role: string; // your role, e.g. "Frontend lead"
  outcome: string; // a result / impact line, e.g. "Won HackMIT 2025"
  tags: string[]; // tech / category chips
  links?: { github?: string; demo?: string };
  figures?: { src: string; caption?: string; width: number; height: number }[]; // extra images shown on the detail page
};

export const projects: Project[] = [
  {
    slug: "impression",
    name: "Impression",
    year: "2026",
    image: "/images/impression-ss2.png",
    blurb: "Semantic search over spoken-word audio + query podcasts by meaning and jump to the exact moment w/ word-level tracking.",
    description: [
      'Impression is a web app for semantic search over spoken-word audio. You search by meaning, not keywords. Ask something like "how to set goals" and it returns the exact moments a speaker discussed that idea, even if they never used those words, as timestamped, playable clips that seek straight to the moment.',
      "It started from running with podcasts: I could never recall the one thing someone said last week without scrubbing back through hours of audio by hand. Impression turns that listening history into something I can actually query and revisit.",
      "Ingestion runs offline -- import a podcast or YouTube episode, transcribe it with faster-whisper, chunk it into timestamped windows, and embed each chunk with sentence-transformers (MiniLM, 384-dim). At search time the query is embedded with the same model, matched against the vector store by cosine similarity, and returned as ranked clips. Playback streams directly from S3 via presigned URLs.",
      "Retrieval quality is tracked with a hand-labeled eval harness (recall@5 ≈ 64% over 15 queries) rather than vibes.",
    ].join("\n"),
    role: "Solo — full-stack & infrastructure",
    outcome: "recall@5 ≈ 64% on a hand-labeled retrieval eval; deployed on AWS via Terraform + Docker.",
    tags: ["FastAPI", "AWS", "pgvector", "Whisper", "Terraform", "Docker"],
    links: { demo: "https://demo.tylerle.net" },
  },
  {
    slug: "kateye",
    name: "KatEye",
    year: "2026",
    image: "/images/kateye.jpg",
    blurb: "Edge ML for driving behavior + a ~5k params Convolutional Neural Network that classifies 9 driving events from IMU data on an ESP32, fed by the KatEye data-collection pipeline.",
    description: [
      "KatEye is an edge-ML system for driving-behavior detection. Trucks throw off constant streams of motion data, but shipping raw sensor readings to the cloud to flag risky driving is slow and power-hungry -- so I built a 1D CNN that recognizes driving events directly on the device, with no network round-trip.",
      "The classifier reads 6-axis accelerometer + gyroscope data and labels 9 events -- accelerate, brake, left, right, their aggressive variants, and idling -- in real time on an ESP32-S3. It's a deliberately tiny 1D CNN (~5,100 parameters): two Conv1D layers, max pooling, dropout, and dense layers over a 7-timestep, 6-channel window. I trained it with Stratified Group K-Fold by driver to prevent leakage, balanced class weights, and early stopping, then quantized to INT8 (248 KB) so it fits in the ESP32's 512 KB of SRAM.",
      "A model is only as good as its data, and no labeled IMU dataset existed — so I built KatEye, the end-to-end pipeline that produces one. A car-mounted ESP32 + MPU6050 records fixed 560×6 windows (56 Hz × 10 s), sampled from a hardware-timer ISR and with WiFi disconnected mid-recording to keep the time axis jitter-free. Readings are bias-corrected and gravity-compensated on-device, so every capture comes out CNN-ready with no downstream windowing or padding.",
      "Capture is driven from a web dashboard: Firebase Realtime Database carries the live control channel (trigger + label to the device; countdown, progress, and status back to the UI), while Firestore durably stores each labeled recording with its calibration biases and six channel arrays. A thin Node/Express server serves the dashboard, keeps Firebase keys server-side, and flattens Firestore's typed-value format. One tap labels and records a maneuver -- with an audio cue so you can keep your eyes on the road -- making field collection in a moving car actually feasible.",
    ].join("\n"),
    role: "Team of 3 — embedded firmware, ML & full-stack",
    outcome: "Built the full KatEye collection pipeline (ESP32 firmware -> Firebase -> dashboard) and a ~5,100-param 1D CNN quantized to INT8 (248 KB) for on-device inference.",
    tags: ["1D CNN", "ESP32", "TinyML", "Firebase", "Node.js", "TensorFlow", "LiteRT"],
    links: { github: "https://github.com/kevnster/KatEye" },
    figures: [
      {
        src: "/images/kateye-datacollection.jpg",
        caption:
          "The KatEye dashboard — calibration, one-tap maneuver labeling, recordings, and a live dual-axis plot of the 6-channel IMU capture (an aggressive-brake sample).",
        width: 1266,
        height: 1083,
      },
    ],
  },
  {
    slug: "mcmc",
    name: "MCMC Geostatistical Inversion",
    year: "2025",
    image: "/images/tyler-le-poster.svg",
    blurb: "Geostatistical MCMC inversion of subglacial topography — exploring radar, velocity, and mass-balance fields to reconstruct realistic, mass-conserving beds beneath the Bindschadler & MacAyeal ice streams.",
    description: [
      "Research with the Gator Glaciology Lab reconstructing the bed topography beneath the Bindschadler and MacAyeal ice streams in West Antarctica. Standard baselines like BedMap and BedMachine lean on block kriging, which smooths away the extreme values radar actually measures and introduces flux-divergence artifacts. Artifacts introduces a problem where \"sticky spots\" drive abrupt shifts between slow- and fast-moving ice, hence, creating discrepancies in how researchers estimate melting ice and water going out of an glacier.",
      "Most of the work was data exploration, including assembling and interrogating the geophysical fields for the study area -- ice-surface elevation, InSAR surface velocity (x and y), rate of surface-height change (dh/dt), surface mass balance, and scattered radar bed picks -- and characterizing their spatial structure. I ran experimental variogram analysis to quantify spatial correlation, fit a Matern covariance function, and used simple kriging as a baseline surface before introducing MCMC.",
      "From there I experimented with a dual-chain MCMC approach (Niya Shao et al., 2025), a large-scale chain that fixes low-frequency trends and mass-conservation / flux-divergence anomalies, and small-scale chains that reintroduce realistic high-frequency roughness via Sequential Gaussian Simulation. The objective balances radar measurements, ice velocity, dh/dt, surface mass balance, grounded-ice and conditioning constraints, and mass-conservation uncertainty.",
      "Over ~35 million iterations the large-scale chain drove the mass-conservation loss down to BedMachine's baseline threshold while preserving radar-consistent roughness, with the largest bed adjustments concentrated in the high-velocity region. The framework is modular Python + Jupyter, adaptable to other datasets, scales, and regions. ",
      "Working with incredible mentors and faculty, Niya Shao, Michael Field and Emma Mackie, I am currently continuing this work: utilizing multiprocessing and GPU parralelization across 100+ chains to generate a physically-informed topography on the broader Antartica. "
    ].join("\n"),
    role: "Undergraduate researcher · Gator Glaciology Lab",
    outcome: "Drove mass-conservation loss to BedMachine's baseline over ~35M MCMC iterations while preserving radar-consistent bed roughness across the study area.",
    tags: ["MCMC", "Geostatistics", "Glaciology", "Python", "Kriging / SGS", "Jupyter"],
    links: { github: "https://github.com/tylerrleee/MonteCarloMarkovChain" },
    figures: [
      {
        src: "/images/mcmc/inputs.png",
        caption:
          "Geophysical input & conditioning fields for the study area — surface elevation, InSAR velocity (x/y), dh/dt, surface mass balance, and scattered radar bed picks.",
        width: 7985,
        height: 4877,
      },
      {
        src: "/images/mcmc/bed-realizations.svg",
        caption:
          "MCMC bed-elevation realization (C) against BedMap3 (A) and BedMachine (B) references.",
        width: 1037,
        height: 738,
      },
      {
        src: "/images/mcmc/bed-difference.svg",
        caption:
          "Residual bed change between the initial SGS and final MCMC output — adjustments concentrate in the high-velocity region (yellow contour), over DEMOGORGON radar tracks.",
        width: 1024,
        height: 765,
      },
      {
        src: "/images/mcmc/cross-section.svg",
        caption: "Cross-section comparison: BedMachine vs the converged large-scale chain.",
        width: 471,
        height: 322,
      },
      {
        src: "/images/mcmc/study-area-3d.png",
        caption: "3D view of the Bindschadler & MacAyeal bed topography.",
        width: 4397,
        height: 3653,
      },
    ],
  },
  {
    slug: "hackmit",
    name: "AR Surgical Guidance @HackMIT",
    year: "2025",
    image: "/images/hackmit.jpg",
    blurb: "My first hackathon project (HackMIT) + real-time AR that streams a medic's field of view to a remote surgeon who can annotate it live and talk them through high-stakes procedures.",
    description: [
      "AR Surgical Guidance was my first hackathon project, built at HackMIT with Ryan Mago, an electrical engineer student at Stanford. It's a real-time augmented-reality system that lets a remote surgical expert assist an on-site medic through live vision, voice, and spatial tracking -- streaming the medic's field of view to a surgeon who can annotate directly on it and guide a procedure in real time.",
      "The motivation: in conflict and low-resource regions, medics with limited surgical training are forced into high-stakes procedures, and the expertise to guide them usually can't physically get there. Over 100,000 surgeries a day need guidance and most surgeons who want to help can't travel -- so the platform removes physical presence as the barrier and brings the expertise to the patient instead.",
      "On the medic's side, XREAL One AR glasses and a Raspberry Pi 5 with an Arducam and microphone capture and stream the field of view over low-latency sockets. A central server routes the video and sensor data to the remote \"doctor\" client -- a UI that shows the live stream and overlays and accepts voice and annotation input. The system is modular enough to run on the constrained Pi hardware or be tested locally on a laptop.",
      "We demoed it live at HackMIT. To get the prototype working on the day we tunneled our API endpoints through Ngrok and ran a split deployment -- MongoDB for data, frontend on Vercel, backend on Replit -- pivoting the architecture from our first prototype as we hit deployment walls.",
    ].join("\n"),
    role: "Co-developer (full-stack + data) · team of 2",
    outcome: "Built and demoed a working AR remote-surgery prototype at HackMIT 2025.",
    tags: ["AR Glasses", "Raspberry Pi", "OpenCV", "Sockets", "MongoDB"],
    links: {
      github: "https://github.com/tylerrleee/AR-Surgical-Guidance-Platform",
      demo: "https://youtu.be/wmv5JAN-Vyw",
    },
  },
];

export const getProject = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

export const getProjectIndex = (slug: string): number =>
  projects.findIndex((p) => p.slug === slug);
