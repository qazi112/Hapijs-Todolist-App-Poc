const mongoose = require('mongoose');

async function main() {
  await mongoose.connect('mongodb://localhost:27017/poc-test');
}

main().then(() => {
  console.log("Connected")
    
}).catch( error => {throw error})

module.exports = mongoose.connection