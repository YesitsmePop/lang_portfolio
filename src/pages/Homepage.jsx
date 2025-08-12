import React, { useEffect, useState } from "react";
import "./stickers.css"; 

const stickers = [
  {id: 1, src: "/sticker3.JPG", alt: "Sticker 1"},
  {id: 2, src: "/sticker2.JPG", alt: "Sticker 2"},
//  {id: 3, src: "/sticker3.JPG", alt: "Sticker 3"}
];

export default function Homepage() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showStickers, setShowStickers] = useState(false);

  useEffect(() => {
    // Delay the sticker reveal for cool effect
    const timeout = setTimeout(() => setShowStickers(true), 300);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="page homepage-container">

      <div>
        <h1 className="main-title">Morgan McDonald</h1>
      </div>

      <p className="quote">
        "Who controls the past controls the future. Who controls the present controls the past."
      </p>
      <p>-George Orwell (Eric Arthur Blair), 1984</p>

      <div className={`stickerbook ${showStickers ? "show" : ""}`}>
        {stickers.map(({ id, src, alt }) => (
          <img key={id} src={src} alt={alt} className={`sticker sticker-${id}`} />
        ))}
      </div>
    </div>
  );
}
