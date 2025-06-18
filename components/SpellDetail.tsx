import { FunctionalComponent } from "preact";
import { APISpell } from "../utils/type.ts";
import SpellToggle from "../islands/SpellToggle.tsx";

type Props = {
    spell: APISpell;
};

const SpellDetail: FunctionalComponent<Props> = ({ spell }) => {
    return (
        <div class="spell-detail">
            <h3>{spell.name}</h3>
            <p>{spell.description}</p>
            <SpellToggle spell={spell} />
        </div>
    );
};

export default SpellDetail;
