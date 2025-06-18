// islands/StarToogle.tsx
import { useState, useEffect } from "preact/hooks";
import { FunctionalComponent } from "preact";
import { APICharacter } from "../utils/type.ts";

type Props = {
  character: APICharacter;
};

const StarToggle: FunctionalComponent<Props> = ({ character }) => {
  const [favorito, setFavorito] = useState(false);

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((c) => c.startsWith("characterfav="));
    if (cookie) {
      try {
        const favs = JSON.parse(decodeURIComponent(cookie.split("=")[1])) as APICharacter[];
        setFavorito(favs.some((c) => c.id === character.id));
      } catch {
        setFavorito(false);
      }
    }
  }, [character.id]);

  const toggleFav = () => {
    const cookie = document.cookie
      .split("; ")
      .find((c) => c.startsWith("characterfav="));
    let favs: APICharacter[] = [];

    if (cookie) {
      try {
        favs = JSON.parse(decodeURIComponent(cookie.split("=")[1]));
      } catch {
        favs = [];
      }
    }

    if (favs.some((c) => c.id === character.id)) {
      favs = favs.filter((c) => c.id !== character.id);
      setFavorito(false);
    } else {
      favs.push(character);
      setFavorito(true);
    }

    const date = new Date();
    date.setTime(date.getTime() + 86400000); // 1 día
    document.cookie = `characterfav=${encodeURIComponent(
      JSON.stringify(favs)
    )};Expires=${date.toUTCString()};Path=/`;
  };

  return (
    <button type="button" onClick={toggleFav}>
      {favorito ? "★ " : "☆ "}
    </button>
  );
};

export default StarToggle;
