const asyncHandler = require("express-async-handler");
const Teacher = require("../models/Teacher");
const Blog = require("../models/Blog");

exports.getSitemap = asyncHandler(async (req, res) => {
  const baseUrl = "https://www.tuitionmaster.guru";

  // Fetch all active teachers
  const teachers = await Teacher.find(
    { isActive: true },
    { _id: 1, updatedAt: 1 }
  ).lean();

  // Fetch all published blogs
  const blogs = await Blog.find(
    { published: true },
    { slug: 1, updatedAt: 1 }
  ).lean();

  // Static public pages
  const staticUrls = [
    "/",
    "/about",
    "/contact",
    "/teachers",
    "/blog",
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
      changefreq: url === "/" || url === "/blog" ? "daily" : "weekly",
      priority: url === "/" ? "1.0" : url === "/blog" ? "0.9" : "0.8",
    })),
    ...teachers.map((teacher) => ({
      loc: `${baseUrl}/teachers/${teacher._id}`,
      lastmod: teacher.updatedAt 
        ? new Date(teacher.updatedAt).toISOString().split("T")[0] 
        : today,
      changefreq: "daily",
      priority: "0.9",
    })),
    ...blogs.map((blog) => ({
      loc: `${baseUrl}/blog/${blog.slug}`,
      lastmod: blog.updatedAt 
        ? new Date(blog.updatedAt).toISOString().split("T")[0] 
        : today,
      changefreq: "weekly",
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