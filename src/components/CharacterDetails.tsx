import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCharacterById } from "../services/api";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  origin: { name: string };
  location: { name: string };
}

export default function CharacterDetails() {
  const { id } = useParams();
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    if (id) {
      getCharacterById(id).then(setCharacter);
    }
  }, [id]);

  if (!character) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <Link to="/" className="text-blue-500 underline mb-4 inline-block">
        ← Back
      </Link>
      <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row gap-6">
        <img
          src={character.image}
          alt={character.name}
          className="w-48 h-48 rounded"
        />
        <div>
          <h2 className="text-2xl font-bold mb-2">{character.name}</h2>
          <p>
            <strong>Status:</strong> {character.status}
          </p>
          <p>
            <strong>Species:</strong> {character.species}
          </p>
          <p>
            <strong>Gender:</strong> {character.gender}
          </p>
          <p>
            <strong>Origin:</strong> {character.origin.name}
          </p>
          <p>
            <strong>Location:</strong> {character.location.name}
          </p>
        </div>
      </div>
    </div>
  );
}
