import type { hero } from "@/types/swapiData.ts";

const BASE_URL = 'https://swapi.info/api/';

type swapiType = {
  getPeople: () => Promise< hero[] >
}

export const swapi: swapiType = {
  getPeople: async () => {
    const res = await fetch(`${BASE_URL}people/`);
    return await res.json();
  }
}