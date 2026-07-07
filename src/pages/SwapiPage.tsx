import cls from '@/styles/pages/swapiPage.module.scss';
import { useSwapi } from "@/hooks/useSwapi.ts";
import { Loader } from "@/components/Loader.tsx";
import { HeroCard } from "@/components/HeroCard.tsx";

export function SwapiPage() {
  const { heroes, isLoading } = useSwapi();

  return (
    <section className={cls.swapiPage}>
      {isLoading && <Loader />}
      {(!isLoading && heroes) &&
        heroes.map((elem) => <HeroCard
          key={elem.id}
          name={elem.name}
          race={elem.species[0] ?? 'Human'}
          gender={elem.gender}
          height={elem.height}
          weight={elem.mass}
          planet={elem.homeworld} />)}
    </section>
  )
}