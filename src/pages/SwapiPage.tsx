import cls from '@/styles/pages/swapiPage.module.scss';
import { useSwapi } from "@/hooks/useSwapi.ts";
import { Loader } from "@/components/Loader.tsx";
import { HeroCard } from "@/components/HeroCard.tsx";

export function SwapiPage() {
  const { heroes, isLoading } = useSwapi();

  console.log(heroes);

  return (
    <section className={cls.swapiPage}>
      {isLoading && <Loader />}
      {!isLoading && <HeroCard />}
      {/*{heroes && heroes.map((elem) => <div key={elem.url}>{elem.name}</div>)}*/}
    </section>
  )
}