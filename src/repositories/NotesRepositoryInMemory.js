class NotesRepositoryInMemory {
  notes = [];
  notesTags = [];
  notesLinks = [];

  async createNote({ title, description, user_id }) {
    const note = {
      id: this.notes.length + 1,
      title,
      description,
      user_id,
    };

    this.notes.push(note);

    return { id: note.id };
  }

  async createNoteTags(tags) {
    const noteTags = {
      id: this.notesTags.length + 1,
      tags,
    };
    
    this.notesTags.push(noteTags);

    return { id: noteTags.id };
  }

  async createNoteLink(links) {}
}

module.exports = NotesRepositoryInMemory;
