import { Note } from "./note.js";

export class NotesStorage {
  #notes = new Map();
  #filter;
  #storage;
  #addHandler;
  #removeHandler;
  #editHandler;
  #favoriteChangeHandler;

  set filter(value) {
    this.#filter = value;
  }

  constructor(storage) {
    this.#storage = storage;
    this.#init();
  }

  #init() {
    const rawNotes = this.#storage.getItem("notes");
    if (!rawNotes) {
      this.#storage.setItem("notes", JSON.stringify([]));
    } else {
      JSON.parse(rawNotes)
        .map((note) => new Note(note))
        .forEach((note) => this.#notes.set(note.uid, note));
    }
  }

  #syncStorageWithMap() {
    const notes = [...this.#notes.values()].map((note) => note.toObject());
    this.#storage.setItem("notes", JSON.stringify(notes));
  }

  #checkNotesWithFilter(note) {
    return this.#filter ? this.#filter(note) : true;
  }

  add(note) {
    this.#notes.set(note.uid, note);
    this.#syncStorageWithMap();
    if (this.#checkNotesWithFilter(note)) {
      this.#addHandler(note);
    }
  }

  remove(uid) {
    this.#notes.delete(uid);
    this.#syncStorageWithMap();
    this.#removeHandler(uid);
  }

  edit(title, text, uid) {
    const note = this.#notes.get(uid);
    note.edit(title, text);
    this.#syncStorageWithMap();
    if (this.#checkNotesWithFilter(note)) {
      this.#editHandler(note);
    } else {
      this.#removeHandler(uid);
    }
  }

  getNotesList() {
    return this.#notes;
  }

  getFavorites() {
    return [...this.#notes.values()]
      .filter((note) => note.isFavorite)
      .reduce((acc, note) => {
        acc.set(note.uid, note);
        return acc;
      }, new Map());
  }

  toggleFavorite(uid) {
    const note = this.#notes.get(uid);
    note.toggleFav();
    this.#syncStorageWithMap();
    this.#favoriteChangeHandler(note);
  }

  getFilteredNotes() {
    return [...this.#notes.values()]
      .filter((note) => this.#filter(note))
      .reduce((acc, note) => {
        acc.set(note.uid, note);
        return acc;
      }, new Map());
  }

  registerAddHandler(func) {
    this.#addHandler = func;
  }
  registerEditHandler(func) {
    this.#editHandler = func;
  }
  registerRemoveHandler(func) {
    this.#removeHandler = func;
  }

  registerFavoriteHandler(func) {
    this.#favoriteChangeHandler = func;
  }
}
