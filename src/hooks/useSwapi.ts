import { swapi } from "@/api/swapi.ts";
import useSWR from "swr";
import type { hero } from "@/types/swapiData.ts";

export function useSwapi() {
  const { data: heroesRaw, isLoading } = useSWR('people/', () => swapi.getPeople());
  const { data: racePlanet, isLoading: rpLoading } = useSWR('race-planet', () => swapi.getRacePlanet());
  let heroes: Array<hero & {id: number}> = [];

  if ((!isLoading && !rpLoading) && heroesRaw && racePlanet) {
    const id = Math.floor(Math.random() * 100);
    heroes = heroesRaw.map((hero, index) => {
      return { id, ...hero, homeworld: racePlanet[index].planet, species: [racePlanet[index].race] }
    })
  }

  //const getHero = (url: string) => {
    // Запускаем при нажатии на карточку
    // Ставим ее URL как стейт /alt/ Запускаем mutate с фетчером с ID
    // Стейт инициирует запрос SWR + открывает попап /alt/ Данные SWR обновляються
    // Попап смотрит в данные SWR
    // По закритю попапа - опять ставим стейт в null, SWR очищает свои данные /alt/ Просто закрываем, состояние попапа внешнее
  //}

  return { heroes, isLoading }
}