import type { Hero, Planet, Race, RacePlanet } from "@/types/swapiData.ts";
import { getIdFormUrl } from "@/utils/getIdFormUrl.ts";

const BASE_URL = 'https://swapi.info/api/';

type swapiType = {
  getPeople: () => Promise< Hero[] >
  getPlanets: () => Promise< Planet[] >
  getRaces: () => Promise< Race[] >
  getData: (url: string[]) => Promise< unknown[] >
  getSingleData: (url: string | null) => Promise< Hero | Planet | Race >
  getRacePlanet: () => Promise< RacePlanet[] | undefined>
}

export const swapi: swapiType = {
  getPeople: async () => {
    const res = await fetch(`${BASE_URL}people/`);
    return await res.json();
  },
  getPlanets: async () => {
    const res = await fetch(`${BASE_URL}planets/`);
    return await res.json();
  },
  getRaces: async () => {
    const res = await fetch(`${BASE_URL}species/`);
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
  getSingleData: async (url) => {
    if (!url) return;
    const res = await fetch(url);
    return await res.json()
  },
  // Вариант получение Расы и Планеты. Слишком перегружен, по два запроса на КАЖДОГО героя!
  getRacePlanet: async () => {
    const heroes = await swapi.getPeople();
    const res = await Promise.all(
      heroes.map(async (hero)=> {
        const id = getIdFormUrl(hero.url);
        const planet = await fetch(hero.homeworld).then(rez => rez.json());
        const race = hero.species[0] ? await fetch(hero.species[0]).then(rez => rez.json()) : { name: 'Human' };
        return { id, race: race.name, planet: planet.name }
      })
    )
    return res;
  }
}