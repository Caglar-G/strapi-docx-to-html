'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('docx-to-html')
      .service('myService')
      .getWelcomeMessage();
  },
});
