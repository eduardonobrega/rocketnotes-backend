const NotesCreateService = require('./NotesCreateService');
const NotesRepositoryInMemory = require('../repositories/NotesRepositoryInMemory');

describe('NotesCreateService', () => {
  let notesRepository = null;
  let notesCreateService = null;

  beforeEach(() => {
    notesRepository = new NotesRepositoryInMemory();
    notesCreateService = new NotesCreateService(notesRepository);
  });

  it('note should be create', async () => {
    const note = {
      title: 'Note test',
      description: 'This is note for test',
      user_id: Math.floor(Math.random() + 1000) + 1,
    };

    const noteCreated = await notesCreateService.execute(note);

    expect(noteCreated).toHaveProperty('id');
  });

  it('note tags should be create', async () => {
    const note = {
      title: 'Note test',
      description: 'This is note for test',
      user_id: Math.floor(Math.random() + 1000) + 1,
      tags: ['teste1, teste2'],
    };

    const noteCreated = await notesCreateService.execute(note);

    expect(noteCreated).toHaveProperty('noteTags_id');
  });

  it('note links should be create', async () => {
    const note = {
      title: 'Note test',
      description: 'This is note for test',
      user_id: Math.floor(Math.random() + 1000) + 1,
      links: ['link1, link2'],
    };

    const noteCreated = await notesCreateService.execute(note)

    expect(noteCreated).toHaveProperty('noteLinks_id');
  });
});
