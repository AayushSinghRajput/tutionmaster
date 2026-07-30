import React from 'react';
import {
  AboutHero,
  AboutMissionVision,
  AboutJourney,
  AboutValues,
  AboutTeam,
  AboutCta
} from '../components/about';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-25 to-white">
      <AboutHero />
      <AboutMissionVision />
      <AboutJourney />
      <AboutValues />
      <AboutTeam />
      <AboutCta />
    </div>
  );
};

export default About;