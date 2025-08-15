export default function Sidebar({ active, setActive, visibleTabs }) {
  // Full list of tabs with IDs
  const allTabs = [
    { id: "home", label: "Homepage" },
    { id: "about", label: "About the Author" },
    { id: "blog", label: "Personal Blog" },
    { id: "visual", label: "Visual Analysis" },
    { id: "formal", label: "Formal Writing" },
    { id: "creative", label: "Creative Writing" },
    { id: "professional", label: "The Professional" },
  ];

  // Only show tabs included in visibleTabs
  const tabsToShow = allTabs.filter(tab => visibleTabs.includes(tab.id));

  return (
    <div className="sidebar">
      <div className="sidebar-name">Morgan McDonald</div>
      {tabsToShow.map(tab => (
        <button
          key={tab.id}
          className={`nav-btn sidebar-btn ${active === tab.id ? "active" : ""}`}
          onClick={() => setActive(tab.id)}
        >
          {tab.label}
        </button>
      ))}
      <img src="/logo.png" alt="Logo" className="sidebar-logo" />
    </div>
  );
}
