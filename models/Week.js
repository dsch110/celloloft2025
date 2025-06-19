const weekSchema = new Schema({
  weekNumber: Number,
  title: String,
  introText: String,
  isPublished: { type: Boolean, default: true }
}); 