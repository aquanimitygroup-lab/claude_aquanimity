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

function Contact({ palette, onOpen }) {
  const ref = useReveal();
  const [selectedRole, setSelectedRole] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', organisation: '', message: '' });

  const roles = ['Founder', 'Scientist', 'Investor', 'Operator', 'Government', 'Press'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => (
    formData.name.trim() !== '' && formData.email.trim() !== '' &&
    formData.organisation.trim() !== '' && formData.message.trim() !== ''
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) { alert('Please fill in all required fields.'); return; }

    const subject = `Brief from ${formData.name} - ${selectedRole || 'Guest'}`;
    const body = `Name: ${formData.name}\nEmail: ${formData.email}\nOrganisation: ${formData.organisation}\nRole: ${selectedRole || 'Not specified'}\n\nMessage:\n${formData.message}`;
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=aquanimitygroup@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');

    setFormData({ name: '', email: '', organisation: '', message: '' });
    setSelectedRole('');
  };

  const inputStyle = {
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
  };

  const labelStyle = {
    fontSize: 11,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#5a5a5a',
    display: 'block',
    marginBottom: 8,
    fontFamily: "'Red Hat Display', sans-serif",
    fontWeight: 500
  };

  return (
    <section ref={ref} id="contact" className="contact-section">
      <div className="contact-wrap">
        <div className="reveal contact-grid">
          {/* Left Side */}
          <div className="contact-left">
            <div className="contact-label">§ 06 — Partner with Us</div>
            <h2 className="contact-heading">
              Let's <span className="serif" style={{ fontStyle: 'italic', color: '#2a7a7a', fontWeight: 400, fontFamily: "'Times New Roman', Georgia, serif" }}>engineer</span>
              <br />what's next.
            </h2>
            <p className="contact-desc">
              Founders, scientists, capital, governments. If you're building the bioeconomy of the Global South, we want to hear from you.
            </p>
          </div>

          {/* Right Side - Form */}
          <div className="contact-form-card">
            <div className="contact-form-label">Brief · 100 Words</div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-field">
                <label style={labelStyle}>Your Name <span style={{ color: '#e74c3c' }}>*</span></label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange}
                  placeholder="Mahmuda Ahmed" required style={inputStyle}
                  onFocus={(e) => e.target.style.borderBottomColor = '#0f1a2a'}
                  onBlur={(e) => e.target.style.borderBottomColor = '#c8c5bc'} />
              </div>

              <div className="form-field">
                <label style={labelStyle}>Email <span style={{ color: '#e74c3c' }}>*</span></label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                  placeholder="you@org.com" required style={inputStyle}
                  onFocus={(e) => e.target.style.borderBottomColor = '#0f1a2a'}
                  onBlur={(e) => e.target.style.borderBottomColor = '#c8c5bc'} />
              </div>

              <div className="form-field">
                <label style={labelStyle}>Organisation <span style={{ color: '#e74c3c' }}>*</span></label>
                <input type="text" name="organisation" value={formData.organisation} onChange={handleInputChange}
                  placeholder="ICDDR,B / BRAC / Independent" required style={inputStyle}
                  onFocus={(e) => e.target.style.borderBottomColor = '#0f1a2a'}
                  onBlur={(e) => e.target.style.borderBottomColor = '#c8c5bc'} />
              </div>

              <div className="form-field">
                <label style={labelStyle}>I Am (Optional)</label>
                <div className="role-chips">
                  {roles.map((role) => (
                    <button key={role} type="button" onClick={() => setSelectedRole(role)}
                      className={`role-chip ${selectedRole === role ? 'active' : ''}`}>
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-field">
                <label style={labelStyle}>What's on your mind <span style={{ color: '#e74c3c' }}>*</span></label>
                <textarea name="message" value={formData.message} onChange={handleInputChange}
                  placeholder="A line or two — we'll reply within 48h." rows={3} required
                  style={{ ...inputStyle, resize: 'vertical' }}
                  onFocus={(e) => e.target.style.borderBottomColor = '#0f1a2a'}
                  onBlur={(e) => e.target.style.borderBottomColor = '#c8c5bc'} />
              </div>

              <button type="submit" className="submit-btn"
                disabled={!isFormValid()}
                style={{ opacity: isFormValid() ? 1 : 0.6, cursor: isFormValid() ? 'pointer' : 'not-allowed' }}
                onMouseEnter={(e) => { if (isFormValid()) { e.currentTarget.style.background = '#1a2444'; e.currentTarget.style.transform = 'scale(1.02)'; } }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#0E1136'; e.currentTarget.style.transform = 'scale(1)'; }}>
                Send brief <span>→</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal.in { opacity: 1; transform: translateY(0); }

        /* ===== DESKTOP ===== */
        .contact-section {
          padding: 72px 0 0;
          background: #FAF7F0;
          overflow: hidden;
          font-family: 'Red Hat Display', sans-serif;
        }

        .contact-wrap {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 32px;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 56px;
          align-items: start;
        }

        .contact-left {
          padding-top: 24px;
        }

        .contact-label {
          margin-bottom: 20px;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #1F6E7A;
          font-weight: 600;
        }

        .contact-heading {
          font-size: clamp(36px, 5.5vw, 88px);
          line-height: 1.05;
          letter-spacing: -0.02em;
          font-weight: 900;
          margin-bottom: 28px;
          color: #0E1136;
          margin-top: 0;
        }

        .contact-desc {
          font-size: 17px;
          line-height: 1.55;
          color: #0E1136;
          max-width: 460px;
          margin-bottom: 32px;
          text-align: justify;
          font-weight: 400;
        }

        .contact-form-card {
          background: #f5f2ea;
          border-radius: 16px;
          padding: 36px 44px;
          border: 1px solid #d8d5cc;
        }

        .contact-form-label {
          margin-bottom: 28px;
          font-size: 11px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgb(42, 122, 122);
          font-weight: 600;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-field label {
          font-size: 11px;
        }

        .role-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .role-chip {
          padding: 8px 16px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 500;
          border: 1px solid #c8c5bc;
          background: transparent;
          color: #0E1136;
          cursor: pointer;
          transition: all 0.25s ease;
          font-family: 'Red Hat Display', sans-serif;
        }

        .role-chip.active {
          border-color: #0f1a2a;
          background: #0f1a2a;
          color: white;
        }

        .role-chip:hover:not(.active) {
          border-color: #0f1a2a;
        }

        .submit-btn {
          width: 100%;
          background: #0E1136;
          color: white;
          padding: 15px 32px;
          border-radius: 999px;
          font-size: 15px;
          font-weight: 500;
          border: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 4px;
          transition: all 0.3s ease;
          font-family: 'Red Hat Display', sans-serif;
        }

        /* ===== TABLET (≤1000px) ===== */
        @media (max-width: 1000px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }

          .contact-left {
            padding-top: 0 !important;
          }
        }

        /* ===== MOBILE (≤768px) ===== */
        @media (max-width: 768px) {
          .contact-section {
            padding: 40px 0 0 !important;
          }

          .contact-wrap {
            padding: 0 16px !important;
          }

          .contact-grid {
            gap: 24px !important;
          }

          .contact-label {
            font-size: 10px !important;
            margin-bottom: 14px !important;
          }

          .contact-heading {
            font-size: 38.7px !important;
            margin-bottom: 16px !important;
          }

          .contact-desc {
            font-size: 14px !important;
            margin-bottom: 0 !important;
            max-width: 100% !important;
          }

          .contact-form-card {
            padding: 24px 20px !important;
            border-radius: 14px !important;
          }

          .contact-form-label {
            margin-bottom: 20px !important;
            font-size: 10px !important;
          }

          .contact-form {
            gap: 18px !important;
          }

          .contact-form input,
          .contact-form textarea {
            font-size: 14px !important;
            padding: 10px 0 !important;
          }

          .form-field label {
            font-size: 10px !important;
            margin-bottom: 6px !important;
          }

          .role-chips {
            gap: 6px !important;
          }

          .role-chip {
            padding: 6px 12px !important;
            font-size: 11px !important;
          }

          .submit-btn {
            padding: 13px 24px !important;
            font-size: 13px !important;
          }
        }

        /* ===== SMALL MOBILE (≤480px) ===== */
        @media (max-width: 480px) {
          .contact-section {
            padding: 32px 0 0 !important;
          }

          .contact-heading {
            font-size: 38.7px !important;
            margin-bottom: 12px !important;
          }

          .contact-desc {
            font-size: 13px !important;
          }

          .contact-form-card {
            padding: 20px 16px !important;
            border-radius: 12px !important;
          }

          .contact-form {
            gap: 14px !important;
          }

          .contact-form input,
          .contact-form textarea {
            font-size: 13px !important;
          }

          .form-field label {
            font-size: 9px !important;
            letter-spacing: 0.15em !important;
          }

          .role-chip {
            padding: 5px 10px !important;
            font-size: 10px !important;
          }

          .submit-btn {
            padding: 12px 20px !important;
            font-size: 12px !important;
          }
        }

        /* ===== EXTRA SMALL (≤360px) ===== */
        @media (max-width: 360px) {
          .contact-section {
            padding: 24px 0 0 !important;
          }

          .contact-heading {
            font-size: 38.7px !important;
          }

          .contact-form-card {
            padding: 16px 12px !important;
          }

          .contact-form {
            gap: 12px !important;
          }

          .role-chip {
            padding: 4px 8px !important;
            font-size: 9.5px !important;
          }
        }
      `}</style>
    </section>
  );
}

export default Contact;