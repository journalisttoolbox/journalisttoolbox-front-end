'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://localhost:9000',
  SESSION_SECRET: "jt-secret",

  FACEBOOK_ID: '1087844534559994',
  FACEBOOK_SECRET: '7306bd4bda2d61b64a9ae94975253909',

  TWITTER_ID: 'rRcakr9QaNj1oNt4xHnqke37P',
  TWITTER_SECRET: '2bm62T218bWN9DrpnHO0o1vrUpY0EQKyXl07fjWWxIh1xftZ7J',
  
  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
