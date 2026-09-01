import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "TuitionMaster | Find Qualified Tutors in Nepal", 
  description = "Find qualified tutors across Nepal with TuitionMaster. Connect with subject-matched teachers for school, +2, entrance preparation, and more.",
  canonicalUrl = "https://www.tuitionmaster.guru/",
  type = "website",
  imageUrl = "https://www.tuitionmaster.guru/logo.png"
}) => {
  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:site_name" content="TuitionMaster" />
      <meta property="og:locale" content="en_NP" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
};

export default SEO;
