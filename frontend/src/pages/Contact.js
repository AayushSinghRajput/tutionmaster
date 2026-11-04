import { Helmet } from 'react-helmet-async';
import {
  ContactHero,
  ContactMethods,
  ContactForm,
  ContactSidebar,
  ContactMap
} from '../components/contact';
import { faqs } from '../constants/contact/contactData';
import SEO from '../components/seo/SEO';

const Contact = () => {
  const contactFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const contactPointSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact TuitionMaster",
    "url": "https://www.tuitionmaster.guru/contact",
    "description": "Get in touch with TuitionMaster customer support, student advisors, or tutor onboarding team in Nepal.",
    "mainEntity": {
      "@type": "EducationalOrganization",
      "name": "TuitionMaster",
      "telephone": "+9779805981168",
      "email": "aayushsinghrajput3003@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Kathmandu",
        "addressCountry": "NP"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-white">
      <SEO 
        title="Contact Us | TuitionMaster Nepal"
        description="Get in touch with the TuitionMaster team. We are here to help you find the right tutor or assist you with any questions regarding our platform."
        canonicalUrl="https://www.tuitionmaster.guru/contact"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(contactFaqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(contactPointSchema)}
        </script>
      </Helmet>

      <ContactHero />
      <ContactMethods />
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-brand-50 to-gold-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start">
            <ContactForm />
            <ContactSidebar />
          </div>
        </div>
      </section>
      <ContactMap />
    </div>
  );
};

export default Contact;
