import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Admin from '../models/Admin.js';
import { connectDB } from '../config/db.js';

const seedData = async () => {
  try {
    await connectDB();

    console.log('🌱 Starting database seeding...');

    // Seed Admin User Only
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@ambicaindustry.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'AmbicaAdmin@2026';

    const existingAdmin = await Admin.findOne({ email: adminEmail.toLowerCase() });
    if (!existingAdmin) {
      await Admin.create({
        name: 'Master Admin',
        email: adminEmail,
        password: adminPassword,
        role: 'admin'
      });
      console.log(`✅ Admin account created: ${adminEmail}`);
    } else {
      console.log(`ℹ️ Admin account already exists: ${adminEmail}`);
    }

    console.log('🎉 Seeding completed (0 blogs, clean database)!');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
