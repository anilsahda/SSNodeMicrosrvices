const mongoose = require('mongoose');

const clinicInquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    select: { type: String },
    email: { type: String, required: true },
    message: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ClinicInquiry', clinicInquirySchema);
