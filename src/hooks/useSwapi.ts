import { swapi } from "@/api/swapi.ts";
import useSWR from "swr";

export function useSwapi() {
  const { data: heroes, isLoading } = useSWR('people/', () => swapi.getPeople());

  const getHero = (url: string) => {
    // Запускаем при нажатии на карточку
    // Ставим ее URL как стейт /alt/ Запускаем mutate с фетчером с ID
    // Стейт инициирует запрос SWR + открывает попап /alt/ Данные SWR обновляються
    // Попап смотрит в данные SWR
    // По закритю попапа - опять ставим стейт в null, SWR очищает свои данные /alt/ Просто закрываем, состояние попапа внешнее
  }

  return { heroes, isLoading }
}