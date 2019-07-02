const mongoose = require('mongoose')
const schema = {
  _id: String,
  data: Object,
  updatedAt: {
      default: new Date(),
      expires: 24 * 60 * 60, // 1 day
      type: Date
  }
};
class MongooseStore {
  constructor ({
      collection = 'sessions',
      connection = null,
      expires = 86400,
      name = 'Session'
      } = {}) {
          if (!connection) {
          throw new Error('params connection is not collection');
          }
      const updatedAt = { ...schema.updatedAt, expires };
      this.session = mongoose.model(name, new mongoose.Schema({ ...schema, updatedAt }));
      
  }
  async destroy (id) {
      const { session } = this;
      return session.remove({ _id: id });
  }

  async get (id) {
      const { session } = this;
      const { data } = await session.findById(id);
      return data;
  }

  async set (id, data, maxAge, { changed, rolling }) {
      if (changed || rolling) {
      const { session } = this;
      const record = { _id: id, data, updatedAt: new Date() };
      await session.findByIdAndUpdate(id, record, { upsert: true, safe: true, useFindAndModify: false });
      }
      return data;
  }

  static create (opts) {
      return new MongooseStore(opts);
  }
}

module.exports = MongooseStore