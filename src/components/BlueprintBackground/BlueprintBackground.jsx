import './BlueprintBackground.css';

// Minimal, elegant technical stethoscope line-art
const StethoscopeSVG = () => (
  <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="blueprint-svg" aria-hidden="true">
    <path d="M 120 50 C 120 20, 180 20, 180 50 L 180 150 C 180 220, 120 220, 120 150 L 120 50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M 280 50 C 280 20, 220 20, 220 50 L 220 150 C 220 220, 280 220, 280 150 L 280 50" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M 150 170 C 150 250, 250 250, 250 170" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M 200 238 L 200 320 C 200 350, 220 370, 250 370 C 280 370, 300 350, 300 320 L 300 280" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="300" cy="270" r="15" stroke="currentColor" strokeWidth="2" />
    <circle cx="300" cy="270" r="4" fill="currentColor" />
    <circle cx="150" cy="40" r="6" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="250" cy="40" r="6" stroke="currentColor" strokeWidth="1.5" />
    
    {/* Drafting marks */}
    <line x1="50" y1="200" x2="350" y2="200" stroke="currentColor" strokeWidth="0.25" strokeDasharray="2 4" />
    <line x1="200" y1="20" x2="200" y2="380" stroke="currentColor" strokeWidth="0.25" strokeDasharray="2 4" />
    <circle cx="200" cy="200" r="120" stroke="currentColor" strokeWidth="0.1" />
    <circle cx="200" cy="200" r="160" stroke="currentColor" strokeWidth="0.1" strokeDasharray="1 5" />
  </svg>
);

// Minimal caduceus motif
const CaduceusSVG = () => (
  <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="blueprint-svg" aria-hidden="true">
    <line x1="200" y1="50" x2="200" y2="350" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="200" cy="40" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M 120 120 C 160 80, 240 80, 280 120 C 300 140, 280 180, 200 220 C 120 260, 100 300, 120 320" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M 280 120 C 240 80, 160 80, 120 120 C 100 140, 120 180, 200 220 C 280 260, 300 300, 280 320" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M 200 100 C 130 90, 80 120, 60 160 C 90 140, 150 140, 200 120" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M 200 100 C 270 90, 320 120, 340 160 C 310 140, 250 140, 200 120" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    
    <line x1="100" y1="200" x2="300" y2="200" stroke="currentColor" strokeWidth="0.25" strokeDasharray="2 4" />
    <circle cx="200" cy="200" r="100" stroke="currentColor" strokeWidth="0.1" />
  </svg>
);

const motifs = {
  stethoscope: StethoscopeSVG,
  caduceus: CaduceusSVG,
};

export default function BlueprintBackground({
  children,
  motif = 'stethoscope',
  opacity = 0.05,
  position = 'right',
  scale = 1,
  className = '',
  absolute = false,
}) {
  const MotifComponent = motifs[motif] || motifs.stethoscope;
  
  const bgStyle = {
    opacity,
    transform: `scale(${scale})`,
  };

  return (
    <div className={`blueprint-wrapper ${absolute ? 'blueprint-absolute' : ''} ${className}`}>
      <div className={`blueprint-motif blueprint-pos-${position}`} style={bgStyle}>
        <MotifComponent />
      </div>
      {children && (
        <div className="blueprint-content">
          {children}
        </div>
      )}
    </div>
  );
}
