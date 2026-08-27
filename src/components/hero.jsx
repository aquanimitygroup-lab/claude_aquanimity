import React, { useEffect, useRef, useState } from 'react';

// Arrow icon component (built-in)
const Arrow = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 12H19M19 12L13 6M19 12L13 18"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Custom hook for reveal animation (built-in)
const useReveal = () => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
            }
          });
        },
        { threshold: 0.1 }
      );

      const reveals = ref.current.querySelectorAll(".reveal");
      reveals.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }
  }, []);

  return ref;
};

// Typewriter effect hook (built-in)
const useTypewriter = (phrases, options = {}) => {
  const {
    typeSpeed = 45,
    eraseSpeed = 24,
    hold = 1400,
    gap = 260
  } = options;

  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentPhrase = phrases[phraseIndex % phrases.length];

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText(prev => prev.slice(0, -1));
        if (displayText === "") {
          setIsDeleting(false);
          setPhraseIndex(prev => prev + 1);
        }
      }, eraseSpeed);
    } else {
      timer = setTimeout(() => {
        setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        if (displayText === currentPhrase) {
          timer = setTimeout(() => setIsDeleting(true), hold);
        }
      }, typeSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex, phrases, typeSpeed, eraseSpeed, hold]);

  return displayText;
};

// Slow Title Typewriter hook for "Engineering\nlife. For humanity." - WITHOUT BLINKING CURSOR
const useSlowTitleTypewriter = () => {
  const fullText = "Engineering\nlife. For humanity.";
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    let index = 0;
    let timer;
    
    const typeNextChar = () => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
        timer = setTimeout(typeNextChar, 85);
      } else {
        setIsTyping(false);
        setShowCursor(false);
      }
    };
    
    const startTimer = setTimeout(() => {
      typeNextChar();
    }, 300);
    
    return () => {
      clearTimeout(startTimer);
      clearTimeout(timer);
    };
  }, []);

  return { displayText, isTyping, showCursor };
};

