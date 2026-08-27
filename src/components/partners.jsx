import React, { useState, useEffect, useRef } from 'react';

const Arrow = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const useReveal = () => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      const observer = new IntersectionObserver(
        (entries) => entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("in"); }),
        { threshold: 0.05, rootMargin: '0px 0px -40px 0px' }
      );
      ref.current.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }
  }, []);
  return ref;
};

function Partners({ palette, onOpen }) {
  const ref = useReveal();

  const partnerItems = [
    { name: "ABRI", short: "ABRI", kind: "Research Partner", logo: "/images/ibr.jpeg", website: "https://www.facebook.com/ABRI.BUET/" },
    { name: "IQC", short: "IQC", kind: "Implementation Partner", logo: "/images/iqc.jpeg", website: "https://iqc.org.bd" },
    { name: "Heart Foundation Bangladesh", short: "Heart Foundation Bangladesh", kind: "Academic Partner", logo: "/images/heart.jpeg", website: "https://www.nhf.org.bd/" },
    { name: "Diabetics Association of Bangladesh", short: "Diabetics Association of Bangladesh", kind: "Academic Partner", logo: "/images/dia.jpeg", website: "https://www.dab-bd.org/" },
    { name: "Centre for Global Health Research", short: "Centre for Global Health Research", kind: "Academic Partner", logo: "/images/cghr.jpeg", website: "https://cghr-badas.org/" },
    { name: "BioEngineering", short: "BioEngineering", kind: "Academic Partner", logo: "/images/bio.jpeg", website: "https://bioeng.berkeley.edu/" },
    { name: "Dhaka University", short: "Dhaka University", kind: "Academic Partner", logo: "/images/du.png", website: "https://www.du.ac.bd/" }
  ];

  const statsData = [
    { label: 'SCIENTIFIC PUBLICATIONS', value: '9+', icon: "📚" },
    { label: 'PARTNER INSTITUTIONS', value: '8+', icon: "🤝" },
    { label: 'COUNTRIES OPERATING', value: '4+', icon: "🌍" }
  ];

  const items = [...partnerItems, ...partnerItems, ...partnerItems, ...partnerItems];

  const [paused, setPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const animationRef = useRef(null);
  const positionRef = useRef(0);
  const speed = 1.5;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); } }),
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

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
        if (Math.abs(positionRef.current) >= singleSetWidth) positionRef.current += singleSetWidth;
        track.style.transform = `translateX(${positionRef.current}px)`;
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, [paused, isVisible, partnerItems.length]);

  const handlePartnerClick = (partner) => {
    if (partner.website) window.open(partner.website, '_blank', 'noopener,noreferrer');
    else if (onOpen) onOpen('partner:' + partner.short);
  };

  return (
    <section ref={ref} id="partners" className="partners-section">
      <div className="partners-wrap">
        <div className="reveal partners-header">
          <div>
            <div className="partners-label">§ 04 — Our Partners</div>
            <h2 className="partners-heading">
              Partnering with leading{' '}
              <span className="serif" style={{ fontStyle: 'italic', color: "#1F6E7A", fontWeight: 400, fontFamily: "'Times New Roman', Georgia, serif" }}>
                institutions.
              </span>
            </h2>
          </div>
        </div>
      </div>

      <div ref={containerRef} className="reveal" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
        style={{ overflow: 'hidden', position: 'relative', marginTop: 12, width: '100%' }}>
        <div ref={trackRef} className="partner-track">
          {items.map((p, i) => (
            <div key={i} onClick={() => handlePartnerClick(p)} className="partner-card"
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)'; }}>
              <img src={p.logo} alt={p.name}
                style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', padding: '16px', backgroundColor: '#ffffff', transition: 'transform 0.3s ease' }}
                onError={(e) => { e.target.style.display = 'none'; const f = e.target.parentElement?.querySelector('.fallback-text'); if (f) f.style.display = 'flex'; }} />
              <div className="fallback-text" style={{ display: 'none', fontSize: 14, fontWeight: 600, color: '#0E1B2C', textAlign: 'center', padding: 8, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%' }}>{p.name}</div>
              <div className="hover-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(31,110,122,0.08), rgba(31,110,122,0.04))', opacity: 0, transition: 'opacity 0.3s ease', pointerEvents: 'none', borderRadius: 16 }} />
            </div>
          ))}
        </div>
        <div style={{ position: 'absolute', top: 0, left: 0, width: 80, height: '100%', background: 'linear-gradient(90deg, #ece8df, transparent)', pointerEvents: 'none', zIndex: 2 }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: 80, height: '100%', background: 'linear-gradient(270deg, #ece8df, transparent)', pointerEvents: 'none', zIndex: 2 }} />
      </div>

      <div className="partners-wrap" style={{ marginTop: 28 }}>
        <div className="reveal stats-grid">
          {statsData.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-bar" />
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-deco">{stat.value.replace('+', '')}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal.in { opacity: 1; transform: translateY(0); }

        .partners-section {
          padding: 38px 0 38px;
          background: #ece8df;
          overflow: hidden;
          font-family: 'Red Hat Display', sans-serif;
        }
        .partners-wrap { max-width: 1400px; margin: 0 auto; padding: 0 32px; }
        .partners-header { margin-bottom: 20px; }
        .partners-label { margin-bottom: 10px; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #1F6E7A; font-weight: 600; }
        .partners-heading { font-size: clamp(24px, 4.4vw, 52px); line-height: 1.05; letter-spacing: -0.02em; max-width: 720px; font-weight: 900; color: #0E1136; margin: 0; }

        .partner-track { display: flex; gap: 24px; will-change: transform; width: max-content; }
        .partner-card {
          flex: 0 0 auto; width: 220px; height: 140px; background: #fff; border-radius: 16px;
          display: flex; align-items: center; justify-content: center; position: relative;
          cursor: pointer; transition: all 0.3s ease; box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          overflow: hidden; border: 1px solid rgba(0,0,0,0.08);
        }

        .stats-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;
          padding-top: 20px; border-top: 1px solid rgba(0,0,0,0.1);
        }
        .stat-card {
          background: #fff; border-radius: 20px; padding: 24px 20px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.06); border: 1px solid rgba(0,0,0,0.06);
          position: relative; overflow: hidden;
        }
        .stat-bar { position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, #1F6E7A, #2A9D8F); opacity: 0.6; }
        .stat-icon { font-size: 28px; margin-bottom: 10px; }
        .stat-value { font-size: clamp(28px, 4vw, 44px); font-weight: 900; color: #0E1136; line-height: 1; margin-bottom: 4px; letter-spacing: -0.02em; }
        .stat-label { font-size: 11px; font-weight: 600; color: #1F6E7A; letter-spacing: 0.05em; text-transform: uppercase; }
        .stat-deco { position: absolute; bottom: -16px; right: -16px; font-size: 80px; font-weight: 900; color: rgba(31,110,122,0.03); pointer-events: none; user-select: none; line-height: 1; }

        @media (max-width: 980px) {
          .partners-section { padding: 40px 0 40px !important; }
          .partners-wrap { padding: 0 20px !important; }
        }

        @media (max-width: 768px) {
          .partners-section { padding: 28px 0 32px !important; }
          .partners-wrap { padding: 0 16px !important; }
          .partners-header { margin-bottom: 16px !important; }
          .partners-label { font-size: 10px !important; margin-bottom: 8px !important; }
          .partners-heading { font-size: 24px !important; }
          .partner-card { width: 160px !important; height: 100px !important; border-radius: 12px !important; }
          .partner-card img { padding: 10px !important; }
          .partner-track { gap: 14px !important; }
          .stats-grid { gap: 10px !important; padding-top: 16px !important; }
          .stat-card { padding: 16px 12px !important; border-radius: 14px !important; }
          .stat-icon { font-size: 20px !important; margin-bottom: 6px !important; }
          .stat-value { font-size: 24px !important; }
          .stat-label { font-size: 8px !important; letter-spacing: 0.03em !important; }
          .stat-deco { font-size: 50px !important; bottom: -10px !important; right: -10px !important; }
        }

        @media (max-width: 480px) {
          .partners-section { padding: 24px 0 24px !important; }
          .partner-card { width: 140px !important; height: 90px !important; border-radius: 10px !important; }
          .partner-card img { padding: 8px !important; }
          .partner-track { gap: 10px !important; }
          .stats-grid { gap: 8px !important; }
          .stat-card { padding: 12px 10px !important; border-radius: 12px !important; }
          .stat-icon { font-size: 18px !important; margin-bottom: 4px !important; }
          .stat-value { font-size: 20px !important; }
          .stat-label { font-size: 7px !important; }
          .stat-deco { font-size: 40px !important; }
        }

        @media (max-width: 360px) {
          .partners-section { padding: 20px 0 20px !important; }
          .partner-card { width: 120px !important; height: 80px !important; }
          .stat-value { font-size: 18px !important; }
          .stat-label { font-size: 6.5px !important; }
          .stat-icon { font-size: 16px !important; }
        }
      `}</style>
    </section>
  );
}

export default Partners;