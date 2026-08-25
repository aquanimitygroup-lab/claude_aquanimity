import React, { useState, useEffect, useRef } from 'react';

// Arrow icon component
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

// Custom hook for reveal animation
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

function Institutes({ palette, onOpen }) {
  const ref = useReveal();
  const [hover, setHover] = useState(null);
  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Background images for all institutes
  const healthSciencesBgImage = "images/health3.jpg";
  const bioengineeringBgImage = "images/bio.jpg";
  const computationalBgImage = "images/com.jpg";
  const molecularBgImage = "images/omics.jpg";

  // Fallback images
  const fallbackImage = "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800&h=600&fit=crop";

  // 4 institutes
  const items = [
    {
      n: "01",
      tag: "HEALTH SCIENCES",
      title: "Institute of Health Sciences",
      shortBlurb: "Advancing metabolic health, precision nutrition, functional formulations, and clinical validation for better outcomes.",
      blurb: "Advancing human health through cutting-edge biomedical research, clinical innovation, and translational medicine for better patient outcomes.",
      fullDescription: "The Institute of Health Science focuses on revolutionary healthcare solutions, from drug discovery to personalized medicine. Our research spans cardiology, neurology, oncology, and infectious diseases, working closely with hospitals and research centers worldwide to translate scientific breakthroughs into tangible patient benefits.",
      keyHighlights: [
        "Clinical Research & Trials",
        "Drug Discovery & Development",
        "Personalized Medicine",
        "Global Health Initiatives"
      ],
      backgroundImage: healthSciencesBgImage,
      hoverColor: "#0E525C",
      color: "#5FAFBE"
    },
    {
      n: "02",
      tag: "BIOENGINEERING",
      title: "Institute of Applied Bioengineering & Materials Science",
      shortBlurb: "Engineering delivery systems, biomaterials, and vaccines for real-world impact and scalable solutions.",
      blurb: "Engineering the future of biomaterials, tissue engineering, and advanced bio-manufacturing for medical and industrial applications.",
      fullDescription: "This institute pioneers the intersection of biology and engineering, developing smart biomaterials, 3D bioprinted tissues, and sustainable bio-based materials. Our work enables breakthroughs in regenerative medicine, implantable devices, and eco-friendly manufacturing processes that transform healthcare and industry.",
      keyHighlights: [
        "Tissue Engineering",
        "Smart Biomaterials",
        "3D Bioprinting",
        "Bio-manufacturing"
      ],
      backgroundImage: bioengineeringBgImage,
      hoverColor: "#3A828E",
      color: "#3A7A8A"
    },
    {
      n: "03",
      tag: "OMICS & MICROBIOLOGY",
      title: "Institute of Omics & Molecular Microbiology",
      shortBlurb: "Exploring genomes, microbes, and molecular pathways to discover solutions for health, agriculture, and the environment.",
      blurb: "Harnessing AI, machine learning, and big data to decode biological complexity and accelerate scientific discovery.",
      fullDescription: "Our computational hub combines high-performance computing, AI algorithms, and bioinformatics to solve complex biological problems. From genomic analysis to protein structure prediction, we're transforming raw data into actionable biological insights that drive innovation in drug discovery, personalized medicine, and systems biology.",
      keyHighlights: [
        "AI in Biology",
        "Genomic Data Analysis",
        "Protein Structure Prediction",
        "Systems Biology"
      ],
      backgroundImage: molecularBgImage,
      hoverColor: "#B56E00",
      color: "#7EC8E3"
    },
    {
      n: "04",
      tag: "COMPUTATIONAL BIO & AI",
      title: "Institute of Computational Biology & AI",
      shortBlurb: "Harnessing AI, machine learning, and high-performance computing to accelerate biological discovery and innovation.",
      blurb: "Exploring the molecular machinery of life through genomics, proteomics, and cutting-edge omics technologies.",
      fullDescription: "At the forefront of molecular discovery, our institute unravels the fundamental mechanisms governing cellular function. We leverage advanced sequencing technologies, mass spectrometry, and multi-omics integration to understand disease mechanisms, identify novel therapeutic targets, and advance precision medicine initiatives.",
      keyHighlights: [
        "Genomics & Epigenomics",
        "Proteomics & Metabolomics",
        "Single Cell Analysis",
        "Molecular Diagnostics"
      ],
      backgroundImage: computationalBgImage,
      hoverColor: "#5F47E0",
      color: "#2C3E7A"
    }
  ];

  // Navigation functions
  const goToPrevious = (e) => {
    e.stopPropagation();
    setMobileActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToNext = (e) => {
    e.stopPropagation();
    setMobileActiveIndex((prev) => (prev + 1) % items.length);
  };

  const handleViewAllClick = (e) => {
    e.preventDefault();
    if (onOpen) {
      onOpen('institutes-list');
    }
  };

  const handleInstituteClick = (e, institute) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedInstitute(institute);
    if (onOpen) {
      onOpen('institute:' + institute.n);
    }
  };

  const handleCloseModal = () => {
    setSelectedInstitute(null);
  };

  const handleImageError = (e) => {
    e.target.src = fallbackImage;
  };

  // Function to split title into two lines
  const splitTitleIntoTwoLines = (title) => {
    if (title === "Institute of Health Sciences") {
      return ["Institute of", "Health Sciences"];
    }
    if (title === "Institute of Applied Bioengineering & Materials Science") {
      return ["Institute of Applied", "Bioengineering & Materials Science"];
    }
    if (title === "Institute of Omics & Molecular Microbiology") {
      return ["Institute of Omics &", "Molecular Microbiology"];
    }
    if (title === "Institute of Computational Biology & AI") {
      return ["Institute of Computational", "Biology & AI"];
    }
    const words = title.split(' ');
    const midPoint = Math.ceil(words.length / 2);
    const firstLine = words.slice(0, midPoint).join(' ');
    const secondLine = words.slice(midPoint).join(' ');
    return [firstLine, secondLine];
  };

  // Handle touch events for swipe
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      // Swipe left - next
      setMobileActiveIndex((prev) => (prev + 1) % items.length);
    } else if (touchEndX - touchStartX > 50) {
      // Swipe right - previous
      setMobileActiveIndex((prev) => (prev - 1 + items.length) % items.length);
    }
    setTouchStartX(0);
    setTouchEndX(0);
  };

  // Render mobile version with swipeable gallery
  const renderMobileView = () => {
    const activeInstitute = items[mobileActiveIndex];
    const titleLines = splitTitleIntoTwoLines(activeInstitute.title);

    return (
      <div className="mobile-institutes">
        {/* Dot Indicators */}
        <div className="mobile-dots">
          {items.map((_, index) => (
            <button
              key={index}
              className={`mobile-dot ${mobileActiveIndex === index ? 'active' : ''}`}
              onClick={() => setMobileActiveIndex(index)}
              style={{
                background: mobileActiveIndex === index ? '#1F6E7A' : 'rgba(31,110,122,0.2)'
              }}
            />
          ))}
        </div>

        {/* Active Institute Card with Swipe */}
        <div 
          className="mobile-card-wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button
            onClick={(e) => handleInstituteClick(e, activeInstitute)}
            className="institute-card mobile-card"
            style={{
              position: "relative",
              background: "#ece8df",
              border: "none",
              borderRadius: 'clamp(16px, 2vw, 24px)',
              padding: 'clamp(20px, 3vw, 28px) clamp(16px, 2.5vw, 24px)',
              minHeight: 'clamp(280px, 45vh, 380px)',
              textAlign: "left",
              cursor: "pointer",
              overflow: "hidden",
              transition: "all 0.35s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: '100%',
              boxSizing: 'border-box',
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation'
            }}
          >
            {/* Background Image */}
            <img
              src={activeInstitute.backgroundImage}
              alt=""
              className="card-bg-image"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 0,
              }}
              onError={handleImageError}
              loading="lazy"
            />
            
            {/* Color Overlay with gradient */}
            <div
              className="card-overlay"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "linear-gradient(90deg, #01B6D3, #0D1136)",
                opacity: 0.85,
                zIndex: 1,
              }}
            />

            {/* Content */}
            <div style={{ position: "relative", zIndex: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 'clamp(12px, 2vw, 20px)'
                }}
              >
                <span
                  className="card-number"
                  style={{
                    fontSize: 'clamp(28px, 4vw, 36px)',
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    color: "#ffffff",
                    opacity: 0.95,
                    fontFamily: "'Red Hat Display', sans-serif",
                    textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                  }}
                >
                  {activeInstitute.n}
                </span>
                <span
                  style={{
                    fontSize: 'clamp(11px, 1.5vw, 13px)',
                    color: 'rgba(255,255,255,0.5)',
                    fontWeight: 500,
                    fontFamily: "'Red Hat Display', sans-serif"
                  }}
                >
                  {mobileActiveIndex + 1} / {items.length}
                </span>
              </div>

              <div
                className="card-tag"
                style={{
                  fontSize: 'clamp(11px, 1.5vw, 13px)',
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#FFE0A3",
                  marginBottom: 'clamp(8px, 1vw, 12px)',
                  fontWeight: 700,
                  fontFamily: "'Red Hat Display', sans-serif",
                  textShadow: "0 1px 1px rgba(0,0,0,0.2)",
                }}
              >
                {activeInstitute.tag}
              </div>

              <div style={{ marginBottom: 'clamp(8px, 1.5vw, 12px)' }}>
                <h3
                  className="card-title"
                  style={{
                    fontSize: 'clamp(20px, 3vw, 28px)',
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                    fontWeight: 700,
                    color: "#ffffff",
                    margin: 0,
                    fontFamily: "'Red Hat Display', sans-serif",
                    textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                  }}
                >
                  {titleLines[0]}
                </h3>
                <h3
                  className="card-title"
                  style={{
                    fontSize: 'clamp(20px, 3vw, 28px)',
                    lineHeight: 1.2,
                    letterSpacing: "-0.02em",
                    fontWeight: 700,
                    color: "#ffffff",
                    margin: 0,
                    fontFamily: "'Red Hat Display', sans-serif",
                    textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                  }}
                >
                  {titleLines[1]}
                </h3>
              </div>

              <p
                className="card-blurb"
                style={{
                  fontSize: 'clamp(14px, 1.8vw, 17px)',
                  lineHeight: 1.5,
                  color: "rgba(255,255,255,0.95)",
                  margin: 0,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontWeight: 400,
                  textShadow: "0 1px 1px rgba(0,0,0,0.2)",
                  flex: 1
                }}
              >
                {activeInstitute.shortBlurb}
              </p>
            </div>

            <div
              className="card-footer"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 'clamp(14px, 2vw, 24px)',
                position: "relative",
                zIndex: 2,
              }}
            >
              <span
                className="card-learn-text"
                style={{
                  fontSize: 'clamp(14px, 1.8vw, 16px)',
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.9)",
                  fontFamily: "'Red Hat Display', sans-serif",
                  textShadow: "0 1px 1px rgba(0,0,0,0.2)",
                }}
              >
                Learn more
              </span>
              <span
                className="card-arrow"
                style={{
                  width: 'clamp(36px, 4.5vw, 44px)',
                  height: 'clamp(36px, 4.5vw, 44px)',
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(4px)",
                  WebkitBackdropFilter: "blur(4px)",
                  flexShrink: 0
                }}
              >
                <Arrow size={18} />
              </span>
            </div>

            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 'clamp(16px, 2vw, 24px)',
                border: "1px solid rgba(255,255,255,0.2)",
                pointerEvents: "none",
                zIndex: 3,
              }}
            />



            {/* Swipe hint - Clickable right arrow */}
            <button
              onClick={goToNext}
              style={{
                position: "absolute",
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 4,
                background: 'rgba(0,0,0,0.3)',
                border: 'none',
                borderRadius: '50%',
                width: 'clamp(36px, 4vw, 44px)',
                height: 'clamp(36px, 4vw, 44px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'white',
                fontSize: 'clamp(20px, 2.5vw, 28px)',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                padding: 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(0,0,0,0.5)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(0,0,0,0.3)';
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
              onTouchStart={(e) => {
                e.stopPropagation();
                e.currentTarget.style.background = 'rgba(0,0,0,0.6)';
              }}
              onTouchEnd={(e) => {
                e.stopPropagation();
                e.currentTarget.style.background = 'rgba(0,0,0,0.3)';
              }}
            >
              ›
            </button>
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <section
        ref={ref}
        id="institutes"
        style={{
          paddingTop: 'clamp(36px, 8vw, 80px)',
          paddingBottom: 'clamp(36px, 8vw, 80px)',
          background: "#FAF7F0",
          fontFamily: "'Red Hat Display', 'Red Hat Display Variable', sans-serif",
          overflow: 'hidden'
        }}
      >
        <div
          className="wrap"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 clamp(16px, 4vw, 32px)"
          }}
        >
          {/* Header */}
          <div
            className="reveal institutes-header"
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 'clamp(16px, 3vw, 24px)',
              marginBottom: 'clamp(24px, 6vw, 48px)'
            }}
          >
            <div className="institutes-header-left" style={{ flex: 1, minWidth: '200px' }}>
              <div
                className="label"
                style={{
                  marginBottom: 14,
                  fontSize: 'clamp(10px, 1.2vw, 11px)',
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--accent, #1F6E7A)",
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontWeight: 600
                }}
              >
                § 01 — Our Institutes
              </div>

              <h2
                className="institutes-title"
                style={{
                  fontSize: 'clamp(24px, 4.5vw, 56px)',
                  lineHeight: 1.08,
                  letterSpacing: '-0.025em',
                  maxWidth: 700,
                  fontWeight: 900,
                  margin: 0,
                  color: "#000000",
                  fontFamily: "'Red Hat Display', sans-serif"
                }}
              >
                <span style={{ fontWeight: 900, color: "#0E1136" }}>Four</span>{" "}
                <span
                  className="serif"
                  style={{
                    fontStyle: 'italic',
                    color: 'var(--accent, #1F6E7A)',
                    fontWeight: 400,
                    fontFamily: "'Times New Roman', Georgia, serif"
                  }}
                >
                  cross-disciplinary
                </span>{" "}
                <span style={{ fontWeight: 900, color: "#181A43" }}>institutes.</span>
              </h2>
            </div>

            <button
              onClick={handleViewAllClick}
              className="ulink view-all-btn"
              style={{
                fontWeight: 600,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: 'clamp(13px, 1.2vw, 14px)',
                fontFamily: "'Red Hat Display', sans-serif",
                color: 'var(--accent, #1F6E7A)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: 'clamp(8px, 1.5vw, 10px) clamp(16px, 2vw, 20px)',
                borderRadius: 40,
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap',
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(31,110,122,0.1)';
                e.currentTarget.style.gap = '12px';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'none';
                e.currentTarget.style.gap = '8px';
              }}
            >
              View all institutes <Arrow />
            </button>
          </div>

          {/* Mobile View - Swipeable Gallery */}
          {isMobile ? (
            <div className="reveal">{renderMobileView()}</div>
          ) : (
            /* Desktop Grid View */
            <div className="reveal institutes-grid">
              {items.map((it, i) => {
                const isHover = hover === i;
                const titleLines = splitTitleIntoTwoLines(it.title);

                return (
                  <button
                    key={it.n}
                    onClick={(e) => handleInstituteClick(e, it)}
                    onMouseEnter={() => setHover(i)}
                    onMouseLeave={() => setHover(null)}
                    onTouchStart={() => {
                      setHover(i);
                    }}
                    onTouchEnd={() => {
                      setTimeout(() => setHover(null), 300);
                    }}
                    className="institute-card"
                    style={{
                      position: "relative",
                      background: "#ece8df",
                      border: "none",
                      borderRadius: 'clamp(16px, 2vw, 24px)',
                      padding: 'clamp(16px, 3vw, 28px) clamp(14px, 2.5vw, 24px) clamp(14px, 2vw, 24px)',
                      minHeight: 'clamp(200px, 35vh, 360px)',
                      textAlign: "left",
                      cursor: "pointer",
                      overflow: "hidden",
                      transition: "all 0.35s cubic-bezier(0.2, 0.9, 0.4, 1.1)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      transform: isHover ? "translateY(-6px)" : "translateY(0)",
                      boxShadow: isHover
                        ? "0 20px 35px rgba(0,0,0,0.1)"
                        : "0 4px 12px rgba(0,0,0,0.04)",
                      fontFamily: "'Red Hat Display', sans-serif",
                      width: '100%',
                      boxSizing: 'border-box',
                      WebkitTapHighlightColor: 'transparent',
                      touchAction: 'manipulation'
                    }}
                  >
                    {/* Background Image */}
                    <img
                      src={it.backgroundImage}
                      alt=""
                      className="card-bg-image"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        zIndex: 0,
                      }}
                      onError={handleImageError}
                      loading="lazy"
                    />
                    
                    {/* Color Overlay with gradient */}
                    <div
                      className="card-overlay"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(90deg, #01B6D3, #0D1136)",
                        opacity: 0.85,
                        zIndex: 1,
                      }}
                    />

                    {/* Hover darker overlay */}
                    {isHover && (
                      <div
                        className="card-hover-overlay"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          background: "rgba(0,0,0,0.1)",
                          zIndex: 1,
                        }}
                      />
                    )}

                    {/* Content */}
                    <div style={{ position: "relative", zIndex: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: 'clamp(12px, 2vw, 20px)'
                        }}
                      >
                        <span
                          className="card-number"
                          style={{
                            fontSize: 'clamp(20px, 3.5vw, 32px)',
                            fontWeight: 800,
                            letterSpacing: "-0.03em",
                            color: "#ffffff",
                            opacity: 0.95,
                            fontFamily: "'Red Hat Display', sans-serif",
                            textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                          }}
                        >
                          {it.n}
                        </span>
                      </div>

                      <div
                        className="card-tag"
                        style={{
                          fontSize: 'clamp(8px, 1vw, 10px)',
                          letterSpacing: "0.15em",
                          textTransform: "uppercase",
                          color: "#FFE0A3",
                          marginBottom: 'clamp(6px, 1vw, 12px)',
                          fontWeight: 700,
                          fontFamily: "'Red Hat Display', sans-serif",
                          textShadow: "0 1px 1px rgba(0,0,0,0.2)",
                        }}
                      >
                        {it.tag}
                      </div>

                      <div style={{ marginBottom: 'clamp(8px, 1.5vw, 12px)' }}>
                        <h3
                          className="card-title"
                          style={{
                            fontSize: 'clamp(13px, 1.8vw, 18px)',
                            lineHeight: 1.3,
                            letterSpacing: "-0.02em",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: 0,
                            fontFamily: "'Red Hat Display', sans-serif",
                            textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                          }}
                        >
                          {titleLines[0]}
                        </h3>
                        <h3
                          className="card-title"
                          style={{
                            fontSize: 'clamp(13px, 1.8vw, 18px)',
                            lineHeight: 1.3,
                            letterSpacing: "-0.02em",
                            fontWeight: 700,
                            color: "#ffffff",
                            margin: 0,
                            fontFamily: "'Red Hat Display', sans-serif",
                            textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                          }}
                        >
                          {titleLines[1]}
                        </h3>
                      </div>

                      <p
                        className="card-blurb"
                        style={{
                          fontSize: 'clamp(10px, 1.2vw, 13px)',
                          lineHeight: 1.5,
                          color: "rgba(255,255,255,0.95)",
                          margin: 0,
                          display: '-webkit-box',
                          WebkitLineClamp: 'clamp(2, 3, 3)',
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          fontFamily: "'Red Hat Display', sans-serif",
                          fontWeight: 400,
                          textShadow: "0 1px 1px rgba(0,0,0,0.2)",
                          flex: 1
                        }}
                      >
                        {it.shortBlurb}
                      </p>
                    </div>

                    <div
                      className="card-footer"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: 'clamp(12px, 2vw, 24px)',
                        position: "relative",
                        zIndex: 2,
                      }}
                    >
                      <span
                        className="card-learn-text"
                        style={{
                          fontSize: 'clamp(11px, 1.2vw, 13px)',
                          fontWeight: 500,
                          color: "rgba(255,255,255,0.9)",
                          fontFamily: "'Red Hat Display', sans-serif",
                          textShadow: "0 1px 1px rgba(0,0,0,0.2)",
                        }}
                      >
                        Learn more
                      </span>
                      <span
                        className="card-arrow"
                        style={{
                          width: 'clamp(28px, 3.5vw, 36px)',
                          height: 'clamp(28px, 3.5vw, 36px)',
                          borderRadius: "50%",
                          background: isHover ? "#ffffff" : "rgba(255,255,255,0.25)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: isHover ? "#5FAFBE" : "#ffffff",
                          transition: "all 0.3s ease",
                          transform: isHover ? "translateX(5px)" : "translateX(0)",
                          backdropFilter: "blur(4px)",
                          WebkitBackdropFilter: "blur(4px)",
                          flexShrink: 0
                        }}
                      >
                        <Arrow size={14} />
                      </span>
                    </div>

                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: 'clamp(16px, 2vw, 24px)',
                        border: isHover ? "2px solid rgba(255,255,255,0.6)" : "1px solid rgba(255,255,255,0.2)",
                        pointerEvents: "none",
                        transition: "all 0.3s ease",
                        zIndex: 3,
                      }}
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <style>{`
          .reveal {
            opacity: 0;
            transform: translateY(24px);
            transition: opacity .7s ease, transform .7s ease;
          }

          .reveal.in {
            opacity: 1;
            transform: translateY(0);
          }

          /* Institutes Grid — Desktop */
          .institutes-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 24px;
          }

          /* Mobile Gallery */
          .mobile-institutes {
            display: flex;
            flex-direction: column;
            gap: 16px;
            align-items: center;
          }

          .mobile-dots {
            display: flex;
            gap: 10px;
            justify-content: center;
            padding: 4px 0;
          }

          .mobile-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
            padding: 0;
          }

          .mobile-dot.active {
            width: 28px;
            border-radius: 4px;
          }

          .mobile-card-wrapper {
            width: 100%;
            position: relative;
          }

          /* Tablet */
          @media (max-width: 1024px) {
            .institutes-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 20px !important;
            }
          }

          /* ===== MOBILE (≤768px) ===== */
          @media (max-width: 768px) {
            .institutes-grid {
              display: none !important;
            }

            .wrap {
              padding: 0 20px !important;
            }

            .institutes-header {
              margin-bottom: 24px !important;
            }

            .mobile-dot {
              width: 6px !important;
              height: 6px !important;
            }

            .mobile-dot.active {
              width: 22px !important;
            }
          }

          /* Hide mobile view on desktop */
          @media (min-width: 769px) {
            .mobile-institutes {
              display: none !important;
            }
          }

          @media (max-width: 480px) {
            .wrap {
              padding: 0 16px !important;
            }

            .mobile-dot {
              width: 5px !important;
              height: 5px !important;
              gap: 8px !important;
            }

            .mobile-dot.active {
              width: 18px !important;
            }
          }

          /* Touch device optimizations */
          @media (hover: none) {
            .institute-card {
              transition: transform 0.2s ease !important;
            }
            
            .institute-card:active {
              transform: scale(0.98) !important;
            }
            
            .card-arrow {
              background: rgba(255,255,255,0.25) !important;
              color: #ffffff !important;
            }
          }
        `}</style>
      </section>

      {/* Modal */}
      {selectedInstitute && (
        <div
          className="modal-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(16px, 4vw, 32px)',
            animation: 'fadeIn 0.3s ease',
            fontFamily: "'Red Hat Display', sans-serif"
          }}
          onClick={handleCloseModal}
        >
          <div
            className="modal-content"
            style={{
              maxWidth: 750,
              width: '100%',
              maxHeight: '85vh',
              background: '#FAF7F0',
              borderRadius: 'clamp(20px, 3vw, 32px)',
              overflow: 'auto',
              position: 'relative',
              animation: 'slideUp 0.4s ease'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="modal-close"
              style={{
                position: 'absolute',
                top: 'clamp(16px, 2vw, 20px)',
                right: 'clamp(16px, 2vw, 20px)',
                width: 'clamp(36px, 4vw, 40px)',
                height: 'clamp(36px, 4vw, 40px)',
                borderRadius: '50%',
                border: 'none',
                background: 'rgba(0,0,0,0.05)',
                cursor: 'pointer',
                fontSize: 'clamp(20px, 2.5vw, 24px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                zIndex: 10,
                color: '#07152b',
                fontFamily: "'Red Hat Display', sans-serif",
                fontWeight: 400,
                touchAction: 'manipulation'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
            >
              ×
            </button>

            <div className="modal-body" style={{ 
              padding: 'clamp(32px, 5vw, 48px) clamp(16px, 4vw, 40px)' 
            }}>
              <div style={{ marginBottom: 'clamp(20px, 3vw, 28px)' }}>
                <span
                  style={{
                    fontSize: 'clamp(10px, 1vw, 11px)',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#5FAFBE',
                    fontWeight: 700,
                    fontFamily: "'Red Hat Display', sans-serif"
                  }}
                >
                  {selectedInstitute.tag}
                </span>
                <h2
                  style={{
                    fontSize: 'clamp(24px, 5vw, 40px)',
                    lineHeight: 1.2,
                    marginTop: 16,
                    marginBottom: 16,
                    color: '#07152b',
                    fontWeight: 700,
                    fontFamily: "'Red Hat Display', sans-serif"
                  }}
                >
                  {selectedInstitute.title}
                </h2>
                <div
                  style={{
                    width: 60,
                    height: 3,
                    background: '#5FAFBE',
                    borderRadius: 2
                  }}
                />
              </div>

              <div style={{ marginBottom: 'clamp(24px, 3vw, 32px)' }}>
                <p
                  style={{
                    fontSize: 'clamp(14px, 1.2vw, 16px)',
                    lineHeight: 1.6,
                    color: '#4a5568',
                    marginBottom: 24,
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 400
                  }}
                >
                  {selectedInstitute.fullDescription}
                </p>
              </div>

              <div style={{ marginBottom: 'clamp(24px, 3vw, 32px)' }}>
                <h4
                  style={{
                    fontSize: 'clamp(16px, 1.2vw, 18px)',
                    fontWeight: 700,
                    color: '#07152b',
                    marginBottom: 16,
                    fontFamily: "'Red Hat Display', sans-serif"
                  }}
                >
                  Key Focus Areas
                </h4>
                <div
                  className="highlights-grid"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(150px, 20vw, 180px), 1fr))',
                    gap: 'clamp(8px, 1.5vw, 12px)'
                  }}
                >
                  {selectedInstitute.keyHighlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: 'clamp(8px, 1.2vw, 10px) clamp(10px, 1.5vw, 14px)',
                        background: '#5FAFBE15',
                        borderRadius: 12,
                        fontSize: 'clamp(12px, 1vw, 14px)',
                        color: '#5FAFBE',
                        fontWeight: 500,
                        fontFamily: "'Red Hat Display', sans-serif"
                      }}
                    >
                      <span style={{ fontSize: 'clamp(14px, 1.5vw, 16px)' }}>✦</span>
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  handleCloseModal();
                  if (onOpen) onOpen('contact');
                }}
                style={{
                  width: '100%',
                  padding: 'clamp(12px, 1.5vw, 14px)',
                  background: '#5FAFBE',
                  color: 'white',
                  border: 'none',
                  borderRadius: 40,
                  fontSize: 'clamp(13px, 1vw, 14px)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  marginTop: 8,
                  fontFamily: "'Red Hat Display', sans-serif",
                  touchAction: 'manipulation'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#4A8F9E'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#5FAFBE'}
              >
                Learn more about this institute →
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Modal Responsive */
        @media (max-width: 768px) {
          .modal-content {
            border-radius: 24px !important;
            max-height: 90vh !important;
          }
          
          .modal-body {
            padding: 32px 20px !important;
          }
          
          .modal-close {
            top: 16px !important;
            right: 16px !important;
            width: 36px !important;
            height: 36px !important;
            font-size: 20px !important;
          }
          
          .highlights-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }

        @media (max-width: 480px) {
          .modal-body {
            padding: 24px 16px !important;
          }
          
          .modal-content {
            border-radius: 20px !important;
            max-height: 92vh !important;
          }
          
          .highlights-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 360px) {
          .modal-body {
            padding: 20px 12px !important;
          }
        }

        /* Touch device optimizations */
        @media (hover: none) {
          .modal-close {
            background: rgba(0,0,0,0.08) !important;
          }
          
          .modal-close:active {
            background: rgba(0,0,0,0.15) !important;
            transform: scale(0.95);
          }
        }
      `}</style>
    </>
  );
}

export default Institutes;