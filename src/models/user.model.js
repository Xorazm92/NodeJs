import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    user_id: { 
      type: String, 
      required: true,
      unique: true,
      index: true 
    },
    username: { 
      type: String,
      trim: true,
      maxLength: [50, "Foydalanuvchi nomi 50 ta belgidan oshmasligi kerak"]
    },
    first_name: { 
      type: String,
      trim: true,
      maxLength: [50, "Ism 50 ta belgidan oshmasligi kerak"]
    },
    last_name: { 
      type: String,
      trim: true,
      maxLength: [50, "Familiya 50 ta belgidan oshmasligi kerak"]
    },
    phone_number: {
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          return /^\+?[1-9]\d{1,14}$/.test(v);
        },
        message: props => `${props.value} - noto'g'ri telefon raqam!`
      }
    },
    last_state: {
      type: String,
      default: 'idle'
    },
    tg_link: {
      type: String,
      trim: true,
      validate: {
        validator: function(v) {
          return !v || /^https:\/\/t\.me\/[a-zA-Z0-9_]{5,32}$/.test(v);
        },
        message: props => `${props.value} - noto'g'ri Telegram havola!`
      }
    },
    is_active: {
      type: Boolean,
      default: true,
      index: true
    },
    last_interaction: {
      type: Date,
      default: Date.now
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes for better query performance
userSchema.index({ createdAt: -1 });
userSchema.index({ last_interaction: -1 });

// Virtual for full name
userSchema.virtual('full_name').get(function() {
  if (this.first_name && this.last_name) {
    return `${this.first_name} ${this.last_name}`;
  }
  return this.first_name || this.username || 'Noma\'lum';
});

// Update last interaction time
userSchema.methods.updateLastInteraction = async function() {
  this.last_interaction = new Date();
  return this.save();
};

// Find active users
userSchema.statics.findActive = function() {
  return this.find({ is_active: true });
};

// Middleware to handle pre-save operations
userSchema.pre('save', function(next) {
  // Convert phone number to international format if it doesn't start with '+'
  if (this.phone_number && !this.phone_number.startsWith('+')) {
    this.phone_number = '+' + this.phone_number;
  }
  
  // Ensure Telegram link starts with https://t.me/
  if (this.tg_link && !this.tg_link.startsWith('https://t.me/')) {
    this.tg_link = 'https://t.me/' + this.tg_link.replace(/^@/, '');
  }

  next();
});

export const User = mongoose.model("users", userSchema);
