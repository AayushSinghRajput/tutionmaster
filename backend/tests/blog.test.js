const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Blog = require('../models/Blog');

afterEach(async () => {
  await Blog.deleteMany({});
});

describe('Public Blog Endpoints', () => {
  test('GET /api/v1/blogs should return paginated list of published blogs with limit 9', async () => {
    // Create 12 blogs (10 published, 2 unpublished)
    const blogDocs = [];
    for (let i = 1; i <= 10; i++) {
      blogDocs.push({
        title: `Published Blog Post ${i}`,
        slug: `published-blog-post-${i}`,
        content: `<p>Content for blog ${i}</p>`,
        excerpt: `Excerpt for blog ${i}`,
        published: true,
        publishedAt: new Date(Date.now() - i * 1000),
      });
    }
    blogDocs.push({
      title: 'Draft Blog Post 1',
      slug: 'draft-blog-post-1',
      content: '<p>Draft content</p>',
      published: false,
    });

    await Blog.insertMany(blogDocs);

    const res = await request(app).get('/api/v1/blogs?page=1');

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.blogs.length).toBe(9); // Limit 9
    expect(res.body.pagination.totalCount).toBe(10);
    expect(res.body.pagination.totalPages).toBe(2);
    expect(res.body.pagination.hasNextPage).toBe(true);
    expect(res.body.pagination.hasPrevPage).toBe(false);
  });

  test('GET /api/v1/blogs/slug/:slug should return article details if published', async () => {
    await Blog.create({
      title: 'Sample Article',
      slug: 'sample-article',
      content: '<p>Detailed article body text.</p>',
      excerpt: 'Short summary text.',
      published: true,
      publishedAt: new Date(),
    });

    const res = await request(app).get('/api/v1/blogs/slug/sample-article');

    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe('Sample Article');
  });

  test('GET /api/v1/blogs/slug/:slug should return 404 if post is unpublished', async () => {
    await Blog.create({
      title: 'Hidden Draft',
      slug: 'hidden-draft',
      content: '<p>Secret content</p>',
      published: false,
    });

    const res = await request(app).get('/api/v1/blogs/slug/hidden-draft');

    expect(res.statusCode).toEqual(404);
  });
});
