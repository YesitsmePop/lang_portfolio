export default function Sidebar({ active, setActive }) {
  const tabs = [
    { id: "home", label: "Homepage" },
    { id: "about", label: "About the Author" },
    { id: "blog", label: "Personal Blog" },
    { id: "visual", label: "Visual Analysis" },
    { id: "formal", label: "Formal Writing" },
    { id: "creative", label: "Creative Writing" },
    { id: "professional", label: "The Professional" },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-name">Morgan McDonald</div>
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`tab-button ${active === tab.id ? "active" : ""}`}
          onClick={() => setActive(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
