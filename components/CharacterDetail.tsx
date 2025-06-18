// components/CharacterDetail.tsx
import { FunctionalComponent } from "preact";
import { APICharacter } from "../utils/type.ts";
import StarToggle from "../islands/StarToogle.tsx";

type Props = {
  character: APICharacter;
};

const CharacterDetail: FunctionalComponent<Props> = ({ character }) => {
  return (
    <div class="detail-page">
        <img src={character.image} alt={character.name} width={200} />
      <h1>{character.name}</h1>
      
      <p><strong>Casa:</strong> {character.house || "Desconocida"}</p>
      <p><strong>Estado:</strong> {character.estado || "Desconocido"}</p>
      <StarToggle character={character} />
      <a href="/"><button type="button">Volver</button></a>
    </div>
  );
};

export default CharacterDetail;
