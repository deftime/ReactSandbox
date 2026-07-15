import cls from '@/styles/pages/swapiPage.module.scss';
import { useState } from "react";
import { useSwapi } from "@/hooks/useSwapi.ts";
import { Loader } from "@/components/Loader.tsx";
import { HeroCard } from "@/components/HeroCard.tsx";
import { PopupLayout } from "@/components/PopupLayout.tsx";
import { HeroDetails } from "@/components/HeroDetails.tsx";

export function SwapiPage() {
  const { heroes, hero, getHero, heroLoading, heroesLoading } = useSwapi();
  const [ isOpen, setOpen ] = useState<boolean>(false);

  console.log(heroes);

  return (
    <>
      <section className={cls.swapiPage}>
        {heroesLoading && <Loader />}
        {(!heroesLoading && heroes) &&
          heroes.map((elem) => <HeroCard
            key={elem.id}
            name={elem.name}
            race={elem.species}
            gender={elem.gender}
            height={elem.height}
            weight={elem.mass}
            planet={elem.homeworld}
            onOpen={() => {
              getHero(elem.url, elem.species[0] ?? 'Human', elem.homeworld);
              setOpen(true);
            }}
          />)}
      </section>
      {isOpen && (
        <PopupLayout isOpen title={heroLoading ? 'Loading...' : hero.name} onClose={()=> setOpen(false)}>
          {heroLoading && <Loader />}
          {!heroLoading && <HeroDetails
            name={hero.name}
            race={hero.species[0] ?? 'Human'}
            gender={hero.gender}
            height={hero.height}
            weight={hero.mass}
            planet={hero.homeworld}
            year={hero.birth_year}
            films={hero.films}
            starships={hero.starships}
            transports={hero.vehicles}
          />}
        </PopupLayout>
      )}
    </>
  )
}