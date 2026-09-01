import {
  ContactHero,
  ContactMethods,
  ContactForm,
  ContactSidebar,
  ContactMap
} from '../components/contact';

import SEO from '../components/seo/SEO';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-50 to-white">
      <SEO 
        title="Contact Us | TuitionMaster"
        description="Get in touch with the TuitionMaster team. We are here to help you find the right tutor or assist you with any questions regarding our platform."
        canonicalUrl="https://www.tuitionmaster.guru/contact"
      />
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