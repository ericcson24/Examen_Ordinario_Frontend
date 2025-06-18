import { APICharacter, APISpell } from "../utils/type.ts";
import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import CharacterDetail from "../components/CharacterDetail.tsx";
import SpellDetail from "../components/SpellDetail.tsx";

type Data = {
    favoriteCharacters: APICharacter[];
    favoriteSpells: APISpell[];
};

export const handler: Handlers<Data> = {
    GET: async (req: Request, ctx: FreshContext) => {
        const cookies = req.headers.get("cookie");
        let favoriteCharacters: APICharacter[] = [];
        let favoriteSpells: APISpell[] = [];

        if (cookies) {
            const charCookie = cookies.split("; ").find((c) =>
                c.startsWith("characterfav=")
            );
            const spellCookie = cookies.split("; ").find((c) =>
                c.startsWith("spellfav=")
            );

            if (charCookie) {
                try {
                    favoriteCharacters = JSON.parse(
                        decodeURIComponent(charCookie.split("=")[1]),
                    );
                } catch {
                    favoriteCharacters = [];
                }
            }

            if (spellCookie) {
                try {
                    favoriteSpells = JSON.parse(
                        decodeURIComponent(spellCookie.split("=")[1]),
                    );
                } catch {
                    favoriteSpells = [];
                }
            }
        }

        return ctx.render({ favoriteCharacters, favoriteSpells });
    },
};

export default function FavoritesPage({ data }: PageProps<Data>) {
    const { favoriteCharacters, favoriteSpells } = data;

    return (
        <div>
            <h1>Favoritos</h1>

            <section>
                <h2>Personajes Favoritos</h2>
                {favoriteCharacters.length === 0? <p>No hay personajes favoritos</p>: (
                        <div>
                            {favoriteCharacters.map((character) => (
                                <CharacterDetail
                                    key={character.id}
                                    character={character}
                                />
                            ))}
                        </div>
                    )}
            </section>

            <section>
                <h2>Hechizos Favoritos</h2>
                {favoriteSpells.length === 0? <p>No hay hechizos favoritos</p>: (
                        <div>
                            {favoriteSpells.map((spell) => (
                                <SpellDetail key={spell.id} spell={spell} />
                            ))}
                        </div>
                    )}
            </section>
        </div>
    );
}
