import useSWR from "swr";
import type { Hero } from "@/types/swapiData.ts";
import { swapi } from "@/api/swapi.ts";
import { getIdFormUrl } from "@/utils/getIdFormUrl.ts";

export function useSwapi(url: string | null = null) {
  const { data: heroesRaw, isLoading: heroesLoading } = useSWR('people/', () => swapi.getPeople());
  const { data: planetsRaw, isLoading: planetsLoading } = useSWR('planets/', () => swapi.getPlanets());
  const { data: racesRaw, isLoading: racesLoading } = useSWR('species/', () => swapi.getRaces());
  const { data: singleDataRaw, isLoading: dataLoading } = useSWR(url, () => swapi.getSingleData(url));

  // Выше мы получаем отдельно всех персонажей, расы и планеты.
  // Дальше мы создаем и готовим масив персонажей, включив в него уже готовые полученые даныне про Расу и Планету.

  let heroes: Array<Omit<Hero, 'species'> & {id: string, species: string}> = [];
  let singleData: Omit<Hero, 'species'> & {id: string, species: string} | undefined = undefined;

  const isLoading = heroesLoading || planetsLoading || racesLoading || dataLoading;
  const planetRacesReady = !!planetsRaw && !!racesRaw;

  if (!isLoading && heroesRaw && planetRacesReady) {
    heroes = heroesRaw.map(hero => {
      const id = getIdFormUrl(hero.url);
      return {
        id,
        ...hero,
        homeworld: planetsRaw.find(planet => planet.url === hero.homeworld)?.name ?? '',
        species: racesRaw.find(race => race.url === hero.species[0])?.name ?? 'Human'
      }
    })
  }

  // Готовим отдельного персонажа. Но далее мы можем готвоить и другую сущность (Планету, Расу, Трансопорт...).
  if (!isLoading && singleDataRaw && 'gender' in singleDataRaw && planetRacesReady) {
    const id = getIdFormUrl(singleDataRaw.url);
    singleData = {
      id,
      ...singleDataRaw,
      homeworld: planetsRaw.find(planet => planet.url === singleDataRaw.homeworld)?.name ?? '',
      species: racesRaw.find(race => race.url === singleDataRaw.species[0])?.name ?? 'Human'
    }
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