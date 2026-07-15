import useSWR from "swr";
import { swapi } from "@/api/swapi.ts";
import type { Hero } from "@/types/swapiData.ts";

export function useSwapi() {
  const { data: heroesRaw, isLoading: heroesLoading } = useSWR('people/', () => swapi.getPeople());
  const { data: planetsRaw, isLoading: planetsLoading } = useSWR('planets/', () => swapi.getPlanets());
  const { data: racesRaw, isLoading: racesLoading } = useSWR('species/', () => swapi.getRaces());
  const { data: hero, isValidating: heroLoading, mutate: heroRefresh } = useSWR('hero', () => swapi.getHero('https://swapi.info/api/people/1'));
  // Выше мы получаем отдельно всех персонажей, расы и планеты.
  // Дальше мы создаем и готовим масив персонажей, включив в него уже готовые полученые даныне про Расу и Планету.

  let heroes: Array<Omit<Hero, 'species'> & {id: string, species: string}> = [];

  const isLoading = heroesLoading || planetsLoading || racesLoading;

  if (!isLoading && heroesRaw && planetsRaw && racesRaw) {
    heroes = heroesRaw.map(hero => {
      const url = hero.url;
      const id = url.slice(url.lastIndexOf('/') + 1);
      return {
        id,
        ...hero,
        homeworld: planetsRaw.find(planet => planet.url === hero.homeworld)?.name,
        species: racesRaw.find(race => race.url === hero.species[0])?.name ?? 'Human'
      }
    })
  }

  const getHero = (url: string, race: string, planet: string) => {
    heroRefresh(()=> swapi.getHero(url), { revalidate: false })
      .then(data => {
        console.log(data);
    })
  }

  // Списки - возвращаем полученный массив
  // Отдельный персонаж (или другая сущность) - возвращаем функцию-геттер
  // Геттер принимает линк и ставит его в стейт
  // Стейт запускает запрос, помещаясь в ключ и аргумент фетчера
  // Геттер ждет и получает данные
  // Обрабатывает их и возвращает вместе с Loading

  // Получаем массивы всех сущностей отдельными SWR
  // Собираем нужные обекты через функции, используя все полученные массивы


  return { heroes, hero, getHero, heroesLoading, heroLoading }
}