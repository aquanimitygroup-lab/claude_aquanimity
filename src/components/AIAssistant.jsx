import React, { useState, useRef, useEffect } from 'react';

// ============================================================
//  COMPLETE KNOWLEDGE BASE — built from all your site files
// ============================================================
const KNOWLEDGE_BASE = [
  // ---------- COMPANY ----------
  {
    keywords: ['aquanimity', 'company', 'about', 'who are you', 'what is aquanimity', 'what do you do', 'biohub', 'bio hub', 'overview'],
    answer: "Aquanimity BioHubs™ is an integrated bioinnovation enterprise building the bioeconomy of Bangladesh and beyond. We unite four interdisciplinary institutes, four ventures, world-class scientists, academia, and strategic partners to discover, translate, and commercialize novel biosciences. Our mission: turn biodiversity into biology, biology into engineering, engineering into products, and products into global impact."
  },
  {
    keywords: ['mission', 'vision', 'goal', 'purpose', 'what is your mission'],
    answer: "Our mission is to discover, translate, and commercialize biosciences for Bangladesh and beyond — building the BioHub that unites institutes, scientists, academia, and strategic partners."
  },
  {
    keywords: ['location', 'where', 'address', 'office', 'headquarters', 'hq', 'dhaka'],
    answer: "Aquanimity Bangladesh Ltd. is headquartered at Plot 68-71, Block K, Road 4, Rupnagar Rd, Dhaka 1216, Bangladesh."
  },
  {
    keywords: ['contact', 'email', 'reach', 'talk', 'phone', 'call', 'get in touch'],
    answer: "You can reach us at:\n📧 contact@aquanimitygroup.com\n📞 +8801310346592\n📍 Plot 68-71, Block K, Road 4, Rupnagar Rd, Dhaka 1216\n\nOr scroll down to the 'Partner with Us' section to send a brief."
  },
  {
    keywords: ['social', 'linkedin', 'instagram', 'twitter', 'x'],
    answer: "You can follow Aquanimity on:\n• LinkedIn: linkedin.com/company/aquanimitygroup\n• Instagram: @aquanimitygroup"
  },

  // ---------- INSTITUTES ----------
  {
    keywords: ['institutes', 'all institutes', 'four institutes', 'list institutes', 'what institutes'],
    answer: "Aquanimity BioHubs™ has 4 interdisciplinary institutes:\n\n01 — Institute of Health Sciences\n02 — Institute of Applied Bioengineering & Materials Science\n03 — Institute of Omics & Molecular Microbiology\n04 — Institute of Computational Biology & AI\n\nAsk about any one for details."
  },
  {
    keywords: ['health sciences', 'institute of health sciences', 'health institute', 'metabolic health', 'nutraceuticals', 'functional beverages'],
    answer: "Institute of Health Sciences (Institute 01)\n\nFocus: Translating biology into daily health solutions — metabolic health, preventive nutrition, functional beverages, and phytopharmaceutical innovation.\n\nFlagship programs: SuperWater (clinically studied functional water), Nutraceutical formulations from indigenous biodiversity, and future products in digestion, cognitive health, cardiovascular wellness, and precision nutrition.\n\nFocus Areas: Functional Beverages, Metabolic Health, Nutraceuticals, Consumer Biotech."
  },
  {
    keywords: ['bioengineering', 'applied bioengineering', 'materials science', 'biomaterials', 'drug delivery', 'vaccine delivery', 'polymersomes', 'biosensors'],
    answer: "Institute of Applied Bioengineering & Materials Science (Institute 02)\n\nFocus: Engineering advanced biological materials, delivery systems, biomaterials, and next-generation healthcare technologies.\n\nCore work: Next-generation vaccine and biologics delivery platform — nanoparticle-based delivery systems improving antigen loading, immune presentation, thermostability, and accessibility for LMICs. Also explores indigenous biomaterials, sustainable packaging, biosensor-enabled health products.\n\nFocus Areas: Drug Delivery, Vaccine Delivery, Polymersomes, Biomaterials, Medical Materials, Biosensors, Sustainable Packaging, Cancer Therapy."
  },
  {
    keywords: ['omics', 'molecular microbiology', 'genomics', 'microbiome', 'marine biology', 'enzyme engineering', 'biofertilizers', 'metagenomics', 'blue microbiome institute'],
    answer: "Institute of Omics & Molecular Microbiology (Institute 03)\n\nFocus: Discovering useful biology from Bangladesh's living systems — mangroves, soils, plants, microbes, and the human microbiome.\n\nFlagship: Blue Microbiome Initiative — investigates microbes for plastic degradation, bioremediation, biofertilizers, climate adaptation, and industrial biotechnology.\n\nFocus Areas: Genomics, Microbial Biotechnology, Enzyme Engineering, Marine Biology, Biofertilizers, Metagenomics."
  },
  {
    keywords: ['computational biology', 'ai institute', 'artificial intelligence', 'bioinformatics', 'protein modeling', 'drug discovery', 'admet', 'bioplatform', 'omnibio institute'],
    answer: "Institute of Computational Biology & AI (Institute 04)\n\nFocus: The intelligence layer of Aquanimity — using AI, bioinformatics, protein modeling, molecular simulation to accelerate discovery across all institutes.\n\nFlagship: The Aquanimity Bioplatform — an integrated computational biology engine for organizing biological data, identifying promising compounds/proteins, predicting molecular interactions.\n\nFocus Areas: AI Drug Discovery, Protein Modeling, Bioinformatics, ADME Prediction, Enzyme Engineering, Biological Data Platforms."
  },

  // ---------- VENTURES ----------
  {
    keywords: ['ventures', 'all ventures', 'four ventures', 'list ventures', 'products', 'portfolio'],
    answer: "Aquanimity has 4 category-defining ventures:\n\n1️⃣ SuperWater — Enhanced functional water\n2️⃣ The Blue Microbiome Initiative — Environmental remediation\n3️⃣ OmniBio — Computational biology platform\n4️⃣ ThermoReVaQ — Cold-chain-free vaccine delivery\n\nAsk about any one for details."
  },
  {
    keywords: ['superwater', 'super water', 'functional water', 'enhanced water', 'hydration', 'glucose control'],
    answer: "SuperWater (Venture 01)\n\nTag: Enhanced Water\n\nPatented and clinically validated. Following successful 150-participant human trials confirming benefits for hydration, post-meal glucose control, and heart health, our functional water has proven its efficacy. We are now preparing full-scale production to bring smarter daily wellness to everyone."
  },
  {
    keywords: ['blue microbiome', 'microbiome initiative', 'plastic', 'pvc', 'pet', 'polyurethane', 'plastic degrading', 'environmental remediation', 'waste-free'],
    answer: "The Blue Microbiome Initiative (Venture 02)\n\nTag: Environmental Remediation\n\nEngineering biology for a cleaner planet. By isolating and mutagenizing coastal bacteria that break down persistent PVC, PET, and polyurethane, we are decoding key genetic pathways to commercially produce powerful plastic-degrading enzymes for a waste-free future."
  },
  {
    keywords: ['omnibio', 'omni bio', 'molprofiler', 'docking', 'admet', 'mutation analysis', 'enzyme discovery', 'computational platform'],
    answer: "OmniBio (Venture 03)\n\nTag: Computational Biology\n\nOmniBio is Aquanimity's computational biology platform unifying tools for drug discovery and protein engineering — including MolProfiler (a Docking and ADMET analysis tool), a mutation analysis engine, and an enzyme discovery platform. Core modules are functional, with integration underway toward a unified research workflow."
  },
  {
    keywords: ['thermorevaq', 'thermo revaq', 'vaccine', 'mrna', 'sirna', 'cold chain', 'lnp', 'chimeric vaccine', 'vaccine engineering'],
    answer: "ThermoReVaQ (Venture 04)\n\nTag: Vaccine Engineering\n\nReinventing vaccine delivery without the cold chain. Our breakthrough polymer replaces traditional LNPs, eliminating refrigeration requirements while enhancing bioavailability. We are developing next-generation mRNA, siRNA, and chimeric vaccines to make life-saving therapeutics accessible worldwide."
  },

  // ---------- TEAM ----------
  {
    keywords: ['team', 'our team', 'people', 'who works', 'members', 'leadership'],
    answer: "Our team is an interdisciplinary cohort of 40+ founders, scientists, and operators spanning Bangladesh, US, UK, Switzerland, and Netherlands.\n\nCategories:\n• Founding Scientists\n• Scientific Advisory Board\n• Consultants\n• Founding Management Team\n• Research Associates\n\nAsk about any specific person or category."
  },
  {
    keywords: ['syed hossainy', 'hossainy', 'drug eluting stent', 'stent inventor'],
    answer: "Syed Hossainy, PhD — Founding Scientist and Chair, Science Advisory Board; Director of Applied Bioengineering, UC Berkeley.\n\nA prolific inventor with 286 issued patents and ~390 pending. Recognized as co-inventor of the first Drug Eluting Stents. Formerly led Abbott Vascular's innovation incubator.\n\nAt the BioHub, he sets scientific direction, guides translational R&D, and mentors teams on biomaterials, bioengineering design, and regulatory strategy."
  },
  {
    keywords: ['abul iqbal', 'iqbal', 'ferrari red', 'perkin medal', 'pigments'],
    answer: "Abul Iqbal, PhD — Founding Scientist and Senior Advisor, Chemistry.\n\nWorld-renowned chemist, recipient of the Society of Dyers and Colourists' Perkin Medal (1993) for pioneering the chemistry behind DPP pigments — the core of the signature Ferrari Red. Former Head of R&D at Ciba-Geigy; author of 100+ patents.\n\nAt the BioHub, he advises on high-performance pigments, polymers, and sustainable materials."
  },
  {
    keywords: ['abed chaudhury', 'abed', 'panchabrihi', 'five-harvest rice', 'methane fungus'],
    answer: "Abed Chaudhury, PhD — Senior Scientific Advisor.\n\nLeading geneticist with 3+ decades of experience. Internationally known for discovering Panchabrihi (five-harvest rice). Former Hoffman-LaRoche Fellow of Molecular Biology at MIT, Principal Scientist at Syngenta Australia, and Head of Research Innovation at Loam Bio. Also discovered a fungus reducing cattle methane emissions by up to 90%.\n\nAt the BioHub, he directs plant genetics, soil & marine microbiomes, and CRISPR-enabled crop innovation."
  },
  {
    keywords: ['shoeb ahmed', 'shoeb', 'buet', 'abri', 'chemical engineering chair'],
    answer: "Shoeb Ahmed, PhD — Senior Scientific Advisor; Chair, Institute of Applied Bioengineering & Materials Science; Chair and Professor, Dept. of Chemical Engineering, BUET.\n\nHolds a PhD from North Carolina State University. Research spans industrial processes, intracellular signaling, and advanced microscopy.\n\nAt the BioHub, he leads process development, scale-up, and regulatory engineering — overseeing manufacturing of thermoresponsive polymersome vaccines, bioPET packaging, and other bio-engineered products."
  },
  {
    keywords: ['samir hossainy', 'samir', 'polymersomes', 'thermoreversible'],
    answer: "Samir Hossainy, PhD — Program Director, Novel Delivery Technologies; Postdoctoral Associate, NYU Tandon.\n\nCo-developer of thermoreversible polymersomes that self-assemble in water, enabling high-efficiency loading of proteins and siRNA for drug and vaccine delivery. PhD in Molecular Engineering from University of Chicago.\n\nAt the BioHub, he leads the thermoreversible polymersome platform — advancing vaccines, cancer immunotherapy, and tolerogenic therapies."
  },
  {
    keywords: ['nafisa islam', 'nafisa', 'biosensor', 'sanitary pads'],
    answer: "Nafisa Islam, PhD — Senior Scientific Advisor; Professor, Dept. of Chemical Engineering, BUET.\n\nSpecialist in biocompatible materials, biosensing, and environmental chemistry. PhD from North Carolina State University.\n\nAt the BioHub, she leads development of biosensor-based sanitary pads and women's health diagnostics."
  },
  {
    keywords: ['ayesha banu', 'ayesha', 'gender studies'],
    answer: "Ayesha Banu, PhD — Senior Advisor; Professor, Dept. of Women and Gender Studies, University of Dhaka.\n\nExpert in gender studies with research focus on equity and inclusion. PhD on the Bangladesh women's movement.\n\nAt the BioHub, she provides expertise on gender, socio-cultural context, and community outreach — guiding ethical frameworks for women-centric innovations."
  },
  {
    keywords: ['rifa punnota', 'rifa', 'computational neuroscience', 'oxford'],
    answer: "Rifa Punnota — Program Director, Computational Neuroscience; PhD Researcher, University of Oxford.\n\nExpertise in developing computational models for neurodegenerative disease prediction. MSc in Translational Neuroscience from Imperial College London.\n\nAt the BioHub, she leads translational neuro-psychiatric research, focusing on computational models of depression and mental health."
  },
  {
    keywords: ['tasnim mostafa', 'tasnim', 'anonna', 'meghna group', 'sanitary napkin'],
    answer: "Tasnim Mostafa — Program Director, Women's Health Innovation; Director of Meghna Group of Industries (MGI).\n\nFounder of Anonna, one of the leading sanitary napkin brands in Bangladesh.\n\nAt the BioHub, she drives partnerships with industry and civil society for women's health products, including biosensor sanitary pads and reproductive health interventions."
  },
  {
    keywords: ['oyishee ahmad', 'oyishee', 'ipsc', 'stem cell', 'sanquin', 'amsterdam'],
    answer: "Oyishee Ahmad — Program Director, Regenerative and Stem Cell Biology; PhD Researcher, Sanquin Research and University of Amsterdam.\n\nExpertise in developing iPSC models for blood cell generation and regenerative medicine. PhD at University of Amsterdam.\n\nAt the BioHub, she bridges Applied Bioengineering and Genomics/Microbiomics Institutes — developing iPSC-derived blood cells, organoids, and regenerative platforms."
  },
  {
    keywords: ['rafez alam', 'rafez', 'chairman', 'convince group', 'bgapmea'],
    answer: "Rafez Alam Chowdhury — Chairman.\n\nChairman, Convince Group. Former President, BGAPMEA. Former President, Gulshan Youth Club.\n\n25+ years of industrial experience in the ready-made garments (RMG) industry. Provides strategic direction, governance oversight, and long-term growth leadership of Aquanimity Bangladesh Limited."
  },
  {
    keywords: ['rashik alam', 'rashik', 'managing director', 'md'],
    answer: "Rashik Alam Chowdhury — Managing Director.\n\nExecutive Director, Convince Group; Associate Director, Tamishna Group; Director, Gunee Bangladesh Ltd.\n\nOversees all stages of company development and makes all key decisions."
  },
  {
    keywords: ['arif jawad', 'arif', 'executive director operations'],
    answer: "Arif Jawad Siam — Executive Director (Operations).\n\nDirector, Gunee Bangladesh Ltd. MSc in Medicinal Chemistry from University College London.\n\nOversees operational coordination across all divisions in close partnership with the Managing Director."
  },
  {
    keywords: ['farzhad ahmed', 'farzhad', 'hr admin sales'],
    answer: "Farzhad Ahmed — Executive Director (HR, Admin, Sales).\n\nExecutive Director, Convince Zipper and Accessories. BSc Economics from University of Texas at Austin.\n\nLeads organizational administration and revenue-generating functions, ensuring talent development and operational efficiency."
  },
  {
    keywords: ['faizus saquib', 'faizus', 'cmo', 'chief marketing'],
    answer: "Faizus Saquib Chowdhury — Chief Marketing Officer.\n\nCredit Risk Analyst at Citibank NA; formerly at The City Bank. MSc Economics, University of Warwick.\n\nDrives bold, purpose-led growth by building brand trust and scaling customer engagement. Instrumental in early ideation of Aqualite."
  },
  {
    keywords: ['saif haque', 'saif', 'cfo', 'chief financial'],
    answer: "Saif Haque — Chief Financial Officer.\n\nPreviously at DSE and Nestle. BBA in Finance and Accounting, North South University.\n\nLeads budget allocation, product costing, and all other financial matters of the company."
  },
  {
    keywords: ['samman haque', 'samman', 'marketing manager'],
    answer: "Samman Haque — Manager, Marketing.\n\nBBA in Accounting, North South University.\n\nWorks alongside the CMO on brand development and product marketing."
  },
  {
    keywords: ['mashnoon', 'mashnoon mayad', 'ai ml engineer', 'aresnn'],
    answer: "Mashnoon Mayad — AI/ML Engineer, Institute of Computational Biology & AI.\n\nBSc in Computer Science, BRAC University. Thesis: AresNN — attention-based CNN Transformer hybrid for explainable skin cancer detection.\n\nAt Aquanimity Biohubs, he is AI/ML Lead developing the Aquanimity Bioplatform for computational biodiscovery, including antibody design."
  },
  {
    keywords: ['mehedi hasan pritom', 'pritom', 'microbiologist'],
    answer: "Mehedi Hasan Pritom — Senior Microbiologist, Institute of Omics & Molecular Microbiology.\n\nBSc in Biotechnology and Genetic Engineering, Khulna University; MSc in Biochemical Technology, BUET.\n\nKey member of the Blue Microbiome Initiative — works on environmental microbe identification for remediation and genetic engineering of selected strains."
  },
  {
    keywords: ['fatin noor', 'fatin', 'operations supply chain'],
    answer: "Fatin Noor — Executive, Operations and Supply Chain, Institute of Health Sciences.\n\nBSc in Biotechnology, North South University.\n\nAt Aquanimity Biohubs, Fatin is establishing Quality Assurance SOPs aligned with FDA, EFSA, BSTI, BFSA standards."
  },
  {
    keywords: ['rahul baroi', 'rahul', 'nutraceuticals'],
    answer: "Rahul Baroi — Junior Research Associate, Nutraceuticals and Vaccine Engineering, Institute of Applied Bioengineering & Materials Science.\n\nBSc in Chemical Engineering, BUET.\n\nFocuses on bioactive compound extraction, purification, HPLC quantification, formulation support, and preclinical evaluation — including vasicine optimization from Adhatoda vasica."
  },
  {
    keywords: ['borno das', 'borno'],
    answer: "Borno Das — Junior Research Associate, Nutraceuticals and Vaccine Engineering, Institute of Applied Bioengineering & Materials Science.\n\nBSc in Chemical Engineering, BUET.\n\nExpertise in HPLC, FTIR, UV-Vis spectroscopy, microwave-assisted extraction. Contributes to drug delivery research, vaccine engineering, OGTT, and sandwich ELISA-based biochemical evaluation."
  },
  {
    keywords: ['himel', 'himel hasan', 'md himel', 'md. himel hasan', 'software engineer', 'web developer', 'full stack', 'fullstack', 'developer', 'tech team', 'it team'],
    answer: "Md. Himel Hasan — Software Engineer.\n\nA Software Engineer with expertise in full-stack web development, system architecture, and cloud infrastructure. He holds a degree in Computer Science and Engineering from IUBAT, with a strong foundation in building scalable applications and robust backend systems.\n\nAt Aquanimity, he develops and maintains the company's digital platforms, ensuring seamless user experiences and implementing innovative solutions."
  },

  // ---------- PARTNERS ----------
  {
    keywords: ['partners', 'our partners', 'partner institutions', 'collaborators'],
    answer: "We partner with leading institutions across Bangladesh and globally, including:\n\n• ABRI (Applied Bioengineering Research Incubator, BUET)\n• IQ Consult GmbH\n• National Heart Foundation of Bangladesh\n• Diabetic Association of Bangladesh\n• Centre for Global Health Research, BADAS\n• Dept. of Bioengineering, UC Berkeley\n• University of Dhaka\n\nAsk about any partner for details."
  },
  {
    keywords: ['abri', 'applied bioengineering research incubator'],
    answer: "ABRI (Applied Bioengineering Research Incubator, BUET) — Research Partner.\n\nA premier research institution at BUET dedicated to advancing bioengineering research. Partners with Aquanimity on translational R&D, process development, and scale-up."
  },
  {
    keywords: ['iqc', 'iq consult'],
    answer: "IQ Consult GmbH — Implementation Partner.\n\nA global development organization committed to improving healthcare quality and access. Bridges research and real-world impact."
  },
  {
    keywords: ['heart foundation', 'nhf', 'national heart foundation'],
    answer: "National Heart Foundation of Bangladesh — Academic Partner.\n\nLeading cardiovascular research and healthcare institution in Bangladesh. Partners with us on cardiovascular health research and clinical trials."
  },
  {
    keywords: ['diabetic association', 'dab', 'diabetes bangladesh'],
    answer: "Diabetic Association of Bangladesh — Academic Partner.\n\nLeading institution for diabetes research and care in Bangladesh. Partners with us on metabolic health and diabetes research."
  },
  {
    keywords: ['cghr', 'centre for global health research', 'badas'],
    answer: "Centre for Global Health Research, BADAS — Academic Partner.\n\nFocused on bioengineering innovations for global health challenges. Based in Dhaka."
  },
  {
    keywords: ['uc berkeley', 'berkeley', 'bioengineering berkeley'],
    answer: "Department of Bioengineering, UC Berkeley — Academic Partner.\n\nWorld-class bioengineering program. Our connection is via Syed Hossainy, PhD, who is Director of Applied Bioengineering at UC Berkeley."
  },
  {
    keywords: ['university of dhaka', 'du', 'dhaka university'],
    answer: "University of Dhaka — Academic Partner.\n\nPremier public university in Bangladesh with strong bioengineering and research programs. Partners with us on academic collaborations and talent development."
  },
  {
    keywords: ['partner stats', 'publications', 'countries'],
    answer: "Our partnership footprint:\n📚 9+ Scientific Publications\n🤝 8+ Partner Institutions\n🌍 4+ Countries Operating"
  },

  // ---------- PLATFORM ----------
  {
    keywords: ['platform', 'bioplatform', 'bio platform', 'four phases', 'our platform', 'process'],
    answer: "The Aquanimity BioPlatform is a full-stack bioeconomy engine built on four phases:\n\n01 — Discover: Genomics, microbiology, and biodiversity exploration to identify novel biological assets.\n02 — Design: AI-powered protein design, formulation science, and engineering biology.\n03 — Build: Prototyping, clinical validation, and manufacturing scale-up.\n04 — Launch: Venture creation, market entry, and global distribution."
  },
  {
    keywords: ['discover phase', 'phase 1', 'phase one'],
    answer: "Phase 01 — Discover\n\nGenomics, microbiology, and biodiversity exploration to identify novel biological assets."
  },
  {
    keywords: ['design phase', 'phase 2', 'phase two'],
    answer: "Phase 02 — Design\n\nAI-powered protein design, formulation science, and engineering biology."
  },
  {
    keywords: ['build phase', 'phase 3', 'phase three'],
    answer: "Phase 03 — Build\n\nPrototyping, clinical validation, and manufacturing scale-up."
  },
  {
    keywords: ['launch phase', 'phase 4', 'phase four'],
    answer: "Phase 04 — Launch\n\nVenture creation, market entry, and global distribution."
  },

  // ---------- GENERAL ----------
  {
    keywords: ['hi', 'hello', 'hey', 'yo', 'good morning', 'good evening', 'salam', 'assalam'],
    answer: "Hello! 👋 I'm Q. Ask me about Aquanimity's institutes, ventures, team, partners, platform, or how to get in touch."
  },
  {
    keywords: ['thanks', 'thank you', 'thx', 'appreciate', 'shukriya'],
    answer: "You're welcome! Anything else you'd like to know?"
  },
  {
    keywords: ['help', 'what can you do', 'options', 'commands'],
    answer: "I can answer questions about:\n• Our 4 Institutes\n• Our 4 Ventures (SuperWater, Blue Microbiome, OmniBio, ThermoReVaQ)\n• Our Team & leadership\n• Our Partners\n• The BioPlatform\n• Contact info\n\nJust type your question!"
  },
  {
    keywords: ['career', 'job', 'hiring', 'vacancy', 'work with you'],
    answer: "We're always looking for talented scientists, engineers, and operators to help build the bioeconomy. Reach out via the 'Partner with Us' section or email contact@aquanimitygroup.com."
  },
  {
    keywords: ['collaborate', 'collaboration', 'partnership', 'work together', 'research partnership'],
    answer: "We're always open to research partnerships, visiting positions, and strategic collaborations. Send us a brief via the contact section or email contact@aquanimitygroup.com."
  }
];

