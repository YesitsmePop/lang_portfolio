import React, { useState, useEffect } from "react";

const posts = [
  {
    id: 1,
    title: "Is Testing Turning Data?",
    date: "August 13 2025",
    snippet: "Living in a world where substance abuse and the will to fit in can become so prevalent, it occurs...",
    file: "/posts/post1.txt",
    imgfile: "/posts/images/post1.jpg"
  },
];

export default function PersonalBlog() {
  const [activePost, setActivePost] = useState(null);
  const [postContent, setPostContent] = useState("");
  const [snippets, setSnippets] = useState({});

  // Fetch snippets on mount
  useEffect(() => {
    posts.forEach(async (post) => {
      try {
        const res = await fetch(post.file);
        const text = await res.text();
        const snippet = text.length > 150 ? text.slice(0, 60) + "..." : text;
        setSnippets((prev) => ({ ...prev, [post.id]: snippet }));
      } catch (err) {
        console.error("Error fetching snippet:", err);
      }
    });
  }, []);

  const openPost = async (post) => {
    try {
      const response = await fetch(post.file);
      const text = await response.text();
      setPostContent(text);
      setActivePost(post);
    } catch (err) {
      console.error("Error loading post:", err);
      setPostContent("Failed to load content.");
      setActivePost(post);
    }
  };

  const closePost = () => {
    setActivePost(null);
    setPostContent("");
  };

  if (activePost) {
    return (
      <div className="page blog-post">
        <h1>{activePost.title}</h1>
        <small>{activePost.date}</small>
        <img src={activePost.imgfile} alt={activePost.title} className="blog-post-image" />
        <p style={{ whiteSpace: "pre-wrap" }}>{postContent}</p>
        <button className="nav-btn" onClick={closePost}>
          Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="main-content" style={{ display: "flex", flexDirection: "column", gap: "1.5rem", marginTop: "1.5rem" }}>
        {posts.map((post) => (
          <div
            onClick={() => openPost(post)}
            key={post.id}
            className="page blog-post-card"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow = "0 0 25px rgba(115, 75, 255, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 0 15px rgba(90, 60, 200, 0.35)";
            }}
          >
            <h3 style={{ marginBottom: "0.3rem" }}>{post.title}</h3>
            <small className="quote" style={{ marginBottom: "0.5rem", display: "block" }}>
              {post.date}
            </small>
            <p>{snippets[post.id] || "Loading snippet..."}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
