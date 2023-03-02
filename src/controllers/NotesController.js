const knex = require('../database/knex');
const AppError = require('../utils/AppError');

const NotesRepository = require('../repositories/NotesRepository');

class NotesController {
  async create(request, response) {
    const { title, description, tags, links } = request.body;
    const user_id = request.user.id;

    if (!title) throw new AppError('É preciso informar o título da nota!');

    const notesRepository = new NotesRepository();

    const note_id = await notesRepository.createNote({
      title,
      description,
      user_id,
    });

    if (tags.length !== 0) {
      const tagsInsert = tags.map((tag) => ({
        name: tag.trim(),
        note_id,
        user_id,
      }));

      await notesRepository.createNoteTags(tagsInsert);
    }

    if (links.length !== 0) {
      const linksInsert = links.map((link) => ({
        url: link,
        note_id,
      }));

      await notesRepository.createNoteLink(linksInsert);
    }

    return response.json();
  }

  async show(request, response) {
    const { id } = request.params;

    const notesRepository = new NotesRepository();

    const note = await notesRepository.findNoteById(id);
    const tags = await notesRepository.findNoteTags(id);
    const links = await notesRepository.findNoteLinks(id);

    return response.json({
      ...note,
      tags,
      links,
    });
  }

  async index(request, response) {
    const { title, tags } = request.query;
    const user_id = request.user.id;

    const notesRepository = new NotesRepository();

    let notes;

    if (tags) {
      const filterTags = tags.split(',').map((tag) => tag.trim());

      notes = await notesRepository.findUserNotesByTags({
        user_id,
        title,
        tags: filterTags,
      });
    } else {
      notes = await notesRepository.findUserNotesByTitle({ user_id, title });
    }

    const userTags = await notesRepository.findUserTags(user_id);

    const notesWithTags = notes.map((note) => {
      const noteTags = userTags.filter((tag) => tag.note_id === note.id);

      return {
        ...note,
        tags: noteTags,
      };
    });

    return response.json(notesWithTags);
  }

  async delete(request, response) {
    const { id } = request.params;

    const notesRepository = new NotesRepository();

    await notesRepository.deleteNote(id);

    return response.json();
  }
}

module.exports = NotesController;
