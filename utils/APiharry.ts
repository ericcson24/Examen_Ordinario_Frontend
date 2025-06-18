import { APICharacter, APISpell } from "./type.ts";

export async function getCharacters(): Promise<APICharacter[]> {
    const res = await fetch("https://hp-api.onrender.com/api/characters");
    if (!res.ok) throw new Error("error con la api");
    const data = await res.json();
    return data.map((char: any) => ({
        id: char.name,
        name: char.name,
        image: char.image,
        house: char.house,
        estado: char.alive,
    }));
}

export async function getSpells(): Promise<APISpell[]> {
    const res = await fetch("https://hp-api.onrender.com/api/spells");
    if (!res.ok) throw new Error("error con la api");
    const data = await res.json();
    return data.slice(0, 20).map((spell: any) => ({
        id: spell.name,
        name: spell.name,
        description: spell.description,
    }));
}
