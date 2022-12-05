const {MongoClient} = require('mongodb')

module.exports = ()=>{
  const client = new MongoClient('mongodb://127.0.0.1:27017')
  const connection = {
    client: client,
    db: client.db('mmorpggot')
  }
  return connection
}