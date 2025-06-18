import { APICharacter } from "../../utils/type.ts";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { getCharacters } from "../../utils/APiharry.ts";
import CharacterDetail from "../../components/CharacterDetail.tsx";

type Data = {
  character: APICharacter | null;
};

export default function CharacterPage({ data }: PageProps<Data>) {
  if (!data.character) return <h1>Personaje no encontrado</h1>;
  return <CharacterDetail character={data.character} />;
}

//http://localhost:8000/characters/1

export const handler: Handlers<Data> = {
  GET: async (_req: Request, ctx: FreshContext) => {
    const { id } = ctx.params;
    const decodedId = decodeURIComponent(id);
    const all = await getCharacters();
    const character = all.find((c) => c.name === decodedId) ?? null;
    return ctx.render({ character });
  },
};
