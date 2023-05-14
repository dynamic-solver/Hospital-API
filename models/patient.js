const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  reports: [
    {
      status: {
        type: String,
        required: true,
        enum: [
          "Negative",
          "Travelled-Quarantine",
          "Symptoms-Quarantine",
          "Positive",
        ],
      },
      date: {
        type: Date,
        required: true,
      },
    },
  ],
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

const Patient = new mongoose.model("Patient", patientSchema);

module.exports = Patient;
