const AppError = require('../utils/AppError');

class NotesCreateService {
  constructor(notesRepository) {
    this.notesRepository = notesRepository;
  }

  async execute({ title, description, tags, links, user_id }) {
    if (!title) throw new AppError('É preciso informar o título da nota!');

    tags = tags ?? [];
    links = links ?? [];

    const { id: note_id } = await this.notesRepository.createNote({
      title,
      description,
      user_id,
    });

    let tagsCreated;
    if (tags.length !== 0) {
      const tagsInsert = tags.map((tag) => ({
        name: tag.trim(),
        note_id,
        user_id,
      }));

      tagsCreated = await this.notesRepository.createNoteTags(tagsInsert);
    }

    let linksCreated;
    if (links.length !== 0) {
      const linksInsert = links.map((link) => ({
        url: link,
        note_id,
      }));

      linksCreated = await this.notesRepository.createNoteLink(linksInsert);
    }

    return {
      id: note_id,
      noteTags_id: tagsCreated?.id,
      noteLinks_id: linksCreated?.id,
    };
  }
}

module.exports = NotesCreateService;
