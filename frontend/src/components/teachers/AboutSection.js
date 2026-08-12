const AboutSection = ({ bio }) => {
  return (
    <section className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
      <h2 className="font-serif text-xl sm:text-2xl font-semibold text-gray-900 mb-4">About Me</h2>
      <div className="prose max-w-none">
        <p className="text-gray-700 leading-relaxed">{bio}</p>
      </div>
    </section>
  );
};

export default AboutSection;