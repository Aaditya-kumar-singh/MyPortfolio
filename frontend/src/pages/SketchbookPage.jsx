import React, { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Box,
  CircleDot,
  Code2,
  Layers3,
  Orbit,
  PencilRuler,
  Sparkles,
} from "lucide-react";

const sketches = [
  {
    id: "orbital-study",
    number: "01",
    title: "Orbital Study",
    category: "3D studies",
    description: "A study of orbit, balance, and slow movement in a dark spatial environment.",
    kind: "orbit",
    tags: ["Three.js", "Motion"],
    status: "Visual experiment",
  },
  {
    id: "interface-fragments",
    number: "02",
    title: "Interface Fragments",
    category: "Interface",
    description: "Small interface ideas exploring contrast, hierarchy, and tactile controls.",
    kind: "interface",
    tags: ["UI", "CSS"],
    status: "Design study",
  },
  {
    id: "system-map",
    number: "03",
    title: "System Map",
    category: "Systems",
    description: "A visual sketch of how a frontend, API, services, and data layer relate.",
    kind: "system",
    tags: ["Architecture", "APIs"],
    status: "Concept",
  },
  {
    id: "light-and-form",
    number: "04",
    title: "Light & Form",
    category: "3D studies",
    description: "An exploration of soft light, wireframes, and geometric silhouettes.",
    kind: "form",
    tags: ["Geometry", "Lighting"],
    status: "Visual experiment",
  },
];

const filters = ["All", "3D studies", "Interface", "Systems"];

function SketchArtwork({ kind }) {
  if (kind === "orbit") {
    return (
      <div className="sketch-art sketch-art-orbit" aria-hidden="true">
        <span className="orbit-ring orbit-ring-one" />
        <span className="orbit-ring orbit-ring-two" />
        <span className="orbit-core" />
        <span className="orbit-point" />
        <span className="sketch-coordinate">x 024 / y 108</span>
      </div>
    );
  }

  if (kind === "interface") {
    return (
      <div className="sketch-art sketch-art-interface" aria-hidden="true">
        <div className="interface-window">
          <span className="interface-dots"><i /><i /><i /></span>
          <span className="interface-line interface-line-long" />
          <span className="interface-line" />
          <span className="interface-block" />
          <span className="interface-line interface-line-short" />
        </div>
        <span className="sketch-coordinate">FRAME / 02</span>
      </div>
    );
  }

  if (kind === "system") {
    return (
      <div className="sketch-art sketch-art-system" aria-hidden="true">
        <span className="system-node system-node-top">UI</span>
        <span className="system-node system-node-left">API</span>
        <span className="system-node system-node-right">DB</span>
        <span className="system-node system-node-bottom">APP</span>
        <span className="system-connector connector-a" />
        <span className="system-connector connector-b" />
        <span className="system-connector connector-c" />
        <span className="system-connector connector-d" />
        <span className="sketch-coordinate">FLOW / 03</span>
      </div>
    );
  }

  return (
    <div className="sketch-art sketch-art-form" aria-hidden="true">
      <span className="form-shape form-shape-back" />
      <span className="form-shape form-shape-front" />
      <span className="form-glow" />
      <span className="sketch-coordinate">LIGHT / 04</span>
    </div>
  );
}

export default function SketchbookPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const reduceMotion = useReducedMotion();
  const visibleSketches = useMemo(
    () => activeFilter === "All" ? sketches : sketches.filter((sketch) => sketch.category === activeFilter),
    [activeFilter],
  );

  return (
    <section className="sketchbook-section section-shell" aria-labelledby="sketchbook-title">
      <div className="sketchbook-inner">
        <motion.div
          className="sketchbook-heading"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.5 }}
        >
          <div className="section-kicker"><PencilRuler size={15} /> FIELD NOTES / 004</div>
          <div className="sketchbook-title-row">
            <div>
              <h2 id="sketchbook-title" className="section-title">The <span>Sketchbook</span></h2>
              <p className="sketchbook-intro">
                A workbench for ideas before they become products. Small experiments in form,
                interaction, systems, and the details in between.
              </p>
            </div>
            <div className="sketchbook-index" aria-hidden="true">
              <span>AK</span>
              <span>IDEAS IN PROGRESS</span>
            </div>
          </div>
        </motion.div>

        <div className="sketchbook-toolbar">
          <div className="sketchbook-filters" role="group" aria-label="Filter sketches">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`sketch-filter ${activeFilter === filter ? "is-active" : ""}`}
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <span className="sketchbook-count"><CircleDot size={13} /> {String(visibleSketches.length).padStart(2, "0")} NOTES</span>
        </div>

        <motion.div layout className="sketchbook-grid">
          <AnimatePresence mode="popLayout">
            {visibleSketches.map((sketch) => (
              <motion.article
                key={sketch.id}
                layout
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: 10 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.24 }}
                className="sketch-card"
              >
                <div className="sketch-card-topline">
                  <span>{sketch.number} / 04</span>
                  <span className="sketch-status"><span />{sketch.status}</span>
                </div>
                <SketchArtwork kind={sketch.kind} />
                <div className="sketch-card-content">
                  <div className="sketch-card-title-row">
                    <h3>{sketch.title}</h3>
                    <span className="sketch-open-icon" aria-hidden="true"><ArrowUpRight size={17} /></span>
                  </div>
                  <p>{sketch.description}</p>
                  <div className="sketch-card-bottom">
                    <div className="sketch-tags">
                      {sketch.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                    <span className="sketch-category">
                      {sketch.kind === "orbit" ? <Orbit size={13} /> : sketch.kind === "interface" ? <Layers3 size={13} /> : sketch.kind === "system" ? <Code2 size={13} /> : <Box size={13} />}
                      {sketch.category}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="sketchbook-footer-note">
          <Sparkles size={15} />
          <span>Experiments, not promises — concepts evolve as I learn and build.</span>
        </div>
      </div>
    </section>
  );
}
