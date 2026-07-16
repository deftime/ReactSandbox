import useSWR from "swr";
import { swapi } from "@/api/swapi.ts";
import type { Hero } from "@/types/swapiData.ts";

export function useSwapi(url: string | null = null) {
  const { data: heroesRaw, isLoading: heroesLoading } = useSWR('people/', () => swapi.getPeople());
  const { data: planetsRaw, isLoading: planetsLoading } = useSWR('planets/', () => swapi.getPlanets());
  const { data: racesRaw, isLoading: racesLoading } = useSWR('species/', () => swapi.getRaces());
  const { data: singleData, isLoading: dataLoading } = useSWR(url, () => swapi.getSingleData(url));

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
        homeworld: planetsRaw.find(planet => planet.url === hero.homeworld)?.name ?? '',
        species: racesRaw.find(race => race.url === hero.species[0])?.name ?? 'Human'
      }
    })
  }


  // ВАРИАНТ. Лишний стейт ввнутри хука.
  // Списки - возвращаем полученный массив
  // Отдельный персонаж (или другая сущность) - возвращаем функцию-геттер
  // Геттер принимает линк и ставит его в стейт
  // Стейт запускает запрос, помещаясь в ключ и аргумент фетчера
  // Геттер ждет и получает данные
  // Обрабатывает их и возвращает вместе с Loading

  // ВАРИАНТ. Получаем данные, которые могут быть не нужны.
  // Получаем массивы всех сущностей отдельными SWR
  // Собираем нужные обекты через функции, используя все полученные массивы


  return { heroes, singleData, heroesLoading, dataLoading }
}