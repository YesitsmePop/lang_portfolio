import React, { useEffect, useState } from "react";
import sticker1 from "../assets/images/sticker1.jpg";
import sticker2 from "../assets/images/sticker2.jpg";
import sticker3 from "../assets/images/sticker3.jpg";
import "./stickers.css"; 

const stickers = [
  { id: 1, src: sticker1, alt: "Sticker 1" },
  { id: 2, src: sticker2, alt: "Sticker 2" },
  { id: 3, src: sticker3, alt: "Sticker 3" },
];

export default function Homepage() {
  const [showStickers, setShowStickers] = useState(false);

  useEffect(() => {
    // Delay the sticker reveal for cool effect
    const timeout = setTimeout(() => setShowStickers(true), 300);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="page homepage-container">

      <div className={`stickerbook ${showStickers ? "show" : ""}`}>
        {stickers.map(({ id, src, alt }) => (
          <img key={id} src={src} alt={alt} className={`sticker sticker-${id}`} />
        ))}
      </div>

      <p className="quote">
        "Who controls the past controls the future. Who controls the present controls the past."
      </p>
      <p>-George Orwell, 1984</p>
    </div>
  );
}
