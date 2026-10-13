import { jest } from '@jest/globals';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app.js';
import Lead from '../src/models/Lead.js';
import Admin from '../src/models/Admin.js';
import Blog from '../src/models/Blog.js';

describe('Backend API Tests', () => {
  describe('Health Route', () => {
    it('GET /api/health should return 200 and healthy status', async () => {
      const response = await request(app).get('/api/health');
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('running smoothly');
    });
  });

  describe('Lead Creation Route & Validation', () => {
    it('POST /api/leads should fail validation with 400 when required fields are missing', async () => {
      const response = await request(app)
        .post('/api/leads')
        .send({
          suburb: 'Southport'
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('required');
    });

    it('POST /api/leads should pass validation and create lead with 201', async () => {
      const mockLead = {
        _id: 'mock_lead_id_123',
        name: 'Jane Doe',
        email: 'jane@example.com',
        phone: '0412345678',
        suburb: 'Robina',
        service: 'Residential Solar',
        referenceId: 'QLD-123456',
        fileUrl: ''
      };

      const spy = jest.spyOn(Lead, 'create').mockResolvedValueOnce(mockLead);

      const response = await request(app)
        .post('/api/leads')
        .send({
          name: 'Jane Doe',
          email: 'jane@example.com',
          phone: '0412345678',
          suburb: 'Robina',
          service: 'Residential Solar'
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe('mock_lead_id_123');

      spy.mockRestore();
    });
  });

  describe('Admin Auth Route & Validation', () => {
    it('POST /api/admin/login should fail validation with 400 when body is empty', async () => {
      const response = await request(app)
        .post('/api/admin/login')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Please provide both email and password');
    });

    it('POST /api/admin/login should return 401 for non-existent admin credentials', async () => {
      const spy = jest.spyOn(Admin, 'findOne').mockResolvedValueOnce(null);

      const response = await request(app)
        .post('/api/admin/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'wrongpassword'
        });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Invalid email or password');

      spy.mockRestore();
    });
  });

  describe('CORS & Preflight for Vercel Deployments', () => {
    const vercelOrigin = 'https://sunny-solar-frontend-g6zskh4fd.vercel.app';

    it('OPTIONS /api/admin/login should respond 204 with CORS headers for Vercel preview origin', async () => {
      const response = await request(app)
        .options('/api/admin/login')
        .set('Origin', vercelOrigin)
        .set('Access-Control-Request-Method', 'POST')
        .set('Access-Control-Request-Headers', 'Content-Type, Authorization');

      expect(response.status).toBe(204);
      expect(response.headers['access-control-allow-origin']).toBe(vercelOrigin);
      expect(response.headers['access-control-allow-credentials']).toBe('true');
      expect(response.headers['access-control-allow-methods']).toContain('POST');
    });

    it('POST /api/admin/login includes Access-Control-Allow-Origin header matching Vercel origin', async () => {
      const response = await request(app)
        .post('/api/admin/login')
        .set('Origin', vercelOrigin)
        .send({});

      expect(response.headers['access-control-allow-origin']).toBe(vercelOrigin);
      expect(response.headers['access-control-allow-credentials']).toBe('true');
    });
  });

  describe('Dynamic Sitemap XML Route', () => {
    it('GET /sitemap.xml should return 200 with valid XML and all required routes', async () => {
      const response = await request(app).get('/sitemap.xml');

      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('application/xml');
      expect(response.text).toContain('<urlset');
      expect(response.text).toContain('/about</loc>');
      expect(response.text).toContain('/products</loc>');
      expect(response.text).toContain('/industry</loc>');
      expect(response.text).toContain('/why-choose-us</loc>');
      expect(response.text).toContain('/r&amp;d</loc>');
      expect(response.text).toContain('/products/acid-dyes</loc>');
      expect(response.text).toContain('/products/acid-dyes/acid-black-dyes</loc>');
      expect(response.text).toContain('/products/direct-dyes/sunfast-non-benzidine-direct-dyes</loc>');
      expect(response.text).toContain('<lastmod>');
      expect(response.text).toContain('</urlset>');
    });

    it('GET /api/sitemap.xml should also resolve and return 200 with XML', async () => {
      const response = await request(app).get('/api/sitemap.xml');

      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('application/xml');
      expect(response.text).toContain('<urlset');
    });

    it('GET /sitemap.xml should include dynamic published blog posts when DB returns articles', async () => {
      const mockBlog = {
        slug: 'test-article-slug',
        updatedAt: '2026-10-10T00:00:00.000Z',
        createdAt: '2026-10-10T00:00:00.000Z'
      };

      const originalReadyState = mongoose.connection.readyState;
      Object.defineProperty(mongoose.connection, 'readyState', { value: 1, configurable: true });

      const chain = {
        select: jest.fn().mockReturnThis(),
        lean: jest.fn().mockReturnThis(),
        maxTimeMS: jest.fn().mockReturnThis(),
        catch: jest.fn().mockResolvedValue([mockBlog])
      };
      chain.maxTimeMS.mockReturnValue(Promise.resolve([mockBlog]));

      const spy = jest.spyOn(Blog, 'find').mockReturnValue(chain);

      const response = await request(app).get('/sitemap.xml');

      expect(response.status).toBe(200);
      expect(response.text).toContain('/blogs/test-article-slug</loc>');
      expect(response.text).toContain('<lastmod>2026-10-10</lastmod>');

      spy.mockRestore();
      Object.defineProperty(mongoose.connection, 'readyState', { value: originalReadyState, configurable: true });
    });
  });
});


