import type { hero } from "@/types/swapiData.ts";

const BASE_URL = 'https://swapi.info/api/';

type swapiType = {
  getPeople: () => Promise< hero[] >
  getData: (url: string[]) => Promise< unknown[] >
  getRacePlanet: () => Promise<{ race: string, planet: string }[] | undefined>
  getHero: (url: string) => Promise< hero >
}

export const swapi: swapiType = {
  getPeople: async () => {
    const res = await fetch(`${BASE_URL}people/`);
    return await res.json();
  },
  getData: async (url) => {
    const res = await Promise.all(
      url.map(url => {
        fetch(url).then(resp => resp.json())
      })
    )
    return res;
  },
  getRacePlanet: async () => {
    const heroes = await swapi.getPeople();
    const res = await Promise.all(
      heroes.map(async (hero)=> {
        const planet = await fetch(hero.homeworld).then(rez => rez.json());
        const race = hero.species[0] ? await fetch(hero.species[0]).then(rez => rez.json()) : { name: 'Human' };
        return { race: race.name, planet: planet.name }
      })
    )
    return res;
  },
  getHero: async (url: string) => {
    const res = await fetch(url);
    return await res.json()
  }
}