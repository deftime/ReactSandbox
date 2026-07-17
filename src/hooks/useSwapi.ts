import { useEffect, useReducer } from "react";
import useSWR from "swr";
import type { Hero } from "@/types/swapiData.ts";
import { swapi } from "@/api/swapi.ts";
import { getIdFormUrl } from "@/utils/getIdFormUrl.ts";

// Довольно нагружений хук для базы SWAPI, но зато все инкапсулировано здесь, а наружу выходят полностью готовые данные.

type ArrReducerState = {
  films: string[]
  transport: string[]
  starships: string[]
}

type ArrReducerAction = {
  type: 'films' | 'transport' | 'starships'
  payload: string[]
}

function arrReducer(state: ArrReducerState, action: ArrReducerAction) {
  switch (action.type) {
    case 'films':
      return { ...state, films: action.payload };
    case 'transport':
      return { ...state, transport: action.payload };
    case 'starships':
      return { ...state, starships: action.payload };
  }
}

export function useSwapi(url: string | null = null) {
  const [ arrState, dispatch ] = useReducer(arrReducer, { films: [], transport: [], starships: [] });

  const { data: heroesRaw, isLoading: heroesLoading } = useSWR('people/', () => swapi.getPeople());
  const { data: planetsRaw, isLoading: planetsLoading } = useSWR('planets/', () => swapi.getPlanets());
  const { data: racesRaw, isLoading: racesLoading } = useSWR('species/', () => swapi.getRaces());
  const { data: singleDataRaw, isLoading: dataLoading } = useSWR(url, () => swapi.getSingleData(url));

  // Выше мы получаем отдельно всех персонажей, расы и планеты.
  // Дальше мы создаем и готовим масив персонажей или отдельного персонажа, включив в него уже готовые полученые даныне.

  let heroes: Array<Omit<Hero, 'species'> & {id: string, species: string}> = [];
  let singleData: Omit<Hero, 'species'> & {id: string, species: string} | undefined = undefined;

  const isLoading = heroesLoading || planetsLoading || racesLoading || dataLoading;
  const planetRacesReady = !!planetsRaw && !!racesRaw;

  // Готовим список персонажей.
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

  // Готовим отдельного персонажа. Но далее мы можем готовить и другую сущность (Планету, Расу, Трансопорт...).
  if (!isLoading && singleDataRaw && 'gender' in singleDataRaw && planetRacesReady) {
    const id = getIdFormUrl(singleDataRaw.url);
    singleData = {
      id,
      ...singleDataRaw,
      homeworld: planetsRaw.find(planet => planet.url === singleDataRaw.homeworld)?.name ?? '',
      species: racesRaw.find(race => race.url === singleDataRaw.species[0])?.name ?? 'Human',
      films: arrState.films,
      starships: arrState.starships,
      vehicles: arrState.transport
    }
  }

  // Получаем дополнительные данные-списки, которые состояти из ссылок.
  // Когда приходит сущность (Герой, Планета...) смотрим какие списки у нее есть и запрашиваем по каждой ссылке данные.
  // Берем из них имя/заголовок, формируем в масив и кладем в стейт.
  // Из стейта берем, когда собираем готовый к импорту объект.
  useEffect(() => {
    if (!singleDataRaw) return;
    'films' in singleDataRaw && swapi.getData(singleDataRaw.films).then(data => {
      dispatch({ type: 'films', payload: data.map(film => 'title' in film ? film.title : '') })
    })
    'starships' in singleDataRaw && swapi.getData(singleDataRaw.starships).then(data => {
      dispatch({ type: 'starships', payload: data.map(starship => 'name' in starship ? starship.name : '') })
    })
    'vehicles' in singleDataRaw && swapi.getData(singleDataRaw.vehicles).then(data => {
      dispatch({ type: 'transport', payload: data.map(vehicle => 'name' in vehicle ? vehicle.name : '') })
    })
  }, [singleDataRaw]);


  // ВАРИАНТ. Лишний стейт ввутри хука.
  // Списки - возвращаем полученный массив
  // Отдельный персонаж (или другая сущность) - возвращаем функцию-геттер
  // Геттер принимает линк и ставит его в стейт
  // Стейт запускает запрос, помещаясь в ключ и аргумент фетчера
  // Геттер ждет и получает данные
  // Обрабатывает их и возвращает вместе с Loading

  // ВАРИАНТ. Получаем данные, которые могут быть не нужны.
  // Получаем массивы всех сущностей отдельными SWR
  // Собираем нужные обекты через функции, используя все полученные массивы

  // ВАРИАНТ. Слишком закручено.
  // Еще один useSWR, который получает масив масивов списков Фильмов, Транспорта, Кораблей
  // useEffect (или просто if?), который зависит от даних отдельного героя/сущности
  // Когда герой получен еффект берет из него мисивы ссылок и ложит в стейт
  // Стейт запускает SWR
  // Когда даные получены - только тогда запускается потготовка отдельного героя
  // Берем данные из результатов двух SWR


  return { heroes, singleData, heroesLoading, dataLoading }
}