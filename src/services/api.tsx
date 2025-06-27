export const getCharacters = async (page = 1) => {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`
  );
  return await res.json();
};

export const getCharacterById = async (id: string) => {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  return await res.json();
};
