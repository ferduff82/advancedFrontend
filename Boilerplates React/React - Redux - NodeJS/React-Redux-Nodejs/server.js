
const express = require('express');
const path = require('path');
//const functions = require('firebase-functions');

const app = express();
const port = process.env.PORT || 5000;


/* if (process.env.NODE_ENV === 'production') {
 */
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });

  /* App Export */

  //exports.app = functions.https.onRequest(app);

/* } */

app.listen(port, () => console.log(`Listening on port ${port}`));
