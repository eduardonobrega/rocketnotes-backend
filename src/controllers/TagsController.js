const knex = require('../database/knex');

class TagsController {
  async index(request, response) {
    const user_id = request.user.id;

    const userTags = await knex('tags')
      .where({ user_id })
      .orderBy('name')
      .groupBy('name');

    return response.json(userTags);
  }
}

module.exports = TagsController;
