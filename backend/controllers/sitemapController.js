const asyncHandler = require("express-async-handler");
const Teacher = require("../models/Teacher");
const Job = require("../models/Job");

exports.getSitemap = asyncHandler(async (req, res) => {
  const baseUrl = "https://www.tuitionmaster.guru";

  // Fetch all active teachers
  const teachers = await Teacher.find(
    { isActive: true },
    { _id: 1, updatedAt: 1 }
  ).lean();

  // Fetch all published & open jobs
  const jobs = await Job.find(
    { published: true, status: { $ne: 'Closed' } },
    { slug: 1, updatedAt: 1 }
  ).lean();

  // Static public pages
  const staticUrls = [
    "/",
    "/about",
    "/contact",
    "/teachers",
    "/jobs",
    "/privacy-policy",
    "/terms-of-service",
    "/cookie-policy",
    "/how-it-works",
    "/how-it-works/teacher-profile",
  ];

  const today = new Date().toISOString().split("T")[0];

  const urls = [
    ...staticUrls.map((url) => ({
      loc: `${baseUrl}${url}`,
      lastmod: today,
      changefreq: url === "/" || url === "/jobs" ? "daily" : "weekly",
      priority: url === "/" ? "1.0" : url === "/jobs" ? "0.9" : "0.8",
    })),
    ...teachers.map((teacher) => ({
      loc: `${baseUrl}/teachers/${teacher._id}`,
      lastmod: teacher.updatedAt 
        ? new Date(teacher.updatedAt).toISOString().split("T")[0] 
        : today,
      changefreq: "daily",
      priority: "0.9",
    })),
    ...jobs.map((job) => ({
      loc: `${baseUrl}/jobs/${job.slug}`,
      lastmod: job.updatedAt 
        ? new Date(job.updatedAt).toISOString().split("T")[0] 
        : today,
      changefreq: "daily",
      priority: "0.8",
    })),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (urlObj) => `  <url>
    <loc>${urlObj.loc}</loc>
    <lastmod>${urlObj.lastmod}</lastmod>
    <changefreq>${urlObj.changefreq}</changefreq>
    <priority>${urlObj.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  res
    .status(200)
    .type("application/xml")
    .send(xml);
});