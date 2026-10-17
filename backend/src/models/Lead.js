import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true
    },
    company: {
      type: String,
      trim: true,
      default: ''
    },
    city: {
      type: String,
      trim: true,
      default: ''
    },
    country: {
      type: String,
      trim: true,
      default: ''
    },
    suburb: {
      type: String,
      trim: true,
      default: ''
    },
    ip: {
      type: String,
      trim: true,
      default: ''
    },
    ipLocation: {
      type: String,
      trim: true,
      default: ''
    },
    service: {
      type: String,
      trim: true,
      default: 'General Requirement'
    },
    consultType: {
      type: String,
      trim: true,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    referenceId: {
      type: String,
      trim: true,
      index: true
    },
    fileName: {
      type: String,
      default: ''
    },
    fileUrl: {
      type: String,
      default: ''
    },
    sourcePage: {
      type: String,
      default: 'Website Form'
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'quoted', 'won', 'archived'],
      default: 'new',
      index: true
    },
    notes: {
      type: String,
      default: ''
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true
    },
    deletedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

const Lead = mongoose.model('Lead', leadSchema);

export default Lead;
