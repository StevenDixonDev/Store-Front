/*
*
*
* Converts the connection.query function into a promise instead of using callbacks
*
*
*/

// must pass connection as first parameter
function queryToPromise(connection, ...params){
  // create the call back that connection query needs, but pass in the reject resolve functions
  // from the new Promise below
  function queryCallback(err, data, reject, resolve){
    if(err) reject(err);
    else resolve(data);
  }

  // return a newly created promise that calls the connection query function 
  return new Promise((resolve, reject)=>{
    return connection.query(...params, (err, data) =>{queryCallback(err, data, reject, resolve)});
  })
}

module.exports = queryToPromise;