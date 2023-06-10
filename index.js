function createDebounceFunction(func, time) {
  if (Number.isInteger(time) === false || time < 0) {
    throw new Error("Invalid argument.");
  }

  if (func?.constructor !== Function) {
    throw new Error("Invalid argument.");
  }

  let timeOutId;
  return function (...args) {
    if (timeOutId !== undefined) {
      clearTimeout(timeOutId);
    }
    timeOutId = setTimeout(() => func(...args), time);
  };
}

// const logTo = () => console.log("object");
// const debounced = createDebounceFunction(logTo, 3000);

// debounced();

// setTimeout(debounced, 2000);

//=====================================Task 2=============================================//
class RickAndMorty {
  getCharacter(characterId) {
    if (Number.isInteger(characterId) === false || characterId <= 0) {
      throw new Error("Invalid character id");
    }

    return fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
      .then((res) => {
        switch (res.status) {
          case 200:
            const character = res.json();
            return character;
          case 404:
            return null;
          default:
            throw new Error(`${res.statusText}`);
        }
      })
      .catch((error) => console.log(error));
  }
  async getEpisode(episodeId) {
    if (Number.isInteger(episodeId) === false || episodeId <= 0) {
      throw new Error("Invalid episode id");
    }

    try {
      const res = await fetch(
        `https://rickandmortyapi.com/api/episode/${episodeId}`
      );
      switch (res.status) {
        case 200:
          const episode = await res.json();
          return episode;
        case 404:
          return null;
        default:
          throw new Error(`${res.statusText}`);
      }
    } catch (error) {
      return console.log(error);
    }
  }
}

// const rm = new RickAndMorty();
// rm.getCharacter(44).then((res) => console.log(res.name));
