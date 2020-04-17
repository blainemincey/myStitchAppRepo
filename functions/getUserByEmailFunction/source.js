//
// To test in console: exports('aidan_gillen@gameofthron.es')
//
exports = async function(arg) {
  
  console.log("Calling getUserByEmail Function.");
  console.log("Find by email: " + arg);

  var usersCollection = context.services.get("mongodb-atlas").db("sample_mflix").collection("users");
  
  const query = {
      "email": arg
  };

  const update = {
      $set : {
          lastAccessed: new Date()
      }
  };

  await usersCollection.updateOne(query,update)
      .then(result => {
          const {matchedCount, modifiedCount} = result;
          if(matchedCount && modifiedCount) {
              console.log(`Successfully updated lastAccessedDate`);
          }
      })
      .catch(err => {
          console.error(`Failed to update lastAccessedDate: ${err}`);
      })

  return usersCollection.findOne(query)
    .then(result => {
      if(result) {
        console.log(`Successfully found document: ${result}.`);
        return result;
      } 
      else {
        console.log("No document matches the provided query.");
        return {"Result" : "No document matches the provided id: " + arg};
      }
    })
  .catch(err => console.error(`Failed to find document: ${err}`));
}