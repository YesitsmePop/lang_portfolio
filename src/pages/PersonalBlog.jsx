import React, { useState, useEffect } from "react";

const posts = [
  {
    id: 1,
    title: "Is Testing Turning Data?",
    date: "August 13 2025",
    file: "/posts/post1.txt",
    imgfile: "/posts/images/post1.jpg"
  },
  {
    id: 2,
    title: "My Perspective on the World",
    date: "August 27 2025",
    file: "/posts/post2.txt",
    imgfile: "/posts/images/post2.jpg"
  },
  {
    id: 3,
    title: "Approaches on Change",
    date: "September 10 2025",
    file: "/posts/post3.txt",
    imgfile: "/posts/images/post3.jpg"
  },
  {
    id: 4,
    title: "In Response to \"Be Cool to the Pizza Dude\"",
    date: "October 15 2025",
    file: "/posts/post4.txt",
    imgfile: "/posts/images/post4.jpg"
  }
].sort((a, b) => new Date(b.date) - new Date(a.date));


export default function PersonalBlog() {
  const [activePost, setActivePost] = useState(null);
  const [postContent, setPostContent] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [snippets, setSnippets] = useState({});

  // Fetch snippets for all posts on mount
  useEffect(() => {
    posts.forEach(async (post) => {
      try {
        const res = await fetch(post.file);
        const text = await res.text();
        const snippet = text.length > 150 ? text.slice(0, 150) + "..." : text;
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

      // Count words: split on whitespace and filter out empty strings
      const words = text.trim().split(/\s+/).filter(Boolean);
      setWordCount(words.length);

      setActivePost(post);
    } catch (err) {
      console.error("Error loading post:", err);
      setPostContent("Failed to load content.");
      setWordCount(0);
      setActivePost(post);
    }
  };

  const closePost = () => {
    setActivePost(null);
    setPostContent("");
    setWordCount(0);
  };

  if (activePost) {
    return (
      <div className="page blog-post">
        <h1>{activePost.title}</h1>
        <small>{activePost.date}</small>
        <img src={activePost.imgfile} alt={activePost.title} style={{ width: "100%", maxHeight: "400px", objectFit: "cover", marginBottom: "1rem" }} />
        <p style={{ whiteSpace: "pre-wrap", marginTop: "1rem"}}>{postContent}</p>
        <div style={{ marginTop: "1rem", fontStyle: "italic" }}>
          Total words: {wordCount}
        </div>
        <button className="nav-btn" style={{marginTop: "1rem" }} onClick={closePost}>
          Back to Blog List
        </button>
      </div>
    );
  }

  return (
    <div className="page">

      <h1>Personal Blog</h1>

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
