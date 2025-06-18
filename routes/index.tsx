// routes/index.tsx
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { getCharacters } from "../utils/APiharry.ts";
import { APICharacter } from "../utils/type.ts";
import StarToggle from "../islands/StarToogle.tsx";

type Data = {
  characters: APICharacter[];
};

export const handler: Handlers<Data> = {
  GET: async (_req: Request, ctx: FreshContext) => {
    const characters = await getCharacters();
    return ctx.render({ characters });
  },
};

export default function HomePage(props: PageProps<Data>) {
  const characters = props.data.characters;

  return (
    <div>
      <h1>Personajes Harry Potter</h1>
      <p>Hecho por Eric Kowalski</p>

      <div class="grid">
        {characters.map((char) => (
          <div key={char.id} class="card">
            <a href={`/characters/${char.name}`}>
              <h2>{char.name}</h2>
              <img src={char.image} alt={char.name} width={150} />
            </a>
            <StarToggle character={char} />
          </div>
        ))}
      </div>
    </div>
  );
}