function Hero({ palette, onGoto }) {
  const ref = useReveal();
  const videoRef = useRef(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const phrases = [
    "Health Sciences",
    "Plastic Remediation",
    "Novel Delivery Systems",
    "Frontier AI in Biology",
    "Biomaterials"
  ];

  const typed = useTypewriter(phrases, {
    typeSpeed: 45,
    eraseSpeed: 24,
    hold: 1400,
    gap: 260
  });

  const { displayText, showCursor } = useSlowTitleTypewriter();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration - video.currentTime < 0.15) {
        video.currentTime = 0;
      }
    };

    const handleCanPlay = () => {
      setIsVideoReady(true);
      video.play().catch(e => console.log("Video autoplay failed:", e));
    };

    const handleEnded = () => {
      video.currentTime = 0;
      video.play().catch(e => console.log("Video replay failed:", e));
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    video.play().catch(e => console.log("Video autoplay failed:", e));

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const handleVentureClick = (e) => {
    e.preventDefault();
    
    window.dispatchEvent(new CustomEvent('aq-route', { detail: 'home' }));
    
    setTimeout(() => {
      const venturesSection = document.getElementById('ventures');
      if (venturesSection) {
        venturesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        const venturesElement = document.querySelector('#ventures');
        if (venturesElement) {
          venturesElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          if (onGoto) onGoto('ventures-list');
        }
      }
    }, 150);
  };

  const handlePartnerClick = (e) => {
    e.preventDefault();
    if (onGoto) onGoto('contact');
  };

  const renderTitle = () => {
    const lines = displayText.split('\n');
    
    return (
      <>
        {lines.map((line, lineIndex) => (
          <React.Fragment key={lineIndex}>
            {lineIndex === 0 && <span className="engineering-life">{line}</span>}
            {lineIndex === 1 && (
              <>
                <br />
                {line.includes('life.') ? (
                  <>
                    <span className="engineering-life">{line.split('life.')[0]}</span>
                    <span className="engineering-life">life.</span>
                    <span className="hero-for">
                      {line.split('life.')[1] || ''}
                    </span>
                  </>
                ) : (
                  <span className="engineering-life">{line}</span>
                )}
              </>
            )}
            {lineIndex > 1 && <><br /><span className="engineering-life">{line}</span></>}
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <section ref={ref} id="home" className="hero-section">

      {/* VIDEO BACKGROUND */}
      <div className="hero-video-background">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline
          preload="auto"
          style={{
            opacity: isVideoReady ? 1 : 0.5,
            transition: 'opacity 0.5s ease'
          }}
        >
          <source 
            src="/images/video1.mp4" 
            type="video/mp4" 
          />
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className="hero-container">

        {/* LEFT */}
        <div className="hero-left">

          <div className="hero-top reveal">
            <span className="hero-line"></span>
            <span className="hero-mini">
              An Integrated Bioinnovation Enterprise
            </span>
          </div>

          {/* SLOW TYPEWRITER TITLE */}
          <h1 className="hero-title reveal">
            {renderTitle()}
          </h1>

          <div className="hero-build reveal">
            <span className="hero-build-label">
              <i style={{ 
                fontFamily: 'Georgia, serif', 
                fontSize: '14px', 
                letterSpacing: '0.07em', 
                color: 'rgb(45, 144, 161)', 
                fontWeight: 600, 
                lineHeight: 1.4, 
                whiteSpace: 'nowrap',
                fontStyle: 'italic'
              }}>
                Advancing bioinnovations in
              </i>
            </span>
            <span className="hero-build-arrow">→</span>
            <span className="hero-build-text">
              {typed}
              <span className="cursor"></span>
            </span>
          </div>

          <p className="hero-desc reveal">
            <span className="highlight">Aquanimity</span> is building the BioHub— <span className="normal-text">uniting institutes, scientists, academia, and strategic partners to </span><span className="highlight">discover, translate, and commercialize novel biosciences for Bangladesh and beyond.</span>
          </p>

          <div className="hero-buttons reveal">
            <button className="btn-dark" onClick={handleVentureClick}>
              Explore Our SuperWater
              <Arrow size={13} />
            </button>
            <button className="btn-light" onClick={handlePartnerClick}>
              Partner with us
              <Arrow size={13} />
            </button>
          </div>

          <div className="metrics reveal">
            <div className="metric">
              <h3 className="metric-number">4</h3>
              <p>INSTITUTES</p>
            </div>
            <div className="metric">
              <h3 className="metric-number">4</h3>
              <p>VENTURES</p>
            </div>
          </div>

        </div>

        {/* RIGHT - Empty area (hidden on mobile via CSS) */}
        <div className="hero-right reveal">
        </div>

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@300;400;500;600;700;800;900&display=swap');

        :root {
          --bg: #ece8df;
          --text: #07152b;
          --muted: #7a8496;
          --line: rgba(7,21,43,0.08);
          --accent: #0d1d33;
          --cyan: #2d90a1;
        }

        * {
          font-family: 'Red Hat Display', 'Red Hat Display Variable', sans-serif;
        }

        /* ===== DESKTOP: compact, no wasted vertical space ===== */
        .hero-section {
          position: relative;
          width: 100%;
          min-height: auto;
          background: var(--bg);
          display: flex;
          align-items: center;
          overflow-x: hidden;
        }

        /* VIDEO BACKGROUND */
        .hero-video-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          overflow: hidden;
        }

        .hero-video-background video {
          position: absolute;
          top: 50%;
          left: 50%;
          min-width: 100%;
          min-height: 100%;
          width: auto;
          height: auto;
          transform: translate(-50%, -50%);
          object-fit: cover;
          filter: brightness(1.05) contrast(1.02) saturate(1.1);
        }

        .video-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(236, 232, 223, 0.75);
          z-index: 1;
        }

        /* MAIN CONTENT — tighter desktop padding & gap */
        .hero-container {
          position: relative;
          z-index: 2;
          width: min(1280px, 90%);
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 0.5fr;
          align-items: center;
          gap: 32px;
          padding: 72px 0 56px;
        }

        /* LEFT */
        .hero-left {
          max-width: 620px;
        }

        .hero-top {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .hero-line {
          width: 24px;
          height: 1px;
          background: var(--text);
        }

        .hero-mini {
          font-family: "Red Hat Display", sans-serif;
          font-size: 10px;
          letter-spacing: 0.06em;
          color: #0E1136;
          font-weight: 600;
          text-transform: uppercase;
        }

        /* Title — no fixed min-height on desktop */
        .hero-title {
          font-size: clamp(40px, 6vw, 72px);
          line-height: 1.15;
          letter-spacing: -0.03em;
          color: var(--text);
          margin: 0;
          font-weight: 600;
          min-height: auto;
          position: relative;
          white-space: pre-wrap;
        }

        .engineering-life {
          font-family: 'Red Hat Display', sans-serif;
          font-weight: 900;
          color: #0E1136;
        }

        .hero-for {
          font-family: Georgia, serif;
          font-style: italic;
          font-weight: 400;
          color: var(--cyan);
          margin: 0 0 0 8px;
        }

        .normal-text {
          font-family: 'Red Hat Display', sans-serif;
          font-style: normal;
          font-weight: 400;
        }

        .metric-number {
          font-family: 'Red Hat Display', sans-serif;
          font-weight: 900;
          color: #0E1136;
          font-size: clamp(28px, 3vw, 36px);
          margin: 0;
          line-height: 1;
        }

        .hero-build {
          margin-top: 14px;
          display: flex;
          align-items: center;
          gap: 5px;
          flex-wrap: wrap;
        }

        .hero-build-arrow {
          font-size: 16px;
          color: var(--text);
          font-weight: 500;
          line-height: 1.4;
          margin: 0;
          display: inline-flex;
          align-items: center;
        }

        .hero-build-text {
          font-size: 16px;
          color: #0E1136;
          font-weight: 500;
          min-height: 28px;
          line-height: 1.4;
          display: inline-flex;
          align-items: center;
        }

        .cursor {
          display: inline-block;
          width: 2px;
          height: 1em;
          background: var(--text);
          margin-left: 2px;
          vertical-align: middle;
          animation: blink 1s step-end infinite;
        }

        .hero-desc {
          margin-top: 14px;
          font-size: 15px;
          line-height: 1.5;
          color: #0E1136;
          max-width: 520px;
        }

        .highlight {
          font-weight: 700;
          color: var(--text);
        }

        .hero-buttons {
          margin-top: 22px;
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .btn-dark {
          border: none;
          background: #0E1136;
          color: white;
          padding: 12px 24px;
          border-radius: 40px;
          font-size: 13px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-dark:hover {
          transform: translateY(-2px);
          background: #0d2442;
        }

        .btn-light {
          border: 1px solid rgb(14,17,54);
          background: transparent;
          color: #0E1136;
          padding: 12px 24px;
          border-radius: 40px;
          font-size: 13px;
          font-weight: 500;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-light:hover {
          background: rgba(7,21,43,0.04);
          border-color: rgba(7,21,43,0.4);
        }

        .metrics {
          margin-top: 28px;
          padding-top: 18px;
          border-top: 1px solid var(--line);
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .metric p {
          margin: 8px 0 0;
          font-size: 8px;
          letter-spacing: 0.3em;
          color: #0E1136;
          font-weight: 600;
        }

        .hero-right {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 200px;
        }

        .reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease;
        }

        .reveal.in {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        /* ===== TABLET (≤980px) ===== */
        @media (max-width: 980px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 0;
            padding: 80px 0;
          }

          .hero-left {
            max-width: 100%;
          }

          .hero-title {
            font-size: clamp(36px, 8vw, 64px);
            min-height: auto;
          }

          .hero-desc {
            font-size: 14px;
            max-width: 100%;
          }

          .metrics {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          
          .hero-right {
            display: none;
          }
        }

        /* ===== MOBILE (≤640px) — unchanged ===== */
        @media (max-width: 640px) {

          .hero-section {
            min-height: auto;
            align-items: flex-start;
          }

          .hero-container {
            width: 88%;
            padding: 90px 0 48px;
            gap: 0;
          }

          .hero-top {
            margin-bottom: 16px;
          }

          .hero-title {
            font-size: clamp(32px, 9vw, 44px);
            line-height: 1.15;
            min-height: auto;
          }

          .hero-for {
            margin-left: 4px;
          }

          .hero-build {
            margin-top: 16px;
            gap: 4px;
          }

          .hero-build-label i {
            font-size: 12px !important;
          }

          .hero-build-text {
            font-size: 13px;
            min-height: 24px;
          }

          .hero-build-arrow {
            font-size: 13px;
          }

          .hero-desc {
            margin-top: 16px;
            font-size: 13px;
            line-height: 1.55;
            max-width: 100%;
          }

          .hero-buttons {
            margin-top: 24px;
            gap: 10px;
          }

          .btn-dark, .btn-light {
            padding: 10px 20px;
            font-size: 12px;
          }

          .metrics {
            margin-top: 32px;
            padding-top: 20px;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }

          .metric-number {
            font-size: 28px;
          }

          .metric p {
            font-size: 7px;
            letter-spacing: 0.25em;
          }
        }

        /* ===== VERY SMALL PHONES (≤380px) — unchanged ===== */
        @media (max-width: 380px) {
          .hero-container {
            width: 90%;
            padding: 80px 0 40px;
          }

          .hero-title {
            font-size: 28px;
          }

          .hero-desc {
            font-size: 12.5px;
          }

          .btn-dark, .btn-light {
            padding: 9px 16px;
            font-size: 11.5px;
          }
        }
      `}</style>

    </section>
  );
}

export default Hero;