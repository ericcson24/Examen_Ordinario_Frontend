import { useEffect, useState } from "preact/hooks";
import { FunctionalComponent } from "preact";
import { APISpell } from "../utils/type.ts";

type Props = {
    spell: APISpell;
};

const SpellToggle: FunctionalComponent<Props> = ({ spell }) => {
    const [favorito, setFavorito] = useState(false);

    useEffect(() => {
        const cookie = document.cookie
            .split("; ")
            .find((c) => c.startsWith("spellfav="));
        if (cookie) {
            try {
                const favs = JSON.parse(
                    decodeURIComponent(cookie.split("=")[1]),
                ) as APISpell[];
                setFavorito(favs.some((s) => s.id === spell.id));
            } catch {
                setFavorito(false);
            }
        }
    }, [spell.id]);

    const toggleFav = () => {
        const cookie = document.cookie
            .split("; ")
            .find((c) => c.startsWith("spellfav="));
        let favs: APISpell[] = [];

        if (cookie) {
            try {
                favs = JSON.parse(decodeURIComponent(cookie.split("=")[1]));
            } catch {
                favs = [];
            }
        }

        if (favs.some((s) => s.id === spell.id)) {
            favs = favs.filter((s) => s.id !== spell.id);
            setFavorito(false);
        } else {
            favs.push(spell);
            setFavorito(true);
        }

        const date = new Date();
        date.setTime(date.getTime() + 86400000);
        document.cookie = `spellfav=${
            encodeURIComponent(
                JSON.stringify(favs),
            )
        };Expires=${date.toUTCString()};Path=/`;
    };

    return (
        <button type="button" onClick={toggleFav}>
            {favorito ? "★ " : "☆ "}
        </button>
    );
};

export default SpellToggle;
