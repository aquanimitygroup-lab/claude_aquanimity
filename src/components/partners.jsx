import React, { useState, useEffect, useRef } from 'react';

// Arrow icon component
const Arrow = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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

function Partners({ palette, onOpen }) {
  const ref = useReveal();
  
  // Partner data with images and website URLs
  const partnerItems = [
    {
      name: "ABRI",
      short: "ABRI",
      kind: "Research Partner",
      blurb: "Leading international health research institution.",
      loc: "Dhaka, BD",
      since: "2024",
      logo: "/images/ibr.jpeg",
      website: "https://abri.org.bd"
    },
    {
      name: "IQC",
      short: "IQC",
      kind: "Implementation Partner",
      blurb: "Global development organization based in Bangladesh.",
      loc: "Dhaka, BD",
      since: "2024",
      logo: "/images/iqc.jpeg",
      website: "https://iqc.org.bd"
    },
    {
      name: "Heart Foundation Bangladesh",
      short: "Heart Foundation Bangladesh",
      kind: "Academic Partner",
      blurb: "World-leading research university.",
      loc: "Boston, USA",
      since: "2024",
      logo: "/images/heart.jpeg",
      website: "https://www.nhf.org.bd/"
    },
    {
      name: "Diabetics Association of Bangladesh",
      short: "Diabetics Association of Bangladesh",
      kind: "Academic Partner",
      blurb: "Leading Asian university.",
      loc: "Bangladesh",
      since: "2024",
      logo: "/images/dia.jpeg",
      website: "https://www.dab-bd.org/"
    },
    {
      name: "Centre for Global Health Research",
      short: "Centre for Global Health Research",
      kind: "Academic Partner",
      blurb: "Leading research institution in bioengineering.",
      loc: "California, USA",
      since: "2024",
      logo: "/images/cghr.jpeg",
      website: "https://cghr-badas.org/"
    },
    {
      name: "BioEngineering",
      short: "DU",
      kind: "Academic Partner",
      blurb: "Premier public university in Bangladesh.",
      loc: "Dhaka, BD",
      since: "2024",
      logo: "/images/bio.jpeg",
      website: "https://www.berkeley.edu/"
    }
  ];

  // Stats data 
  const statsData = [
    {
      label: 'SCIENTIFIC PUBLICATIONS',
      value: '9+',
      icon: "📚"
    },
    {
      label: 'PARTNER INSTITUTIONS',
      value: '8+',
      icon: "🤝"
    },
    {
      label: 'COUNTRIES OPERATING',
      value: '4+',
      icon: "🌍"
    }
  ];

  // Create enough copies for seamless infinite scrolling
  const items = [...partnerItems, ...partnerItems, ...partnerItems, ...partnerItems];

  const [paused, setPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const animationRef = useRef(null);
  const positionRef = useRef(0);
  const speed = 1.5; // Increased from 0.5 to 1.2 for faster animation

  // Start animation when component is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  // Continuous infinite animation - seamless loop
  useEffect(() => {
    if (!isVisible || !trackRef.current || partnerItems.length === 0) return;
    
    const track = trackRef.current;
    const cardWidth = 220;
    const gap = 24;
    const singleSetWidth = (cardWidth + gap) * partnerItems.length;
    
    positionRef.current = 0;
    
    const animate = () => {
      if (!paused && track) {
        positionRef.current -= speed;
        
        if (Math.abs(positionRef.current) >= singleSetWidth) {
          positionRef.current += singleSetWidth;
        }
        
        track.style.transform = `translateX(${positionRef.current}px)`;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [paused, isVisible, partnerItems.length]);

  // Handle partner card click - open website in new tab
  const handlePartnerClick = (partner) => {
    if (partner.website) {
      window.open(partner.website, '_blank', 'noopener,noreferrer');
    } else {
      console.log(`No website available for ${partner.name}`);
      if (onOpen) {
        onOpen('partner:' + partner.short);
      }
    }
  };

  return (
    <section 
      ref={ref} 
      id="partners" 
      style={{ 
        paddingTop: 120, 
        paddingBottom: 120, 
        background: '#ece8df', 
        overflow: 'hidden',
        fontFamily: "'Red Hat Display', 'Red Hat Display Variable', sans-serif"
      }}
    >
      <div className="wrap" style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>
        <div className="reveal" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 48 }}>
          <div>
            <div className="label" style={{ marginBottom: 18, fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "#0E1B2C", fontWeight: 600, fontFamily: "'Red Hat Display', sans-serif" }}>
              § 04 — Our Partners
            </div>
            <h2 style={{ fontSize: 'clamp(32px, 4.4vw, 52px)', lineHeight: 1.05, letterSpacing: '-0.02em', maxWidth: 720, fontWeight: 900, color: "#0E1B2C", fontFamily: "'Red Hat Display', sans-serif", margin: 0 }}>
              Partnering with leading{' '}
              <span className="serif" style={{ fontStyle: 'italic', color: "#1F6E7A", fontWeight: 400, fontFamily: "'Times New Roman', Georgia, serif" }}>
                institutions.
              </span>
            </h2>
          </div>
        </div>
      </div>

      {/* Marquee Container - True Seamless Infinite Loop */}
      <div 
        ref={containerRef}
        className="reveal" 
        onMouseEnter={() => setPaused(true)} 
        onMouseLeave={() => setPaused(false)}
        style={{ overflow: 'hidden', position: 'relative', marginTop: 24, width: '100%' }}
      >
        <div 
          ref={trackRef} 
          style={{ 
            display: 'flex', 
            gap: 24, 
            willChange: 'transform',
            width: 'max-content'
          }}
        >
          {items.map((p, i) => (
            <div
              key={i}
              onClick={() => handlePartnerClick(p)}
              style={{
                flex: '0 0 auto',
                width: 220,
                height: 140,
                background: '#ffffff',
                borderRadius: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                overflow: 'hidden',
                border: '1px solid rgba(0,0,0,0.08)'
              }}
              onMouseEnter={(e) => {
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1.05)';
                const overlay = e.currentTarget.querySelector('.hover-overlay');
                if (overlay) overlay.style.opacity = '1';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector('img');
                if (img) img.style.transform = 'scale(1)';
                const overlay = e.currentTarget.querySelector('.hover-overlay');
                if (overlay) overlay.style.opacity = '0';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
              }}
            >
              <img 
                src={p.logo} 
                alt={p.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'center',
                  padding: '16px',
                  backgroundColor: '#ffffff',
                  transition: 'transform 0.3s ease'
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  const parent = e.target.parentElement;
                  if (parent) {
                    const fallback = parent.querySelector('.fallback-text');
                    if (fallback) fallback.style.display = 'flex';
                  }
                }}
              />
              <div 
                className="fallback-text"
                style={{
                  display: 'none',
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#0E1B2C',
                  textAlign: 'center',
                  padding: 8,
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100%',
                  fontFamily: "'Red Hat Display', sans-serif"
                }}
              >
                {p.name}
              </div>
              <div 
                className="hover-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(31,110,122,0.08), rgba(31,110,122,0.04))',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  pointerEvents: 'none',
                  borderRadius: 16
                }}
              />
              {/* Visit indicator */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 8,
                  right: 12,
                  fontSize: 11,
                  color: 'rgba(31,110,122,0.5)',
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4
                }}
                className="visit-indicator"
              >
                Visit <Arrow size={10} />
              </div>
            </div>
          ))}
        </div>
        
        {/* Edge fades for smooth visual effect */}
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: 100, 
          height: '100%', 
          background: 'linear-gradient(90deg, #ece8df, transparent)', 
          pointerEvents: 'none',
          zIndex: 2
        }} />
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          right: 0, 
          width: 100, 
          height: '100%', 
          background: 'linear-gradient(270deg, #ece8df, transparent)', 
          pointerEvents: 'none',
          zIndex: 2
        }} />
      </div>

      {/* Stats Cards Section - Static, non-clickable */}
      <div className="wrap" style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px", marginTop: 64 }}>
        <div className="reveal" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: 24,
          paddingTop: 32,
          borderTop: '1px solid rgba(0,0,0,0.1)'
        }}>
          {statsData.map((stat, index) => (
            <div
              key={index}
              style={{
                background: '#ffffff',
                borderRadius: 20,
                padding: '32px 28px',
                transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                border: '1px solid rgba(0,0,0,0.06)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Decorative gradient line */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: 'linear-gradient(90deg, #1F6E7A, #2A9D8F)',
                opacity: 0.6
              }} />
              
              {/* Icon/Emoji */}
              <div 
                style={{
                  fontSize: 36,
                  marginBottom: 16,
                  display: 'block'
                }}
              >
                {stat.icon}
              </div>

              {/* Value */}
              <div style={{
                fontSize: 'clamp(36px, 4vw, 48px)',
                fontWeight: 900,
                color: '#0E1B2C',
                fontFamily: "'Red Hat Display', sans-serif",
                lineHeight: 1,
                marginBottom: 8,
                letterSpacing: '-0.02em'
              }}>
                {stat.value}
              </div>

              {/* Label */}
              <div style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#1F6E7A',
                fontFamily: "'Red Hat Display', sans-serif",
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                marginBottom: 4
              }}>
                {stat.label}
              </div>

              {/* Subtle background pattern */}
              <div style={{
                position: 'absolute',
                bottom: -20,
                right: -20,
                fontSize: 120,
                fontWeight: 900,
                color: 'rgba(31,110,122,0.03)',
                fontFamily: "'Red Hat Display', sans-serif",
                pointerEvents: 'none',
                userSelect: 'none',
                lineHeight: 1
              }}>
                {stat.value.replace('+', '')}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.in {
          opacity: 1;
          transform: translateY(0);
        }
        
        /* Show visit indicator on hover */
        .visit-indicator {
          opacity: 0 !important;
        }
        .partner-card:hover .visit-indicator {
          opacity: 1 !important;
        }
        
        @media (max-width: 900px) {
          #partners > .wrap > div:last-child {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 20px !important;
          }
        }
        
        @media (max-width: 600px) {
          #partners .wrap {
            padding: 0 20px !important;
          }
          
          #partners > .wrap > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

export default Partners;