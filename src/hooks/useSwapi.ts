import useSWR from "swr";
import { swapi } from "@/api/swapi.ts";
import type { hero } from "@/types/swapiData.ts";

export function useSwapi() {
  const { data: heroesRaw, isLoading } = useSWR('people/', () => swapi.getPeople());
  const { data: racePlanet, isLoading: rpLoading } = useSWR('race-planet', () => swapi.getRacePlanet());
  const { data: hero, isValidating: heroLoading, mutate: heroRefresh } = useSWR('hero', () => swapi.getHero('https://swapi.info/api/people/1'));
  // Выше мы получаем отдельно всех персонажей и набор пар Раса/Планета, поскольку на них стоят ссылки.
  // Дальше мы создаем и готовим масив персонажей, включив в него уже готовые полученые даныне про Расу и Планету.
  let heroes: Array<hero & {id: number}> = [];
  //let hero: Omit<hero, 'species'> & {species: string};

  if ((!isLoading && !rpLoading) && heroesRaw && racePlanet) {
    heroes = heroesRaw.map((hero, index) => {
      const id = Math.floor(Math.random() * 100000);
      return { id, ...hero, homeworld: racePlanet[index].planet, species: [racePlanet[index].race] }
    })
  }

  const getHero = (url: string, race: string, planet: string) => {
    heroRefresh(()=> swapi.getHero(url), { revalidate: false })
      .then(data => {
        console.log(data);
    })
  }

  // Резкая смена UI
  // Скачки размеров окна
  // Обработать данные по линкам
  // Подготовка данных наперед?

  // Запускаем при нажатии на карточку
  // Ставим ее URL как стейт /alt/ Запускаем mutate с фетчером с ID
  // Стейт инициирует запрос SWR + открывает попап /alt/ Данные SWR обновляються
  // Попап смотрит в данные SWR
  // По закритю попапа - опять ставим стейт в null, SWR очищает свои данные /alt/ Просто закрываем, состояние попапа внешнее

  return { heroes, hero, getHero, isLoading, heroLoading }
}