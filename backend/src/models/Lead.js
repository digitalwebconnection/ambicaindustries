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
    suburb: {
      type: String,
      trim: true,
      default: ''
    },
    service: {
      type: String,
      trim: true,
      default: 'General Solar Inquiry'
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
    }
  },
  {
    timestamps: true
  }
);

const Lead = mongoose.model('Lead', leadSchema);

export default Lead;
