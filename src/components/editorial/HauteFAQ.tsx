import React, { useRef, useState, useEffect } from 'react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What makes ELHSAN extraits de parfum last 14+ hours?',
    answer: 'Our formulations feature exceptionally high pure oil concentrations (25% to 35%) compounded with aged resinous accords, precious Grasse orris root, and rich ambers. Each batch is matured in temperature-regulated vats for six weeks to guarantee enduring projection and sillage.'
  },
  {
    id: 'faq-2',
    question: 'Are ELHSAN creations skin-safe and IFRA certified?',
    answer: 'Yes, every fragrance is created in strict accordance with International Fragrance Association (IFRA) global standards. We use cosmetic-grade grain alcohol and natural extracts, ensuring formulas are hypoallergenic, dermatologist approved, and gentle on sensitive skin.'
  },
  {
    id: 'faq-3',
    question: 'How does the complimentary gift box and velvet pouch arrive?',
    answer: 'Every order is treated as a private presentation. Your flacon is nestled inside our architectural gold-foiled rigid presentation box, accompanied by a custom black velvet travel pouch and a certified Certificate of Authenticity.'
  },
  {
    id: 'faq-4',
    question: 'What is your shipping timeframe and tracking policy?',
    answer: 'We offer complimentary express insured shipping across Pakistan and the UAE. Orders dispatched before 2:00 PM are handed to our secure courier the same day, with average delivery within 2 to 3 business days alongside real-time SMS tracking.'
  },
  {
    id: 'faq-5',
    question: 'How should I store my luxury perfume to preserve its character?',
    answer: 'To protect the delicate top notes and rich amber base resins, store your bottle in a cool, dry place away from direct sunlight and sudden temperature shifts. The flacon box or velvet pouch provides optimal preservation.'
  }
];

export const HauteFAQ: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [openId, setOpenId] = useState<string | null>('faq-1');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -50px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleFAQ = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section
      className={`simple-faq-section ${isInView ? 'in-view' : ''}`}
      id="faq"
      ref={sectionRef}
    >
      <div className="simple-faq-container">
        {/* FAQ Header */}
        <div className="simple-faq-header">
          <span className="faq-kicker-label font-sans">FREQUENTLY ASKED QUESTIONS</span>
          <h2 className="simple-faq-title font-cinzel">
            <span className="faq-title-line">Everything you need to know</span>
            <span className="faq-title-line font-editorial italic font-normal text-[#8c7247]">
              about our haute fragrances
            </span>
          </h2>
        </div>

        {/* FAQ List */}
        <div className="simple-faq-list">
          {FAQ_DATA.map(item => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`simple-faq-card ${isOpen ? 'faq-open' : ''}`}
              >
                <button
                  className="simple-faq-question-btn"
                  onClick={() => toggleFAQ(item.id)}
                  aria-expanded={isOpen}
                >
                  <span className="simple-question-text font-cinzel font-medium">
                    {item.question}
                  </span>
                  <div className="simple-faq-icon-circle">
                    <span className="faq-icon-symbol font-sans">
                      {isOpen ? '−' : '+'}
                    </span>
                  </div>
                </button>

                <div
                  className={`simple-faq-answer-collapse ${isOpen ? 'answer-expanded' : ''}`}
                  style={{ maxHeight: isOpen ? '240px' : '0px' }}
                >
                  <div className="simple-faq-answer-body">
                    <p className="simple-answer-text font-sans">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
