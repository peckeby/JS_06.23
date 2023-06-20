import { Note } from "./note.js";
import { NotesStorage } from "./notesStorage.js";
import { NotesRenderer } from "./notesRenderer.js";

const storage = new NotesStorage(localStorage);
const renderer = new NotesRenderer(storage.getNotesList());
const form = document.querySelector("#new-note-form");
const search = document.querySelector(".search-input");

storage.registerAddHandler((note) => renderer.renderNewNote(note));
storage.registerEditHandler(renderer.rerenderNote.bind(renderer));
renderer.registerEditHandler(storage.edit.bind(storage));
renderer.registerFavoriteHandler(storage.toggleFavorite.bind(storage));
storage.registerRemoveHandler((uid) => renderer.removeNote(uid));
storage.registerFavoriteHandler((uid) =>
  renderer.rerenderNoteIntheSameMode(uid)
);
renderer.registerRemoveHandler((uid) => storage.remove(uid));

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = form.elements[0].value;
  const text = form.elements[1].value;
  const backgroundColor = form.elements[2].value;
  const note = new Note({ title, text, backgroundColor });
  storage.add(note);
  form.reset();
});

function debounce(fn, delay) {
  let timeoutID;
  return function (...args) {
    if (timeoutID) clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

search.addEventListener(
  "input",
  debounce((event) => {
    storage.filter = function (note) {
      return note.title
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    };
    renderer.notes = storage.getFilteredNotes();
  }, 400)
);
