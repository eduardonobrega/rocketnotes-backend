const AppError = require('../utils/AppError');

class NotesCreateService {
  constructor(notesRepository) {
    this.notesRepository = notesRepository;
  }

  async execute({ title, description, tags, links, user_id }) {
    if (!title) throw new AppError('É preciso informar o título da nota!');

    const note_id = await this.notesRepository.createNote({
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

      await this.notesRepository.createNoteTags(tagsInsert);
    }

    if (links.length !== 0) {
      const linksInsert = links.map((link) => ({
        url: link,
        note_id,
      }));

      await this.notesRepository.createNoteLink(linksInsert);
    }
  }
}

module.exports = NotesCreateService;
