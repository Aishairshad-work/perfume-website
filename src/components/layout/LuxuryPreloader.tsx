import React, { useState, useEffect } from 'react';

interface LuxuryPreloaderProps {
  onComplete: () => void;
  minDuration?: number;
}

export const LuxuryPreloader: React.FC<LuxuryPreloaderProps> = ({
  onComplete,
  minDuration = 2800
}) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [phase, setPhase] = useState<'initial' | 'glow' | 'reveal' | 'ready'>('initial');

  useEffect(() => {
    const tGlow = setTimeout(() => setPhase('glow'), 200);
    const tReveal = setTimeout(() => setPhase('reveal'), 600);
    const tReady = setTimeout(() => setPhase('ready'), 2200);

    const stepMs = 30;
    const totalSteps = minDuration / stepMs;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const currentProg = Math.min(Math.round((currentStep / totalSteps) * 100), 100);
      setProgress(currentProg);

      if (currentProg >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onComplete();
          }, 800);
        }, 350);
      }
    }, stepMs);

    return () => {
      clearTimeout(tGlow);
      clearTimeout(tReveal);
      clearTimeout(tReady);
      clearInterval(timer);
    };
  }, [minDuration, onComplete]);

  const brandName = "ELHSAN PARFUMS";

  return (
    <div className={`preloader-wrapper ${isExiting ? 'preloader-exit' : ''}`} role="status" aria-label="Loading ELHSAN Parfums">
      {/* Dynamic Ambient Background */}
      <div className="preloader-ambient-bg">
        <div className={`ambient-glow-circle ${phase !== 'initial' ? 'glow-active' : ''}`} />
        <div className="ambient-particles">
          {[...Array(14)].map((_, i) => (
            <span
              key={i}
              className="gold-particle"
              style={{
                left: `${8 + i * 6.8}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${3.2 + (i % 3)}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Luxury Content */}
      <div className="preloader-content">
        {/* Brand Logo Stage with Light Sheen */}
        <div className={`logo-stage ${phase !== 'initial' ? 'stage-active' : ''}`}>
          <div className="logo-image-frame">
            <img
              src="/assets/logo.png"
              alt="ELHSAN Logo"
              className="preloader-logo"
            />
            <div className="logo-sheen-sweep" />
          </div>
        </div>

        {/* Brand Name & Tagline Reveal */}
        <div className={`brand-details ${phase === 'reveal' || phase === 'ready' ? 'brand-show' : ''}`}>
          <h1 className="brand-title">
            {brandName.split('').map((char, index) =>
              char === ' ' ? (
                <span key={index} className="brand-space"> </span>
              ) : (
                <span
                  key={index}
                  className="brand-letter"
                  style={{ animationDelay: `${0.65 + index * 0.05}s` }}
                >
                  {char}
                </span>
              )
            )}
          </h1>
          <p className="brand-tagline">SCENT THAT STAYS</p>
        </div>

        {/* Gold Luxury Progress Bar */}
        <div className="progress-container">
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
            <div
              className="progress-glow-head"
              style={{ left: `${progress}%` }}
            />
          </div>
          <div className="progress-info-row">
            <span className="progress-text">CRAFTING OLFACTORY ARTISTRY</span>
            <span className="progress-number">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
