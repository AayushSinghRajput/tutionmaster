import { Helmet } from "react-helmet-async";

const TeacherSEO = ({ teacher, teacherId }) => {
  const teacherName = teacher.name?.trim() || "Teacher";

  const subjects = Array.isArray(teacher.preferredSubjects)
    ? teacher.preferredSubjects.filter(Boolean)
    : [];

  const subjectText =
    subjects.length > 0 ? subjects.slice(0, 2).join(" & ") : "Professional";

  const city = teacher.address?.city?.trim() || "Nepal";

  const state = teacher.address?.state?.trim() || "";

  const locationText = state ? `${city}, ${state}` : city;

  const experience = Number(teacher.experience) || 0;

  const experienceText = experience === 1 ? "1 year" : `${experience} years`;

  const title = `${teacherName} | ${subjectText} Teacher in ${city} | TuitionMaster`;

  const description =
    subjects.length > 0
      ? `View ${teacherName}'s profile on TuitionMaster. ${teacherName} teaches ${subjects.join(
          ", ",
        )} in ${locationText}. ${experienceText} of teaching experience.`
      : `View ${teacherName}'s teacher profile on TuitionMaster. ${teacherName} has ${experienceText} of teaching experience in ${locationText}.`;

  const canonicalUrl = `https://www.tuitionmaster.guru/teachers/${teacherId}`;

  const imageUrl = "https://www.tuitionmaster.guru/logo.png";

  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />

      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}

      <meta property="og:type" content="profile" />

      <meta property="og:title" content={title} />

      <meta property="og:description" content={description} />

      <meta property="og:url" content={canonicalUrl} />

      <meta property="og:image" content={imageUrl} />

      <meta property="og:site_name" content="TuitionMaster" />

      {/* Twitter / X */}

      <meta name="twitter:card" content="summary_large_image" />

      <meta name="twitter:title" content={title} />

      <meta name="twitter:description" content={description} />

      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
};

export default TeacherSEO;
