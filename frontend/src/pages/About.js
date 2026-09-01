import React from 'react';
import {
  AboutHero,
  AboutMissionVision,
  AboutValues,
  AboutTeam,
  AboutCta
} from '../components/about';

import SEO from '../components/seo/SEO';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-white">
      <SEO 
        title="About Us | TuitionMaster"
        description="Learn about TuitionMaster's mission to connect students with the best tutors in Nepal. Meet our team and discover our vision for the future of education."
        canonicalUrl="https://www.tuitionmaster.guru/about"
      />
      <AboutHero />
      <AboutMissionVision />
      <AboutValues />
      <AboutTeam />
      <AboutCta />
    </div>
  );
};

export default About;