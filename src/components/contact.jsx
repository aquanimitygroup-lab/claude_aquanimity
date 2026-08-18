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

function Contact({ palette, onOpen }) {
  const ref = useReveal();
  const [selectedRole, setSelectedRole] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organisation: '',
    message: ''
  });

  const roles = ['Founder', 'Scientist', 'Investor', 'Operator', 'Government', 'Press'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Check if all required fields are filled
  const isFormValid = () => {
    return formData.name.trim() !== '' && 
           formData.email.trim() !== '' && 
           formData.organisation.trim() !== '' && 
           formData.message.trim() !== '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if form is valid before submitting
    if (!isFormValid()) {
      alert('Please fill in all required fields.');
      return;
    }

    // Open Gmail compose with pre-filled details
    const subject = `Brief from ${formData.name} - ${selectedRole || 'Guest'}`;
    const body = `Name: ${formData.name}
Email: ${formData.email}
Organisation: ${formData.organisation}
Role: ${selectedRole || 'Not specified'}

Message:
${formData.message}`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=aquanimitygroup@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.open(gmailUrl, '_blank');

    // Log to console for debugging
    console.log('Form submitted:', { ...formData, role: selectedRole });
    
    // Reset form
    setFormData({ name: '', email: '', organisation: '', message: '' });
    setSelectedRole('');
  };

  return (
    <section 
      ref={ref} 
      id="contact" 
      style={{ 
        paddingTop: 120, 
        paddingBottom: 0,
        marginBottom: 0,
        background: '#FAF7F0',
        overflow: 'hidden'
      }}
    >
      <div className="wrap" style={{ maxWidth: 1400, margin: "0 auto", padding: "0 32px" }}>
        <div className="reveal" style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: 64,
          alignItems: 'start'
        }}>
          {/* Left Side - Content */}
          <div style={{ paddingTop: 32 }}>
            <div className="label" style={{ 
              marginBottom: 24, 
              fontSize: 11, 
              letterSpacing: "0.2em", 
              textTransform: "uppercase", 
              color: "#1F6E7A",
              fontFamily: "'Red Hat Display', sans-serif",
              fontWeight: 600
            }}>
              § 06 — Partner with Us
            </div>
            <h2 style={{ 
              fontSize: 'clamp(48px, 5.5vw, 88px)', 
              lineHeight: 1.05, 
              letterSpacing: '-0.02em', 
              fontWeight: 900, 
              marginBottom: 32,
              color:'#0E1136',
              fontFamily: "'Red Hat Display', sans-serif"
            }}>
              Let's <span className="serif" style={{ fontStyle: 'italic', color: '#2a7a7a', fontWeight: 400, fontFamily: "'Times New Roman', Georgia, serif" }}>engineer</span>
              <br />
              what's next.
            </h2>
            <p style={{ 
              fontSize: 18, 
              lineHeight: 1.55, 
              color: '#0E1136', 
              maxWidth: 460,
              marginBottom: 40,
              textAlign:'justify',
              fontFamily: "'Red Hat Display', sans-serif",
              fontWeight: 400
            }}>
              Founders, scientists, capital, governments. If you're building the bioeconomy of the Global South, we want to hear from you.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div style={{
            background: '#f5f2ea',
            borderRadius: 16,
            padding: '40px 48px',
            border: '1px solid #d8d5cc',
            marginBottom: 0
          }}>
            <div className="label" style={{ 
              marginBottom: 32, 
              fontSize: 11, 
              letterSpacing: "0.2em", 
              textTransform: "uppercase", 
              color: "rgb(42, 122, 122)",
              fontFamily: "'Red Hat Display', sans-serif",
              fontWeight: 600
            }}>
              Brief · 100 Words
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {/* Name */}
              <div>
                <label className="mono" style={{ 
                  fontSize: 11, 
                  letterSpacing: '0.2em', 
                  textTransform: 'uppercase', 
                  color: '#5a5a5a',
                  display: 'block',
                  marginBottom: 8,
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontWeight: 500
                }}>
                  Your Name <span style={{ color: '#e74c3c' }}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Mahmuda Ahmed"
                  required
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid #c8c5bc',
                    padding: '12px 0',
                    color: '#0E1136',
                    fontSize: 16,
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 400
                  }}
                  onFocus={(e) => e.target.style.borderBottomColor = '#0f1a2a'}
                  onBlur={(e) => e.target.style.borderBottomColor = '#c8c5bc'}
                />
              </div>

              {/* Email */}
              <div>
                <label className="mono" style={{ 
                  fontSize: 11, 
                  letterSpacing: '0.2em', 
                  textTransform: 'uppercase', 
                  color: '#5a5a5a',
                  display: 'block',
                  marginBottom: 8,
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontWeight: 500
                }}>
                  Email <span style={{ color: '#e74c3c' }}>*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@org.com"
                  required
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid #c8c5bc',
                    padding: '12px 0',
                    color: '#0E1136',
                    fontSize: 16,
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 400
                  }}
                  onFocus={(e) => e.target.style.borderBottomColor = '#0f1a2a'}
                  onBlur={(e) => e.target.style.borderBottomColor = '#c8c5bc'}
                />
              </div>

              {/* Organisation */}
              <div>
                <label className="mono" style={{ 
                  fontSize: 11, 
                  letterSpacing: '0.2em', 
                  textTransform: 'uppercase', 
                  color: '#5a5a5a',
                  display: 'block',
                  marginBottom: 8,
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontWeight: 500
                }}>
                  Organisation <span style={{ color: '#e74c3c' }}>*</span>
                </label>
                <input
                  type="text"
                  name="organisation"
                  value={formData.organisation}
                  onChange={handleInputChange}
                  placeholder="ICDDR,B / BRAC / Independent"
                  required
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid #c8c5bc',
                    padding: '12px 0',
                    color: '#0E1136',
                    fontSize: 16,
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 400
                  }}
                  onFocus={(e) => e.target.style.borderBottomColor = '#0f1a2a'}
                  onBlur={(e) => e.target.style.borderBottomColor = '#c8c5bc'}
                />
              </div>

              {/* Role Selection */}
              <div>
                <label className="mono" style={{ 
                  fontSize: 11, 
                  letterSpacing: '0.2em', 
                  textTransform: 'uppercase', 
                  color: '#5a5a5a',
                  display: 'block',
                  marginBottom: 12,
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontWeight: 500
                }}>
                  I Am (Optional)
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {roles.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setSelectedRole(role)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: 999,
                        fontSize: 13,
                        fontWeight: 500,
                        border: selectedRole === role ? '1px solid #0f1a2a' : '1px solid #c8c5bc',
                        background: selectedRole === role ? '#0f1a2a' : 'transparent',
                        color: selectedRole === role ? 'white' : '#0E1136',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease',
                        fontFamily: "'Red Hat Display', sans-serif"
                      }}
                      onMouseEnter={(e) => {
                        if (selectedRole !== role) {
                          e.currentTarget.style.borderColor = '#0f1a2a';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedRole !== role) {
                          e.currentTarget.style.borderColor = '#c8c5bc';
                        }
                      }}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="mono" style={{ 
                  fontSize: 11, 
                  letterSpacing: '0.2em', 
                  textTransform: 'uppercase', 
                  color: '#5a5a5a',
                  display: 'block',
                  marginBottom: 8,
                  fontFamily: "'Red Hat Display', sans-serif",
                  fontWeight: 500
                }}>
                  What's on your mind <span style={{ color: '#e74c3c' }}>*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="A line or two — we'll reply within 48h."
                  rows={3}
                  required
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid #c8c5bc',
                    padding: '12px 0',
                    color: '#0E1136',
                    fontSize: 16,
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'border-color 0.3s ease',
                    fontFamily: "'Red Hat Display', sans-serif",
                    fontWeight: 400
                  }}
                  onFocus={(e) => e.target.style.borderBottomColor = '#0f1a2a'}
                  onBlur={(e) => e.target.style.borderBottomColor = '#c8c5bc'}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                style={{
                  width: '100%',
                  background: '#0E1136',
                  color: 'white',
                  padding: '16px 32px',
                  borderRadius: 999,
                  fontSize: 15,
                  fontWeight: 500,
                  border: 'none',
                  cursor: isFormValid() ? 'pointer' : 'not-allowed',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  marginTop: 8,
                  transition: 'all 0.3s ease',
                  opacity: isFormValid() ? 1 : 0.6,
                  fontFamily: "'Red Hat Display', sans-serif"
                }}
                onMouseEnter={(e) => {
                  if (isFormValid()) {
                    e.currentTarget.style.background = '#1a2444';
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#0E1136';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                disabled={!isFormValid()}
              >
                Send brief
                <span style={{ fontSize: 16, fontFamily: "'Red Hat Display', sans-serif" }}>→</span>
              </button>
            </form>
          </div>
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
        
        @media (max-width: 1000px) {
          #contact .wrap > div {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
        }
        
        @media (max-width: 600px) {
          #contact .wrap {
            padding: 0 20px !important;
          }
          #contact [style*="padding: 40px 48px"] {
            padding: 32px 24px !important;
          }
        }
      `}</style>
    </section>
  );
}

export default Contact;