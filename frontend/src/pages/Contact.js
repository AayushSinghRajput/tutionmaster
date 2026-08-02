import {
  ContactHero,
  ContactMethods,
  ContactForm,
  ContactSidebar,
  ContactMap
} from '../components/contact';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-25 to-white">
      <ContactHero />
      <ContactMethods />
      <section className="py-20 bg-gradient-to-br from-blue-25 to-indigo-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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