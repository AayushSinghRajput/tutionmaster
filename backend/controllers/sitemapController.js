const asyncHandler = require("express-async-handler");
const Teacher = require("../models/Teacher");

exports.getSitemap = asyncHandler(async (req, res) => {
  const baseUrl = "https://www.tuitionmaster.guru";

  // Fetch all active teachers
  const teachers = await Teacher.find(
    { isActive: true },
    { _id: 1 }
  ).lean();

  // Static public pages
  const staticUrls = [
    "/",
    "/about",
    "/contact",
    "/teachers",
    "/privacy-policy",
    "/terms-of-service",
    "/cookie-policy",
    "/how-it-works",
    "/how-it-works/teacher-profile",
  ];

  const urls = [
    ...staticUrls.map((url) => `${baseUrl}${url}`),
    ...teachers.map(
      (teacher) => `${baseUrl}/teachers/${teacher._id}`
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
  </url>`
  )
  .join("\n")}
</urlset>`;

  res
    .status(200)
    .type("application/xml")
    .send(xml);
});