const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const imageschema = new mongoose.Schema(
  {
    fileLink: String,
    s3_key: String,
    document_id: { type: Number, default: 0 },
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      email: String
    }
  },
  {
    timestamps: true
  }
);
imageschema.plugin(AutoIncrement, { inc_field: "document_id" });

module.exports = mongoose.model("Image", imageschema);
