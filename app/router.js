'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./routes/all')(app);
  require('./routes/classify')(app);
  require('./routes/itinerary')(app);
  require('./routes/secret')(app);
  require('./routes/timeAxis')(app);
  require('./routes/cosServer')(app);
  require('./routes/user')(app);
  require('./routes/resources')(app);
  require('./routes/emailServer')(app);
  require('./routes/tianapi')(app);
};
