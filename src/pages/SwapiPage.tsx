import cls from '@/styles/pages/swapiPage.module.scss';
import { useSwapi } from "@/hooks/useSwapi.ts";

export function SwapiPage() {
  const { heroes, isLoading } = useSwapi();

  console.log(heroes);

  return (
    <section className={cls.swapiPage}>
      {isLoading && <span>Loading...</span>}
      {heroes && heroes.map((elem) => <div key={elem.url}>{elem.name}</div>)}
    </section>
  )
}