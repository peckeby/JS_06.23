import { NotesStorage } from "./notesStorage.js";
import { NotesRenderer } from "./notesRenderer.js";

const storage = new NotesStorage(localStorage);
const renderer = new NotesRenderer(storage.getFavorites());
const search = document.querySelector(".search-input");

storage.registerAddHandler((note) => renderer.renderNewNote(note));
storage.registerEditHandler(renderer.rerenderNote.bind(renderer));
renderer.registerEditHandler(storage.edit.bind(storage));
renderer.registerFavoriteHandler(storage.toggleFavorite.bind(storage));
storage.registerRemoveHandler((uid) => renderer.removeNote(uid));
storage.registerFavoriteHandler((note) => renderer.removeNote(note.uid));
renderer.registerRemoveHandler((uid) => storage.remove(uid));

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
      return (
        note.title.toLowerCase().includes(event.target.value.toLowerCase()) &&
        note.isFavorite
      );
    };
    renderer.notes = storage.getFilteredNotes();
  }, 400)
);
