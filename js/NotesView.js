class NotesView {
  constructor(root, handlers) {
    const { onNoteAdd, onNoteEdit, onNoteSelect, onNoteDelete } = handlers;

    this.root = root;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.onNoteSelect = onNoteSelect;
    this.onNoteDelete = onNoteDelete;

    this.root.innerHTML = `
     <div class="notes__sidebar">
      <div class="notes__logo">NOTE APP</div>
      <div class="notes__list"></div>
      <button class="notes__button notes__add">ADD NOTE</button>
     </div>
     <div class="notes__preview">
      <input type="text" class="note__title" placeholder="note title" />
      <textarea class="note__body" placeholder="Take some note"></textarea>
      <button class="notes__button notes__save">SAVE NOTE</button>
     </div>
    `;

    const addNoteBtn = this.root.querySelector(".notes__add");
    const inputTitle = this.root.querySelector(".note__title");
    const inputBody = this.root.querySelector(".note__body");

    addNoteBtn.addEventListener("click", () => {
      // run add note method
      this.onNoteAdd();
    });

    [inputTitle, inputBody].forEach((inputField) => {
      inputField.addEventListener("blur", () => {
        const newTitle = inputTitle.value.trim();
        const newBody = inputBody.value.trim();

        this.onNoteEdit(newTitle, newBody);
      });
    });

    // hide notes preview in first loading :
    this.updateNotePreviewVisibility(false);
  }

  #createListItemHTML(id, title, body, updated) {
    const MAX_BODY_LENGTH = 50;

    return `
     <div class="notes__list-item" data-note-id="${id}">
      <div class="notes__item-header">
        <div class="note__small-title">${title}</div>
        <div class="notes__icons">
         <span class="notes__icon notes__list-edit" data-note-id="${id}">
          <i class="fas fa-edit"></i>
         </span>
         <span class="notes__icon notes__list-trash" data-note-id="${id}">
          <i class="far fa-trash-alt"></i>
         </span>
        </div>
      </div>
      <div class="note__small-body">
        ${body.substring(0, MAX_BODY_LENGTH)}
        ${body.length > MAX_BODY_LENGTH ? "..." : ""}
      </div>
      <div class="note__small-updated">
        ${new Date(updated).toLocaleString("en", {
          dateStyle: "full",
          timeStyle: "short",
        })}
      </div>
     </div>
    `;
  }

  updateNoteList(notes) {
    const notesContainer = this.root.querySelector(".notes__list");

    // empty noteList
    notesContainer.innerHTML = "";

    let notesList = "";

    for (const note of notes) {
      const { id, title, body, updated } = note;
      const noteListItem = this.#createListItemHTML(id, title, body, updated);
      notesList += noteListItem;
    }

    notesContainer.innerHTML = notesList;

    notesContainer.querySelectorAll(".notes__list-item").forEach((noteItem) => {
      noteItem.addEventListener("click", () => {
        this.onNoteSelect(noteItem.dataset.noteId);
      });
    });

    notesContainer.querySelectorAll(".notes__list-trash").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        this.onNoteDelete(item.dataset.noteId);
      });
    });

    notesContainer.querySelectorAll(".notes__list-edit").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        this.root.querySelector(".notes__sidebar").style.display = "none";
        this.root.querySelector(".notes__preview").style.display = "flex";
        this.onNoteSelect(item.dataset.noteId);
      });
    });

    this.root.querySelector(".notes__save").addEventListener("click", (e) => {
      this.root.querySelector(".notes__sidebar").style.display = "flex";
      this.root.querySelector(".notes__preview").style.display = "none";
    });
  }

  updateActiveNote(note) {
    this.root.querySelector(".note__title").value = note.title;
    this.root.querySelector(".note__body").value = note.body;

    // add selected class
    this.root
      .querySelectorAll(".notes__list-item")
      .forEach((item) => item.classList.remove("notes__list-item--selected"));

    this.root
      .querySelector(`.notes__list-item[data-note-id="${note.id}"]`)
      .classList.add("notes__list-item--selected");
  }

  updateNotePreviewVisibility(visible) {
    this.root.querySelector(".notes__preview").style.visibility = visible
      ? "visible"
      : "hidden";
  }
}

export default NotesView;
