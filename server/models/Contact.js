import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastname: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  // === 关键修复：补上 message 字段 ===
  message: {
    type: String,
    required: [true, 'Message is required'], // 必填
    trim: true
  }
}, {
  timestamps: true
});

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;

/*import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastname: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  }
}, {
  timestamps: true
});

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;*/