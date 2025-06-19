const videoSchema = new Schema({
  weekNumber: Number,
  orderInWeek: Number, // 1, 2, 3, etc.
  title: String,
  subtitle: String,
  youtubeUrl: String,
  description: String,
  // Optional: for easy sorting
  sortKey: { 
    type: String,  // "1.1", "1.2", "2.1" etc
    unique: true 
  }
});

// Pre-save middleware to generate sortKey
videoSchema.pre('save', function(next) {
  this.sortKey = `${this.weekNumber}.${this.orderInWeek}`;
  next();
}); 