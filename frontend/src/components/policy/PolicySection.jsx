/**
 * PolicySection — wraps a single section of a policy page.
 * The `id` prop is mandatory — it's used by PolicyLayout's sidebar for anchor navigation.
 */
const PolicySection = ({ id, children, className = '' }) => (
  <section
    id={id}
    className={`px-6 sm:px-8 py-8 scroll-mt-4 ${className}`}
  >
    {children}
  </section>
);

export default PolicySection;
