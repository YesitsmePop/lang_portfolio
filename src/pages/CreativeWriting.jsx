import React, { useState } from "react";
import "./WritingTabs.css";

const creativeSubtabs = [
  { id: "tab1", label: "I Am Poem" },
  { id: "tab2", label: "Haiku" },
  { id: "tab3", label: "etc..." },
];

const creativeContent = {
  tab1: (
    <div>
      <h2>I Am Poem</h2>
      <p>More Work Here</p>
    </div>
  ),
  tab2: (
    <div>
      <h2>Haiku</h2>
      <p>More Work Here</p>
    </div>
  ),
  tab3: (
    <div>
      <h2>etc...</h2>
      <p>More Work Here</p>
    </div>
  ),
};

export default function CreativeWriting() {
  const [activeSubtab, setActiveSubtab] = useState("tab1");

  return (
    <div className="writing-page">
      <h1>Creative Writing</h1>
      <div className="subtabs">
        {creativeSubtabs.map(({ id, label }) => (
          <button
            key={id}
            className={`subtab-btn ${activeSubtab === id ? "active" : ""}`}
            onClick={() => setActiveSubtab(id)}
            aria-label={`Switch to ${label}`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="subtab-content">{creativeContent[activeSubtab]}</div>
    </div>
  );
}
