const notes = [
  {
    id: 1,
    title: "first note",
    body: "some dummy text first",
    updated: "2023-09-12T10:10:24.385Z",
  },
  {
    id: 2,
    title: "second note",
    body: "some dummy text second",
    updated: "2023-09-13T10:10:24.385Z",
  },
];

class NotesAPI {
  static getAllNotes() {
    const savedNotes = notes || [];

    return savedNotes.sort(
      (noteA, noteB) => new Date(noteB.updated) - new Date(noteA.updated)
    );
  }

  saveNote() {}

  deleteNote() {}
}

console.log(NotesAPI.getAllNotes());
