import React, { useState, useEffect, useRef } from 'react';

// Arrow icon component
const Arrow = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Mark/Logo component
const Mark = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M2 17L12 22L22 17" stroke={color} strokeWidth="1.5" fill="none"/>
    <path d="M2 12L12 17L22 12" stroke={color} strokeWidth="1.5" fill="none"/>
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

function FooterCTA({ palette, onOpen }) {
  const ref = useReveal();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organisation: '',
    message: ''
  });
  const [selectedTags, setSelectedTags] = useState([]);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  
  const tags = ['Founder', 'Scientist', 'Investor', 'Operator', 'Government', 'Press'];
  
  // Validation function
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.organisation.trim()) {
      newErrors.organisation = 'Organisation name is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check if all fields are filled
  const isFormValid = () => {
    return (
      formData.name.trim() !== '' &&
      formData.email.trim() !== '' &&
      /\S+@\S+\.\S+/.test(formData.email) &&
      formData.organisation.trim() !== '' &&
      formData.message.trim() !== ''
    );
  };

  const handleGetInTouch = (e) => {
    e.preventDefault();
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to=contact@aquanimitygroup.com', '_blank');
  };
  
  const handleSeeRoles = (e) => {
    e.preventDefault();
    if (onOpen) onOpen('careers');
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      name: true,
      email: true,
      organisation: true,
      message: true
    });
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // Opens Gmail compose in new tab with form data pre-filled
    const subject = encodeURIComponent('Inquiry from ' + (formData.name || 'Visitor'));
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Organisation: ${formData.organisation}\n` +
      `I am: ${selectedTags.join(', ') || 'Not specified'}\n\n` +
      `Message:\n${formData.message}`
    );
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=contact@aquanimitygroup.com&su=${subject}&body=${body}`, '_blank');
    
    // Reset form after opening Gmail
    setFormData({ name: '', email: '', organisation: '', message: '' });
    setSelectedTags([]);
    setErrors({});
    setTouched({});
  };
  
  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const handleBlur = (field) => {
    setTouched({
      ...touched,
      [field]: true
    });
    
    // Validate individual field on blur
    if (field === 'email' && formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      setErrors({
        ...errors,
        email: 'Please enter a valid email address'
      });
    }
  };
  
  return (
    <section ref={ref} id="contact" style={{ paddingTop: 120, paddingBottom: 0, background: '#F2EDE3', fontFamily: "'Red Hat Display', 'Red Hat Display Variable', sans-serif" }}>
      <div className="wrap" style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
          {/* Left side - Text Content */}
          <div>
            <div className="label" style={{ marginBottom: 18, fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", fontFamily: "'Red Hat Display', sans-serif", fontWeight: 600 }}>
              § 06 — Partner with Us
            </div>
            <h2 style={{ 
              fontSize: 'clamp(40px, 6vw, 88px)', 
              lineHeight: 1, 
              letterSpacing: '-0.03em', 
              fontWeight: 900,
              color: '#0e1136',
              fontFamily: "'Red Hat Display', sans-serif",
              margin: 0
            }}>
              Let's{' '}
              <span className="serif" style={{ fontStyle: 'italic', color: 'var(--accent)', fontWeight: 400, fontFamily: "'Times New Roman', Georgia, serif" }}>
                engineer
              </span>
              <br />
              what's next.
            </h2>
            <p style={{ 
              marginTop: 28, 
              fontSize: 18, 
              color: '#0E1136', 
              lineHeight: 1.55, 
              maxWidth: 480,
              fontFamily: "'Red Hat Display', sans-serif",
              fontWeight: 400
            }}>
              Founders, scientists, capital, governments. If you're building the bioeconomy of the Global South, we want to hear from you.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 36 }}>
            </div>
          </div>

          {/* Right side - Form */}
          <form onSubmit={handleSubmit} style={{ 
            background: '#FAF7F0', 
            padding: 36, 
            border: '1px solid var(--rule)', 
            borderRadius: 24,
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
            fontFamily: "'Red Hat Display', sans-serif"
          }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: '0.22em', color: 'var(--accent)', marginBottom: 24, fontWeight: 600, fontFamily: "'Red Hat Display', sans-serif" }}>
              BRIEF · 100 Words
            </div>
            
            <Field 
              label="Your name" 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              onBlur={() => handleBlur('name')}
              placeholder="Mahmuda Ahmed"
              error={touched.name && errors.name}
              required
            />
            
            <Field 
              label="Email" 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={() => handleBlur('email')}
              placeholder="you@org.com"
              error={touched.email && errors.email}
              required
            />
            
            <Field 
              label="Organisation" 
              name="organisation"
              value={formData.organisation}
              onChange={handleInputChange}
              onBlur={() => handleBlur('organisation')}
              placeholder="ICDDR,B / BRAC / Independent"
              error={touched.organisation && errors.organisation}
              required
            />
            
            <div style={{ marginBottom: 24 }}>
              <label className="label" style={{ display: 'block', marginBottom: 10, fontSize: 11, letterSpacing: '0.2em', color: 'var(--muted)', fontFamily: "'Red Hat Display', sans-serif", fontWeight: 500 }}>
                I am (optional)
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {tags.map(tag => (
                  <Chip 
                    key={tag} 
                    label={tag} 
                    isActive={selectedTags.includes(tag)}
                    onClick={() => handleTagToggle(tag)}
                  />
                ))}
              </div>
            </div>
            
            <Field 
              label="What's on your mind" 
              type="textarea" 
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              onBlur={() => handleBlur('message')}
              placeholder="A line or two — we'll reply within 48h."
              error={touched.message && errors.message}
              required
            />
            
            <button 
              type="submit" 
              style={{ 
                width: '100%', 
                justifyContent: 'center', 
                marginTop: 16,
                padding: '14px 24px',
                background: isFormValid() ? '#0E1136' : '#0E1136',
                color: isFormValid() ? 'white' : '#999999',
                border: 'none',
                borderRadius: 40,
                cursor: isFormValid() ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontSize: 15,
                fontWeight: 600,
                transition: 'all 0.3s ease',
                fontFamily: "'Red Hat Display', sans-serif",
                opacity: isFormValid() ? 1 : 0.7
              }}
              onMouseEnter={(e) => {
                if (isFormValid()) {
                  e.currentTarget.style.background = '#0E1136';
                  e.currentTarget.style.gap = '14px';
                }
              }}
              onMouseLeave={(e) => {
                if (isFormValid()) {
                  e.currentTarget.style.background = '#0E1136';
                  e.currentTarget.style.gap = '10px';
                }
              }}
              disabled={!isFormValid()}
            >
              Send brief <Arrow />
            </button>
            
            {/* Validation summary - show when form is invalid */}
            {!isFormValid() && Object.values(touched).some(v => v === true) && (
              <div style={{ 
                marginTop: 12, 
                fontSize: 12, 
                color: '#e74c3c', 
                textAlign: 'center',
                fontFamily: "'Red Hat Display', sans-serif",
                fontWeight: 500
              }}>
                Please fill in all required fields correctly.
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        <Footer />
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
        
        @media (max-width: 1000px) {
          #contact .reveal[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
        
        @media (max-width: 600px) {
          #contact .wrap {
            padding: 0 20px !important;
          }
        }
      `}</style>
    </section>
  );
}

function Field({ label, type = 'text', placeholder, name, value, onChange, onBlur, error, required }) {
  const [focus, setFocus] = useState(false);
  
  const fieldStyle = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: '2px solid ' + (error ? '#e74c3c' : (focus ? 'var(--accent)' : 'var(--rule)')),
    padding: '12px 0 8px 0',
    fontFamily: "'Red Hat Display', sans-serif",
    fontSize: 15,
    color: '#0E1136',
    outline: 'none',
    transition: 'border-color 0.25s ease',
    resize: 'vertical'
  };
  
  return (
    <div style={{ marginBottom: 22 }}>
      <label className="label" style={{ display: 'block', marginBottom: 6, fontSize: 11, letterSpacing: '0.2em', color: 'var(--muted)', fontFamily: "'Red Hat Display', sans-serif", fontWeight: 500 }}>
        {label} {required && <span style={{ color: '#e74c3c' }}>*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea 
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocus(true)} 
          onBlur={(e) => {
            setFocus(false);
            if (onBlur) onBlur();
          }}
          rows={3} 
          placeholder={placeholder}
          style={fieldStyle}
        />
      ) : (
        <input 
          type={type} 
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocus(true)} 
          onBlur={(e) => {
            setFocus(false);
            if (onBlur) onBlur();
          }}
          placeholder={placeholder}
          style={fieldStyle}
        />
      )}
      {error && (
        <div style={{ fontSize: 11, color: '#e74c3c', marginTop: 4, fontFamily: "'Red Hat Display', sans-serif", fontWeight: 400 }}>
          {error}
        </div>
      )}
    </div>
  );
}

function Chip({ label, isActive, onClick }) {
  return (
    <button 
      type="button" 
      onClick={onClick}
      style={{
        padding: '8px 18px', 
        borderRadius: 40,
        border: '1px solid ' + (isActive ? 'var(--accent)' : 'var(--rule)'),
        background: isActive ? 'var(--accent)' : 'transparent',
        color: isActive ? 'white' : '#0E1136',
        fontSize: 13, 
        fontWeight: 500,
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        fontFamily: "'Red Hat Display', sans-serif"
      }}
    >
      {label}
    </button>
  );
}

function Footer() {
  const handleLinkClick = (e, section) => {
    e.preventDefault();
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  
  // Handle external links
  const handleExternalLink = (e, url) => {
    e.preventDefault();
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  
  // Map section names to IDs
  const sectionMap = {
    'Discover': 'platform',
    'Build': 'platform',
    'Test': 'platform',
    'Launch': 'platform',
    'Institutes': 'institutes',
    'Ventures': 'ventures',
    'Team': 'team',
    'Contact': 'contact'
  };
  
  const handleFooterClick = (e, item) => {
    e.preventDefault();
    const sectionId = sectionMap[item] || item.toLowerCase();
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  
  // Handle email click - opens Gmail
  const handleEmailClick = (e) => {
    e.preventDefault();
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to=contact@aquanimitygroup.com', '_blank');
  };
  
  return (
    <footer style={{ marginTop: 100, paddingTop: 48, paddingBottom: 40, borderTop: '1px solid var(--rule)', fontFamily: "'Red Hat Display', 'Red Hat Display Variable', sans-serif" }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 32 }} className="ftr-grid">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div>
              <div className="logo-image-container">
                <img 
                  src={process.env.PUBLIC_URL + '/images/logo1.png'} 
                  alt="AQUANIMITY BIOHUBS™" 
                  className="nav-logo-image"
                  style={{ 
                    height: '40px', 
                    width: 'auto',
                    objectFit: 'contain'
                  }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150x40?text=AQUANIMITY';
                  }}
                />
              </div>
            </div>
          </div>
          <p style={{ fontSize: 14, color: '#0E1136', maxWidth: 320, lineHeight: 1.55, fontFamily: "'Red Hat Display', sans-serif", fontWeight: 400,textAlign:'justify' }}>
            Discovering, translating and commercializing biosciences for Bangladesh and beyond.
          </p>
        </div>
        
        <FooterCol title="Company" items={['Institutes','Ventures','Team','News']} onClick={handleFooterClick} />
        
        {/* Connect Column with LinkedIn link */}
        <div>
          <div className="label" style={{ marginBottom: 14, fontSize: 11, letterSpacing: '0.2em', color: 'var(--accent)', fontFamily: "'Red Hat Display', sans-serif", fontWeight: 600 }}>
            Connect
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
            <li>
              <a 
                href="https://www.linkedin.com/company/aquanimitygroup/about/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  fontSize: 14, 
                  color: '#0E1136',
                  textDecoration: 'none',
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontWeight: 400,
                  transition: 'color 0.2s ease',
                  cursor: 'pointer',
                  display: 'inline-block'
                }} 
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#0E1136'}
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
        
        {/* Contact Column with Email link - Updated to open Gmail */}
        <div>
          <div className="label" style={{ marginBottom: 14, fontSize: 11, letterSpacing: '0.2em', color: 'var(--accent)', fontFamily: "'Red Hat Display', sans-serif", fontWeight: 600 }}>
            Contact
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
            <li style={{ fontSize: 14, color: '#0E1136', fontFamily: "'Red Hat Display', sans-serif", fontWeight: 400 }}>
              Address: Plot 68-71, Block K, Road 4 Rupnagar Rd, Dhaka 1216
            </li>
            <li style={{ fontSize: 14, color: '#0E1136', fontFamily: "'Red Hat Display', sans-serif", fontWeight: 400 }}>
              Phone: 
              +8801310346592
            </li>
            <li>
              <a 
                href="#"
                onClick={handleEmailClick}
                style={{ 
                  fontSize: 14, 
                  color: '#0E1136',
                  textDecoration: 'none',
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontWeight: 400,
                  transition: 'color 0.2s ease',
                  cursor: 'pointer',
                  display: 'inline-block'
                }} 
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#0E1136'}
              >
                contact@aquanimitygroup.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div style={{ 
        marginTop: 64, 
        paddingTop: 24, 
        borderTop: '1px solid var(--rule)', 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: 16, 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <div className="mono" style={{ fontSize: 11, letterSpacing: '0.18em', color: 'var(--muted)', fontFamily: "'Red Hat Display', sans-serif", fontWeight: 500 }}>
          © {new Date().getFullYear()} AQUANIMITY GROUP. ALL RIGHTS RESERVED.
        </div>
        <div className="mono" style={{ fontSize: 11, letterSpacing: '0.18em', color: 'var(--muted)', fontFamily: "'Red Hat Display', sans-serif", fontWeight: 500 }}>
          DHAKA, BANGLADESH
        </div>
      </div>
      
      <style>{`
        @media (max-width: 900px) {
          .ftr-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 550px) {
          .ftr-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}

function FooterCol({ title, items, onClick }) {
  return (
    <div>
      <div className="label" style={{ marginBottom: 14, fontSize: 11, letterSpacing: '0.2em', color: 'var(--accent)', fontFamily: "'Red Hat Display', sans-serif", fontWeight: 600 }}>
        {title}
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
        {items.map((i, x) => (
          <li key={x}>
            <button 
              onClick={(e) => onClick(e, i)}
              style={{ 
                fontSize: 14, 
                color: '#0E1136',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                fontFamily: "'Red Hat Display', sans-serif",
                fontWeight: 400,
                transition: 'color 0.2s ease'
              }} 
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#0E1136'}
            >
              {i}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FooterCTA;