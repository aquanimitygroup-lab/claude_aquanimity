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

function Ventures({ palette, onOpen }) {
  const ref = useReveal();
  const [activeVenture, setActiveVenture] = useState(0);
  const [imageLoaded, setImageLoaded] = useState({});

  // All ventures data with background images
  const ventures = [
    {
      id: "superwater",
      n: "01",
      name: "Super Water",
      tag: "Enhanced Water",
      blurb: "Patented and clinically validated. Following successful 150-participant human trials confirming benefits for hydration, post-meal glucose control, and heart health, our functional water has proven its efficacy. We are now preparing full-scale production to bring smarter daily wellness to everyone.",
      video: "#",
      bgImage: "/images/v1.jpg"
    },
    {
      id: "bluemicrobiome",
      n: "02",
      name: "Blue Microbiome",
      tag: "Environmental Remediation",
      blurb: "Engineering biology for a cleaner planet. By isolating and mutagenizing coastal bacteria that break down persistent PVC, PET, and polyurethane, we are decoding key genetic pathways to commercially produce powerful plastic-degrading enzymes for a waste-free future.",
      video: "#",
      bgImage: "/images/biom.jpg"
    },
    {
      id: "omnibio",
      n: "03",
      name: "OmniBio",
      tag: "Computational Biology",
      blurb: "OmniBio is Aquanimity's computational biology platform unifying tools for drug discovery and protein engineering - including MolProfiler (a Docking and ADMET analysis tool), a mutation analysis engine, and an enzyme discovery platform. Core modules are functional, with integration underway toward a unified research workflow.",
      video: "#",
      bgImage: "/images/omics.png"
    },
    {
      id: "thermorevax",
      n: "04",
      name: "ThermoReVaQ",
      tag: "Vaccine Engineering",
      blurb: "Reinventing vaccine delivery without the cold chain. Our breakthrough polymer replaces traditional LNPs, eliminating refrigeration requirements while enhancing bioavailability. We are developing next-generation mRNA, siRNA, and chimeric vaccines to make life-saving therapeutics accessible worldwide.",
      video: "#",
      bgImage: "/images/vaccinpng.png"
    }
  ];

  const currentVenture = ventures[activeVenture];

  const handleExploreClick = (e) => {
    e.preventDefault();
    if (onOpen) {
      onOpen('venture:' + currentVenture.id);
    }
  };

  const handleVentureChange = (index) => {
    setActiveVenture(index);
    // Preload image
    const img = new Image();
    img.src = ventures[index].bgImage;
    img.onload = () => {
      setImageLoaded(prev => ({ ...prev, [index]: true }));
    };
  };

  // Preload first image on mount
  useEffect(() => {
    const img = new Image();
    img.src = ventures[0].bgImage;
    img.onload = () => {
      setImageLoaded(prev => ({ ...prev, [0]: true }));
    };
  }, []);

  return (
    <section
      ref={ref}
      id="ventures"
      style={{
        paddingTop: 120,
        paddingBottom: 140,
        background: 'var(--ink)',
        color: 'var(--paper)',
        fontFamily: "'Red Hat Display', 'Red Hat Display Variable', sans-serif",
        minHeight: '100vh'
      }}
    >
      <div className="wrap" style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>
        {/* Header */}
        <div
          className="reveal"
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 24,
            marginBottom: 56
          }}
        >
          <div>
            <div
              className="label"
              style={{
                marginBottom: 18,
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: 'rgba(255,255,255,0.55)',
                fontFamily: "'Red Hat Display', sans-serif",
                fontWeight: 600
              }}
            >
              § 02 — Our Ventures
            </div>
            <h2
              style={{
                fontSize: 'clamp(36px, 5vw, 64px)',
                lineHeight: 1.02,
                letterSpacing: '-0.025em',
                color: 'var(--paper)',
                maxWidth: 760,
                fontWeight: 900,
                fontFamily: "'Red Hat Display', sans-serif",
                margin: 0
              }}
            >
              <span style={{ fontWeight: 900, color: 'var(--paper)' }}>Building</span>{' '}
              <span
                className="serif"
                style={{
                  fontStyle: 'italic',
                  color: 'var(--accent-2)',
                  fontWeight: 400,
                  fontFamily: "'Times New Roman', Georgia, serif"
                }}
              >
                category-defining
              </span>
              <br />
              <span style={{ fontWeight: 900, color: 'var(--paper)' }}>ventures.</span>
            </h2>
          </div>
        </div>

        {/* Venture Navigation */}
        <div
          className="reveal"
          style={{
            display: 'flex',
            gap: 8,
            marginBottom: 48,
            flexWrap: 'wrap'
          }}
        >
          {ventures.map((venture, index) => (
            <button
              key={venture.id}
              onClick={() => handleVentureChange(index)}
              style={{
                padding: '10px 24px',
                borderRadius: 999,
                border: index === activeVenture ? '1.5px solid var(--accent-2)' : '1.5px solid rgba(255,255,255,0.2)',
                background: index === activeVenture ? 'var(--accent-2)' : 'transparent',
                color: index === activeVenture ? 'var(--ink)' : 'var(--paper)',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 500,
                transition: 'all 0.3s ease',
                fontFamily: "'Red Hat Display', sans-serif"
              }}
              onMouseEnter={(e) => {
                if (index !== activeVenture) {
                  e.currentTarget.style.borderColor = 'var(--accent-2)';
                }
              }}
              onMouseLeave={(e) => {
                if (index !== activeVenture) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                }
              }}
            >
               {venture.name}
            </button>
          ))}
        </div>

        {/* Active Venture Content with Professional Background Image */}
        <div
          className="reveal"
          style={{
            position: 'relative',
            borderRadius: 24,
            overflow: 'hidden',
            minHeight: 520,
            display: 'flex',
            alignItems: 'center',
            padding: 60,
            background: `linear-gradient(135deg, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.5) 40%, rgba(10,10,10,0.7) 100%)`,
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
          }}
        >
          {/* Background Image with Professional Effects */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${currentVenture.bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: imageLoaded[activeVenture] ? 1 : 0,
              transition: 'opacity 0.8s ease',
              transform: 'scale(1.05)',
              filter: 'brightness(0.7) saturate(1.1)'
            }}
          />
          
          {/* Gradient Overlay Layers */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.2) 50%, rgba(10,10,10,0.6) 100%)',
              zIndex: 1
            }}
          />
          
          {/* Subtle Border Glow */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 24,
              zIndex: 3,
              pointerEvents: 'none'
            }}
          />

          {/* Content Overlay */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              maxWidth: '60%',
              animation: 'fadeInUp 0.6s ease'
            }}
          >
            {/* Tag */}
            <div
              style={{
                display: 'inline-block',
                fontSize: 11,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--accent-2)',
                marginBottom: 20,
                fontWeight: 600,
                fontFamily: "'Red Hat Display', sans-serif",
                background: 'rgba(0,0,0,0.3)',
                padding: '6px 16px',
                borderRadius: 999,
                backdropFilter: 'blur(10px)'
              }}
            >
              {currentVenture.tag}
            </div>

            {/* Title */}
            <h3
              style={{
                fontSize: 'clamp(38px, 4.5vw, 54px)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: 'var(--paper)',
                margin: 0,
                marginBottom: 20,
                lineHeight: 1.08,
                fontFamily: "'Red Hat Display', sans-serif",
                textShadow: '0 2px 30px rgba(0,0,0,0.3)'
              }}
            >
              {currentVenture.name}
            </h3>

            {/* Description - Justified Text */}
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.85)',
                marginBottom: 36,
                maxWidth: '90%',
                fontFamily: "'Red Hat Display', sans-serif",
                fontWeight: 400,
                textShadow: '0 1px 20px rgba(0,0,0,0.2)',
                textAlign: 'justify',
                textJustify: 'inter-word'
              }}
            >
              {currentVenture.blurb}
            </p>

            {/* Explore More Button 
            <button
              onClick={handleExploreClick}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: 'var(--accent-2)',
                border: 'none',
                borderRadius: 999,
                padding: '14px 28px',
                fontSize: 15,
                fontWeight: 600,
                color: 'var(--ink)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                fontFamily: "'Red Hat Display', sans-serif",
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.4)';
                e.currentTarget.style.gap = '14px';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
                e.currentTarget.style.gap = '10px';
              }}
            >
              Explore more <Arrow size={14} />
            </button>*/}
          </div>

          {/* Venture Number - Decorative with Glass Effect */}
          <div
            style={{
              position: 'absolute',
              right: 50,
              bottom: 40,
              fontSize: 90,
              fontWeight: 900,
              color: 'rgba(255,255,255,0.04)',
              fontFamily: "'Red Hat Display', sans-serif",
              letterSpacing: '-0.05em',
              zIndex: 1,
              userSelect: 'none',
              textShadow: '0 4px 40px rgba(0,0,0,0.3)'
            }}
          >
            {currentVenture.n}
          </div>

          {/* Subtle Accent Line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 4,
              height: '100%',
              background: `linear-gradient(to bottom, transparent, var(--accent-2), transparent)`,
              zIndex: 2,
              opacity: 0.5
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        
        .reveal.in {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Smooth image loading */
        .venture-image {
          transition: opacity 0.8s ease;
        }

        /* Justify text for all screen sizes */
        .venture-description {
          text-align: justify;
          text-justify: inter-word;
        }
        
        @media (max-width: 980px) {
          #ventures .wrap {
            padding: 0 20px !important;
          }
          
          #ventures [style*="max-width: 60%"] {
            max-width: 100% !important;
          }
          
          #ventures p[style*="max-width: 90%"] {
            max-width: 100% !important;
          }
          
          #ventures [style*="padding: 60px"] {
            padding: 30px !important;
            min-height: 420px !important;
          }
          
          #ventures [style*="font-size: 90px"] {
            font-size: 50px !important;
            right: 20px !important;
            bottom: 20px !important;
          }
          
          #ventures [style*="padding: 14px 28px"] {
            padding: 12px 24px !important;
            font-size: 14px !important;
          }
        }

        @media (max-width: 768px) {
          #ventures [style*="min-height: 520px"] {
            min-height: 380px !important;
          }
          
          #ventures [style*="padding: 60px"] {
            padding: 24px !important;
          }
          
          #ventures p[style*="font-size: 18px"] {
            font-size: 15px !important;
          }
        }

        @media (max-width: 480px) {
          #ventures [style*="padding: 60px"] {
            padding: 20px !important;
            min-height: 320px !important;
          }
          
          #ventures p[style*="font-size: 18px"] {
            font-size: 14px !important;
            line-height: 1.5 !important;
          }
          
          #ventures [style*="font-size: 90px"] {
            font-size: 36px !important;
            right: 16px !important;
            bottom: 16px !important;
          }
          
          #ventures [style*="padding: 14px 28px"] {
            padding: 10px 18px !important;
            font-size: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}

export default Ventures;