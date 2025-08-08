import React, { useState } from "react";
import "./WritingTabs.css";

const formalSubtabs = [
  { id: "tab1", label: "subtab 1" },
  { id: "tab2", label: "subtab 2" },
  { id: "tab3", label: "subtab 3" },
];

const formalContent = {
  tab1: (
    <div>
      <h2>subtab 1</h2>
      <p>This will eventually be a well thought out piece of work</p>
    </div>
  ),
  tab2: (
    <div>
      <h2>subtab 2</h2>
      <p>This will eventually be a well thought out piece of work</p>
    </div>
  ),
  tab3: (
    <div>
      <h2>subtab 3</h2>
      <p>This will eventually be a well thought out piece of work</p>
    </div>
  ),
};

export default function FormalWriting() {
  const [activeSubtab, setActiveSubtab] = useState("tab1");

  return (
    <div className="writing-page">
      <h1>Formal Writing</h1>
      <div className="subtabs">
        {formalSubtabs.map(({ id, label }) => (
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
      <div className="subtab-content">{formalContent[activeSubtab]}</div>
    </div>
  );
}