const FALLBACK = "I'm not sure about that yet. Try asking about our institutes, ventures, team, partners, platform, or contact info.";

// ============================================================
//  MATCHING FUNCTION — keyword scoring with fuzzy fallback
// ============================================================
function findAnswer(question) {
  const q = question.toLowerCase().trim();
  if (!q) return FALLBACK;

  let bestMatch = null;
  let bestScore = 0;

  for (const entry of KNOWLEDGE_BASE) {
    let score = 0;
    for (const kw of entry.keywords) {
      const k = kw.toLowerCase();
      if (q.includes(k)) {
        score += k.length;
        if (new RegExp(`\\b${k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(q)) {
          score += 3;
        }
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  return bestMatch && bestScore >= 3 ? bestMatch.answer : FALLBACK;
}

// ============================================================
//  COMPONENT
// ============================================================
export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! 👋 I'm Q. Ask me anything about Aquanimity's institutes, ventures, team, partners, or platform." }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, typing, open]);

  const sendMessage = (text) => {
    const msg = (text ?? input).trim();
    if (!msg) return;

    const userMsg = { role: 'user', content: msg };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const answer = findAnswer(msg);
      setMessages(prev => [...prev, { role: 'assistant', content: answer }]);
      setTyping(false);
    }, 500);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Icon — only shows when chat is CLOSED */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="ai-fab"
          aria-label="Open AI Assistant"
        >
          <img
            src={process.env.PUBLIC_URL + '/images/favicon.jpeg'}
            alt="Aquanimity AI"
            className="ai-fab-img"
          />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="ai-window">
          <div className="ai-header">
            <div className="ai-header-left">
            <img 
                src={process.env.PUBLIC_URL + '/images/favicon1.png'}
                alt="Aquanimity Logo" 
                className="ai-logo"
            />
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <div className="ai-messages">
            {messages.map((m, i) => (
              <div key={i} className={`ai-msg ai-${m.role}`}>
                {m.content}
              </div>
            ))}
            {typing && (
              <div className="ai-msg ai-assistant ai-typing">
                <span></span><span></span><span></span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {messages.length <= 1 && (
            <div className="ai-suggestions">
              {['SuperWater', 'Institutes', 'Team', 'Partners', 'Contact'].map(s => (
                <button key={s} onClick={() => sendMessage(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="ai-input">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask a question…"
              rows={1}
            />
            <button onClick={() => sendMessage()} aria-label="Send">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      <style>{`
        .ai-fab {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: transparent;
          color: #fff;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 30px rgba(24, 26, 67, 0.4), 0 0 0 0 rgba(42,111,219,0.5);
          z-index: 9999;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          animation: ai-pulse 2.4s infinite;
          overflow: hidden;
          padding: 0;
        }
        .ai-fab:hover {
          transform: scale(1.08);
          box-shadow: 0 14px 40px rgba(24, 26, 67, 0.5);
        }
        .ai-fab:active { transform: scale(0.96); }

        .ai-fab-img {
          width: 80%;
          height: 80%;
          object-fit: cover;
          object-position: center;
          border-radius: 50%;
          display: block;
          pointer-events: none;
          user-select: none;
        }
          .ai-logo {
            width: 40px;
            height: 40px;
            object-fit: contain;
            border-radius: 50%;

            }

        @keyframes ai-pulse {
          0%   { box-shadow: 0 10px 30px rgba(24,26,67,0.4), 0 0 0 0 rgba(42,111,219,0.5); }
          70%  { box-shadow: 0 10px 30px rgba(24,26,67,0.4), 0 0 0 14px rgba(42,111,219,0); }
          100% { box-shadow: 0 10px 30px rgba(24,26,67,0.4), 0 0 0 0 rgba(42,111,219,0); }
        }

        .ai-window {
  position: fixed;
  bottom: 24px;        /* ← 96px theke 24px — niche chole ashbe */
  right: 24px;
  width: 380px;
  max-width: calc(100vw - 32px);
  height: 540px;
  max-height: calc(100vh - 140px);
  background: #0f1030;
  color: #fff;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 24px 70px rgba(0,0,0,0.55);
  z-index: 9999;
  font-family: 'Red Hat Display', sans-serif;
  animation: ai-slideUp 0.3s ease;
}
        @keyframes ai-slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .ai-header {
          padding: 14px 18px;
          background: #04a1bd;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 600;
          font-size: 14px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .ai-header-left { display: flex; align-items: center; gap: 8px; }
        .ai-dot {
          width: 8px; height: 8px; background: #4ade80;
          border-radius: 50%; box-shadow: 0 0 8px #4ade80;
        }
        .ai-header button {
          background: none; border: none; color: rgba(255,255,255,0.7);
          cursor: pointer; padding: 4px; display: flex; transition: color 0.2s;
        }
        .ai-header button:hover { color: #fff; }

        .ai-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          scrollbar-width: thin;
          background-color: #01B4D2;
        }
        .ai-messages::-webkit-scrollbar { width: 6px; }
        .ai-messages::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.15); border-radius: 3px;
        }

        .ai-msg {
          padding: 10px 14px;
          border-radius: 14px;
          max-width: 88%;
          font-size: 14px;
          line-height: 1.5;
          white-space: pre-wrap;
          word-wrap: break-word;
          animation: ai-fadeIn 0.3s ease;
        }
        @keyframes ai-fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ai-user {
          align-self: flex-end;
          background: white;
          color: #181A43;
          border-bottom-right-radius: 4px;
        }
        .ai-assistant {
          align-self: flex-start;
          background: white;
          border-bottom-left-radius: 4px;
          color: #181A43;
        }

        .ai-typing {
          display: flex; gap: 4px; padding: 12px 16px;
        }
        .ai-typing span {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(255,255,255,0.5);
          animation: ai-bounce 1.2s infinite;
        }
        .ai-typing span:nth-child(2) { animation-delay: 0.15s; }
        .ai-typing span:nth-child(3) { animation-delay: 0.3s; }
        @keyframes ai-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-5px); opacity: 1; }
        }

        .ai-suggestions {
          display: flex; gap: 6px; padding: 0 14px 10px; flex-wrap: wrap;
          background:  #01B4D2;
        }
        .ai-suggestions button {
          color:  #181A43;
          background:  white;
          border: 1px solid rgba(255,255,255,0.15);
          
          padding: 6px 12px; border-radius: 999px;
          font-size: 12px; cursor: pointer;
          transition: all 0.2s; font-family: inherit;
        }
        .ai-suggestions button:hover {
          background: rgba(255,255,255,0.12);
          border-color: rgba(255,255,255,0.3);
        }

        .ai-input {
          display: flex; gap: 8px; padding: 12px;
          border-top: 1px solid rgba(255,255,255,0.08);
          background: #01B4D2;
        }
        .ai-input textarea {
          flex: 1; resize: none; border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.15);
          background: white;
          color: #181A43;
          font-family: inherit; font-size: 14px;
          outline: none; max-height: 90px;
          transition: border-color 0.2s;
        }
        .ai-input textarea:focus { border-color: #2A6FDB; }
        .ai-input textarea::placeholder { color: #181A43; }
        .ai-input button {
          width: 42px; height: 42px; border-radius: 50%;
          border: none;
          background: white;
          color: #181A43; display: flex; align-items: center;
          justify-content: center; cursor: pointer;
          transition: transform 0.2s; align-self: flex-end;
        }
        .ai-input button:hover { transform: scale(1.05); }
        .ai-input button:active { transform: scale(0.95); }

        @media (max-width: 480px) {
          .ai-window {
            width: calc(100vw - 24px);
            right: 12px;
            bottom: 88px;
            height: calc(100vh - 140px);
            max-height: 560px;
            border-radius: 16px;
          }
          .ai-fab {
            right: 16px; bottom: 16px;
            width: 54px; height: 54px;
          }
        }
      `}</style>
    </>
  );
}