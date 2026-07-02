import type { hero } from "@/types/swapiData.ts";

const BASE_URL = 'https://swapi.info/api/';

type swapiType = {
  getPeople: () => Promise< hero[] >
  getData: (url: string[]) => Promise< unknown[] >
}

export const swapi: swapiType = {
  getPeople: async () => {
    const res = await fetch(`${BASE_URL}people/`);
    return await res.json();
  },
  getData: async (url: string[]) => {
    const res = await Promise.all(
      url.map(url => {
        fetch(url).then(resp => resp.json())
      })
    )
    return res;
  }
}