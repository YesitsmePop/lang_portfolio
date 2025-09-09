
import React, { useState, useEffect } from "react";
import "./WritingTabs.css";


const creativeSubtabs = [
  { id: "tab1", label: "My Name", file: "/creative/name.txt", heading: "My Name...", desc: "Based on 'The House on Mange Street' excerpt" },

];


export default function CreativeWriting() {
  const [activeSubtab, setActiveSubtab] = useState(creativeSubtabs[0].id);
  const [tabText, setTabText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const tab = creativeSubtabs.find((t) => t.id === activeSubtab);
    if (!tab || !tab.file) {
      setTabText("");
      return;
    }
    setLoading(true);
    setError("");
    fetch(tab.file)
      .then((res) => {
        if (!res.ok) throw new Error("File not found");
        return res.text();
      })
      .then((txt) => setTabText(txt))
      .catch((e) => setError("Could not load writing piece."))
      .finally(() => setLoading(false));
  }, [activeSubtab]);

  const tab = creativeSubtabs.find((t) => t.id === activeSubtab);

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
      <div className="subtab-content">
        <h2>{tab?.heading}</h2>
        <p style={{ fontStyle: "italic", color: "#bdb4e6" }}>{tab?.desc}</p>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "#e57373" }}>{error}</p>
        ) : (
          <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit", marginTop: 16 }}>{tabText}</pre>
        )}
      </div>
    </div>
  );
}
