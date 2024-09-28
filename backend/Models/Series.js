import mongoose from 'mongoose';
const seriesSchema = mongoose.Schema({
  title: String,
});

const Series = mongoose.model('Series', seriesSchema);
