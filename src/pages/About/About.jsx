import SectionHeading from '../../components/SectionHeading/SectionHeading';
import BlueprintBackground from '../../components/BlueprintBackground/BlueprintBackground';
import heroImage from '../../assets/hero.png';
import './About.css';

export default function About() {
  return (
    <div className="about-page">
      <BlueprintBackground motif="caduceus" opacity={0.05} position="center" scale={1.5}>
        <div className="container about-container section">
          <SectionHeading 
            eyebrow="Profile" 
            title="About Dr. Suman Pandab" 
            subtitle="Committed to holistic healing and personalized patient care."
          />
          
          <div className="about-grid">
            <div className="about-image-col">
              <div className="about-image-frame">
                <img src={heroImage} alt="Dr. Suman Pandab" className="about-image" />
              </div>
            </div>
            
            <div className="about-content-col">
              <div className="about-block">
                <h3 className="about-heading">Professional Background</h3>
                <p>
                  Dr. Suman Pandab is a qualified Homoeopathic Physician holding a B.H.M.S. degree from WBUHS and D.E.P.H. from VU.
                </p>
                <p>
                  He currently serves as a Medical Officer (Ayush) under the Department of Health & Family Welfare, Government of West Bengal.
                </p>
              </div>

              <div className="about-divider" aria-hidden="true"></div>

              <div className="about-block">
                <h3 className="about-heading">Care Philosophy</h3>
                <p>
                  Believing in the principles of safe, natural, and holistic healing, Dr. Pandab focuses on treating the individual as a whole rather than just addressing isolated symptoms. 
                </p>
                <p>
                  His patient-centred approach ensures that every individual receives personalized attention and a treatment plan tailored to their specific health needs.
                </p>
              </div>
              
              <div className="about-credentials-list">
                <div className="credential-item">
                  <span className="credential-title">B.H.M.S.</span>
                  <span className="credential-org">WBUHS</span>
                </div>
                <div className="credential-item">
                  <span className="credential-title">D.E.P.H.</span>
                  <span className="credential-org">VU</span>
                </div>
                <div className="credential-item full-width">
                  <span className="credential-title">Medical Officer (Ayush)</span>
                  <span className="credential-org">Dept. of Health & Family Welfare, Govt. of W.B.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BlueprintBackground>
    </div>
  );
}
