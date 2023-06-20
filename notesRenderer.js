export class NotesRenderer {
  #notes;
  #editNoteId;
  #rootElement = document.querySelector(".notes-list");
  #editHandler;
  #removeHandler;
  #toggleToFavoriteHandler;
  #dialog = document.getElementById("dialog");
  #confirmBtn = this.#dialog.querySelector("#confirmBtn");
  #cancelBtn = this.#dialog.querySelector("#cancelBtn");

  set notes(notes) {
    this.#notes = notes;
    this.render();
  }

  constructor(notes) {
    this.#notes = notes;
    this.#confirmBtn.addEventListener("click", (event) => {
      event.preventDefault();
      this.#dialog.close(true);
    });
    this.#cancelBtn.addEventListener("click", (event) => {
      event.preventDefault();
      this.#dialog.close(false);
    });
    this.render();
  }

  #getNoteHTML(note) {
    return `<li id='${note.uid}' >
            <div class="new-note" style='background-color: ${
              note.backgroundColor
            }'>
              <h3 class="new-note__header">${note.title}</h3>
              <p class="new-note__text">${note.text}</p>
              <p>${note.isEdited ? "Edited" : "Created"}: ${this.#formatDate(
      note.date
    )}</p>
              <div class="note__btns">
              <button class="note__delete-btn" title="delete note" data-delete-uid='${
                note.uid
              }'>
                <svg role="img" width="30px" height="30px">
                  <use href="./icons.svg#icon-x-circle"></use>
                </svg>
              </button>
              <button class="note__favorite-btn" title="add to favorite" data-favorite-uid='${
                note.uid
              }'>
                <svg role="img" width="30px" height="30px">
                  <use href="./icons.svg#${
                    note.isFavorite ? "icon-full-heart" : "icon-heart"
                  }"></use>
                </svg>
              </button>
              <button class="note__edit-btn" title="change note" data-edit-uid='${
                note.uid
              }'>
                <svg role="img" width="30px" height="30px">
                  <use href="./icons.svg#icon-edit"></use>
                </svg>
              </button>
              </div>
            </div>
          </li>`;
  }

  #getNodeEditHtml(note) {
    return ` <li id="${note.uid}">
    <form class="edit-note new-note" style='background-color: ${
      note.backgroundColor
    }'>
      <input
        type="name"
        class="edit-note__add-name-input"
        value='${note.title}'
        name="name"
        required
        minlength="5"
        maxlength="15"
      />
      <textarea
        class="edit-note__add-content-input"
        required
        minlength="5"
        maxlength="100"
      >${note.text}</textarea>
      <p>${note.isEdited ? "Edited" : "Created"}: ${this.#formatDate(
      note.date
    )}</p>
      <div class="note__btns">
        <button
        type='button'
          class="note__delete-btn"
          title="delete note"
          data-delete-uid="${note.uid}"
        >
          <svg role="img" width="30px" height="30px">
            <use href="./icons.svg#icon-x-circle"></use>
          </svg>
        </button>
        <button type="submit" class="edit-note__approve-btn" title="approve edit" data-approve-uid="${
          note.uid
        }">
          <svg role="img" width="30px" height="30px">
            <use href="./icons.svg#icon-check-circle"></use>
          </svg>
        </button>
        <button type='button' class="edit-note__cancel-btn" title="cancel editing" data-edit-uid="${
          note.uid
        }">
          <svg role="img" width="30px" height="30px">
            <use href="./icons.svg#icon-slash"></use>
          </svg>
        </button>
        <button type='button' class="note__favorite-btn" title="add to favorite" data-favorite-uid="${
          note.uid
        }">
          <svg role="img" width="30px" height="30px">
            <use href="./icons.svg#${
              note.isFavorite ? "icon-full-heart" : "icon-heart"
            }"></use>
          </svg>
        </button>
      </div>
    </form>
  </li>`;
  }

  #formatDate(date) {
    return `${(date.getHours() < 10 ? "0" : "") + date.getHours()}:${
      (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()
    } ${(date.getDate() < 10 ? "0" : "") + date.getDate()}.${
      (date.getMonth() < 10 ? "0" : "") + date.getMonth()
    }.${date.getFullYear()}`;
  }

  #createElementFromHTML(htmlString) {
    const div = document.createElement("div");
    div.innerHTML = htmlString.trim();
    return div.firstChild;
  }

  #onRemoveClick(event) {
    const uid = event.currentTarget.getAttribute("data-delete-uid");
    this.#dialog.showModal();
    this.#dialog.addEventListener(
      "close",
      () => {
        if (this.#dialog.returnValue === "true") {
          this.#removeHandler(uid);
        }
      },
      { once: true }
    );
  }

  #onEditNoteClick(event) {
    const uid = event.currentTarget.getAttribute("data-edit-uid");
    this.toggleNoteEdit(uid);
  }

  #onFavoriteAdd(event) {
    const uid = event.currentTarget.getAttribute("data-favorite-uid");
    this.#toggleToFavoriteHandler(uid);
  }

  #addEditHandlerToNote(uid) {
    const editCancelBtn = document.querySelector(`[data-edit-uid="${uid}"]`);
    editCancelBtn.addEventListener("click", this.#onEditNoteClick.bind(this), {
      once: true,
    });
  }

  #addRemoveHandlerToNote(uid) {
    document
      .querySelector(`[data-delete-uid="${uid}"]`)
      .addEventListener("click", this.#onRemoveClick.bind(this));
  }

  #addFavoriteHandlerToNote(uid) {
    document
      .querySelector(`[data-favorite-uid="${uid}"]`)
      .addEventListener("click", this.#onFavoriteAdd.bind(this));
  }

  #replaceNoteHtmlWithEditNote(uid) {
    const note = this.#notes.get(uid);
    this.#editNoteId = uid;
    const noteElement = document.getElementById(uid);
    noteElement.replaceWith(
      this.#createElementFromHTML(this.#getNodeEditHtml(note))
    );
    this.#addEditHandlerToNote(uid);
    this.#addRemoveHandlerToNote(uid);
    this.#addFavoriteHandlerToNote(uid);

    const form = document.querySelector(".edit-note");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const title = form.elements[0].value;
      const text = form.elements[1].value;
      if (title === note.title && text === note.text) {
        form.elements[0].setCustomValidity("You did't change nothing");
        form.elements[1].setCustomValidity("You did't change nothing");
        return;
      }
      this.#editHandler(title, text, uid);
    });
  }

  #replaceEditNoteHtlmWithNote(uid) {
    const note = this.#notes.get(uid);
    this.#editNoteId = null;
    const noteElement = document.getElementById(uid);
    noteElement.replaceWith(
      this.#createElementFromHTML(this.#getNoteHTML(note))
    );
    this.#addEditHandlerToNote(uid);
    this.#addFavoriteHandlerToNote(uid);
  }

  render() {
    this.#rootElement.textContent = "";
    [...this.#notes.values()].forEach((note) =>
      this.#rootElement.insertAdjacentHTML(
        "afterbegin",
        this.#getNoteHTML(note)
      )
    );
    const deleteNoteBtns = document.querySelectorAll(".note__delete-btn");
    deleteNoteBtns.forEach((btn) =>
      btn.addEventListener("click", this.#onRemoveClick.bind(this))
    );

    const editNoteBtns = document.querySelectorAll(".note__edit-btn");
    editNoteBtns.forEach((btn) =>
      btn.addEventListener("click", this.#onEditNoteClick.bind(this))
    );
    const favoriteNoteBtns = document.querySelectorAll(".note__favorite-btn");
    favoriteNoteBtns.forEach((btn) =>
      btn.addEventListener("click", this.#onFavoriteAdd.bind(this))
    );
  }

  renderNewNote(note) {
    this.#rootElement.insertAdjacentHTML("afterbegin", this.#getNoteHTML(note));
    this.#addEditHandlerToNote(note.uid);
    this.#addRemoveHandlerToNote(note.uid);
    this.#addFavoriteHandlerToNote(note.uid);
  }

  rerenderNote(note) {
    this.#replaceEditNoteHtlmWithNote(note.uid);
  }

  rerenderNoteIntheSameMode(note) {
    if (this.#editNoteId === note.uid) {
      this.#replaceNoteHtmlWithEditNote(note.uid);
    } else {
      this.#replaceEditNoteHtlmWithNote(note.uid);
    }
  }

  removeNote(uid) {
    document.getElementById(uid).remove();
  }

  registerEditHandler(func) {
    this.#editHandler = func;
  }

  registerRemoveHandler(func) {
    this.#removeHandler = func;
  }

  registerFavoriteHandler(func) {
    this.#toggleToFavoriteHandler = func;
  }

  toggleNoteEdit(uid) {
    if (!this.#editNoteId) {
      this.#replaceNoteHtmlWithEditNote(uid);
      return;
    }
    if (this.#editNoteId === uid) {
      this.#replaceEditNoteHtlmWithNote(uid);
    } else {
      this.#replaceEditNoteHtlmWithNote(this.#editNoteId);
      this.#replaceNoteHtmlWithEditNote(uid);
    }
  }
}
