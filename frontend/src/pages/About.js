import React from 'react';
import {
  AboutHero,
  AboutMissionVision,
  AboutValues,
  AboutTeam,
  AboutCta
} from '../components/about';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-white">
      <AboutHero />
      <AboutMissionVision />
      <AboutValues />
      <AboutTeam />
      <AboutCta />
    </div>
  );
};

export default About;