const {MongoClient} = require('mongodb')

module.exports = ()=>{
  const client = new MongoClient('mongodb://localhost:27017')
  const connection = {
    client: client,
    db: client.db('mmorpggot')
  }
  return connection
}