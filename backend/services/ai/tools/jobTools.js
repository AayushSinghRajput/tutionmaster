const Job = require("../../../models/Job");
const escapeRegex = require("../../../utils/escapeRegex");

const searchJobs = {
  definition: {
    name: "searchJobs",
    description:
      "Search for published tuition vacancies and teaching job opportunities. Use this tool when a tutor asks about available jobs, tuition postings, or subject vacancies.",
    parametersJsonSchema: {
      type: "object",
      properties: {
        subject: {
          type: "string",
          description: "Optional subject filter, e.g. 'Math', 'Physics', 'English'.",
        },
        location: {
          type: "string",
          description: "Optional location or city filter, e.g. 'Kathmandu', 'Lalitpur', 'Pokhara'.",
        },
        jobType: {
          type: "string",
          enum: ["Home Tuition", "Online", "Institute"],
          description: "Optional teaching mode / job type filter.",
        },
      },
      required: [],
    },
  },
  requiresAuth: false,
  async execute(args) {
    const filter = { published: true, status: { $in: ["Open", "Urgent"] } };

    if (args.subject && args.subject.trim()) {
      filter.subject = { $in: [new RegExp(escapeRegex(args.subject.trim()), "i")] };
    }

    if (args.location && args.location.trim()) {
      filter.location = new RegExp(escapeRegex(args.location.trim()), "i");
    }

    if (args.jobType) {
      filter.jobType = args.jobType;
    }

    const jobs = await Job.find(filter)
      .sort({ publishedAt: -1 })
      .limit(10)
      .lean();

    if (jobs.length === 0) {
      return {
        forModel: {
          count: 0,
          message: "No open tuition vacancies found matching those criteria.",
        },
      };
    }

    const formattedJobs = jobs.map((job) => ({
      id: job._id,
      title: job.title,
      location: job.location,
      jobType: job.jobType,
      subject: job.subject,
      gradeLevel: job.gradeLevel,
      salary: job.salary,
      schedule: job.schedule,
      contactInstructions: job.contactInstructions,
    }));

    return {
      forModel: {
        count: formattedJobs.length,
        jobs: formattedJobs,
      },
      publicResults: formattedJobs.map((j) => ({
        type: "job",
        _id: j.id,
        title: j.title,
        location: j.location,
        salary: j.salary,
        jobType: j.jobType,
      })),
    };
  },
};

module.exports = { searchJobs };
