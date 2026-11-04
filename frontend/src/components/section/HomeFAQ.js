import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQ_ITEMS = [
  {
    question: "What is TuitionMaster and how does it connect students with tutors in Nepal?",
    answer: "TuitionMaster is an open tutoring marketplace specifically built for students, parents, and educators in Nepal. Students can freely search our verified directory of home and online tutors by subject, city, grade level, and fee structure. When you find an educator matching your curriculum needs, you can contact them directly or request recommendations through our AI assistant without incurring broker or agency fees."
  },
  {
    question: "Is TuitionMaster free for students and parents searching for a tutor?",
    answer: "Yes, browsing, filtering, and connecting with tutors on TuitionMaster is completely free for students and parents. There are no registration barriers, paywalls, or hidden consultation charges to search our directory or speak with qualified teachers. You negotiate session rates and schedules directly with the tutor."
  },
  {
    question: "How does TuitionMaster verify tutor qualifications and credentials?",
    answer: "Every tutor who registers on TuitionMaster submits their academic background, preferred syllabi, and educational documentation. Our moderation team reviews these profiles alongside submitted CVs and degree qualifications before granting public visibility and the 'TuitionMaster Verified' badge. Students can also inspect transparent ratings and written feedback submitted by previous learners."
  },
  {
    question: "What subjects, grade levels, and curricula are supported?",
    answer: "Our tutors cover the entire educational spectrum in Nepal, including Primary and Lower Secondary school subjects, Grade 10 SEE preparation (Compulsory Mathematics, Optional Mathematics, Science, English, Nepali), Grade 11 & 12 (+2 Science, Management, Humanities), and competitive university entrance exams such as IOE Engineering, CEE Medical, and KU entrance tests. We also feature tutors for CBSE, Cambridge A-Levels, and computer programming."
  },
  {
    question: "Can I find both home (in-person) and online tutoring on the platform?",
    answer: "Yes. TuitionMaster supports both physical in-person home tutoring and live interactive online sessions. Each tutor profile specifies their teaching modes (In-person, Online, or Both) and coverage areas across Kathmandu, Lalitpur, Bhaktapur, Pokhara, Chitwan, and other major cities so you can choose the format that fits your learning routine."
  },
  {
    question: "How do I choose the most suitable tutor for my child's learning needs?",
    answer: "We recommend reviewing each tutor's detailed profile, which includes their verified credentials, years of teaching experience, educational bio, and student reviews. You can filter tutors by hourly or monthly budget, location, and teaching mode. We also advise scheduling an introductory discussion to align on expectations, learning weaknesses, and specific exam milestones."
  },
  {
    question: "What geographical areas and cities in Nepal does TuitionMaster cover?",
    answer: "Our in-person tutoring directory focuses heavily on the Kathmandu Valley (Kathmandu, Lalitpur, Bhaktapur) as well as emerging regional hubs including Pokhara, Biratnagar, Butwal, Chitwan, and Dharan. For students outside these urban centers, our online tutors offer flexible virtual classes accessible from any location in Nepal with an internet connection."
  },
  {
    question: "How can qualified educators and subject experts join TuitionMaster as tutors?",
    answer: "Educators, university scholars, and professional teachers can join by clicking 'Become a Tutor' and creating an account. Through our 4-step profile wizard, you can upload your credentials and CV, define your hourly or monthly tutoring fees, specify available weekly time slots, and select the exact subjects you teach. Once reviewed by our moderation team, your profile becomes publicly visible to thousands of students."
  }
];

const HomeFAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-stone-50 border-t border-stone-200">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-brand-100 text-brand-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <HelpCircle className="w-4 h-4" />
            FREQUENTLY ASKED QUESTIONS
          </div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">
            Everything You Need to Know About TuitionMaster
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Got questions about finding a tutor, pricing, or becoming a teacher in Nepal? Here are clear, upfront answers to help you get started.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-stone-200 shadow-sm transition-all duration-200 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 hover:bg-stone-50/50 transition-colors focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-gray-900 text-base sm:text-lg font-serif">
                    {item.question}
                  </span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-gray-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-brand-50 text-brand-600" : ""
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-stone-100">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeFAQ;
