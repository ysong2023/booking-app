'use client';

import React, { useEffect, useState } from 'react';

const PixelRestaurant = () => {
  const [frame, setFrame] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setFrame(prevFrame => (prevFrame + 1) % 4);
    }, 400);
    
    return () => clearInterval(timer);
  }, []);

  // Rainbow text for restaurant sign
  const rainbowText = (text: string) => {
    const neonColors = [
      'var(--neon-pink)',
      'var(--neon-blue)',
      'var(--neon-yellow)',
      'var(--neon-green)',
      'var(--neon-purple)',
      'var(--neon-orange)'
    ];
    
    return text.split('').map((char: string, index: number) => {
      const colorIndex = index % 6;
      const color = neonColors[colorIndex];
      
      return (
        <span 
          key={index} 
          className={`neon-char neon-char-${colorIndex}`}
          style={{
            color: color,
            textShadow: `0 0 5px ${color}, 0 0 10px ${color}`,
            animationDelay: `${index * 0.1}s`
          }}
        >
          {char}
        </span>
      );
    });
  };

  // Fixed size animation frame
  const renderCurrentFrame = () => {
    // Using a div with fixed height instead of pre tag
    return (
      <div className="fixed-frame">
        {/* Simple restaurant animation that changes only small parts */}
        <div className="restaurant-building">
          <div className="restaurant-roof">╔══════════════════════════════════════╗</div>
          <div className="restaurant-wall">║  ┌─────────────────────────────┐    ║</div>
          <div className="restaurant-wall">║  │   CYBER RESTAURANT          │    ║</div>
          <div className="restaurant-wall">║  │                             │    ║</div>
          <div className="restaurant-sign">║  │   {frame % 2 === 0 ? '█▀█ █▀▀ █▀ █▀█ █▀█ █▀█' : '█▀▄ █▀▀ █▀ █▀█ █▀█ █▀█'}   │    ║</div>
          <div className="restaurant-sign">║  │   {frame % 2 === 0 ? '█▀▄ █▀▀ ▄█ █▀█ █▀▄ █▀█' : '█ █ █▀▀ ▄█ █▀█ █▀▄ █▀█'}   │    ║</div>
          <div className="restaurant-wall">║  │                             │    ║</div>
          <div className="restaurant-wall">║  └─────────────────────────────┘    ║</div>
          <div className="restaurant-wall">║                                     ║</div>
          <div className="restaurant-wall">║                                     ║</div>
          <div className="restaurant-door">║       ┏━━━━━━━━━━━━━━━━━━┓          ║</div>
          <div className="restaurant-door">║       ┃ // {frame % 2 === 0 ? '⚡ OPEN ⚡' : '✨ OPEN ✨'} // ┃          ║</div>
          <div className="restaurant-door">║       ┗━━━━━━━━━━━━━━━━━━┛          ║</div>
          <div className="restaurant-wall">║                                     ║</div>
          <div className="restaurant-wall">╚═════════════════════════════════════╝</div>
        </div>
        
        {/* Cat animation that changes position */}
        <div className="cat-animation" style={{ position: 'absolute', bottom: '30px', left: `${150 + (frame * 20)}px` }}>
          {frame === 0 && <div className="cat">='█'= "._.="</div>}
          {frame === 1 && <div className="cat">='█'= /ᐠ｡ꞈ｡ᐟ\</div>}
          {frame === 2 && <div className="cat">=(^._.^)= ∥  ∥</div>}
          {frame === 3 && <div className="cat">(=TωT=) (  つ</div>}
        </div>
        
        {/* Rain drops */}
        <div className="rain-drops">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i} 
              className="rain-drop"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                opacity: frame % 2 === 0 ? 0.8 : 0.5
              }}
            >
              |
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="pixel-restaurant">
      <div className="neon-sign">
        <h3 className="neon-text">{rainbowText("CYBER RESTAURANT")}</h3>
      </div>
      <div className="rain-container">
        {renderCurrentFrame()}
      </div>
      <div className="restaurant-message">
        <div className="fixed-text mb-2">
          &gt; TRY: "I WOULD LIKE TO RESERVE A TABLE FOR 4 PEOPLE AT 7PM"
        </div>
        <div className="fixed-text">
          &gt; OR: "WHAT TABLES ARE AVAILABLE THIS WEEKEND?"
        </div>
      </div>
    </div>
  );
};

export default PixelRestaurant; 