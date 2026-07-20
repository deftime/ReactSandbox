import clsx from "clsx";
import cls from '@/styles/modules/heroDetails.module.scss';
import { BASE_URL } from "@/app/router.ts";
import { useSwapi } from "@/hooks/useSwapi.ts";
import { Loader } from "@/components/Loader.tsx";

type HeroDetailsProps = {
  url: string | null | undefined
}

export function HeroDetails(props: HeroDetailsProps) {
  const { singleData, dataLoading } = useSwapi(props.url);

  return (
    <div className={cls.heroDetails}>
      {dataLoading &&  <Loader variant={'absolute'} size={'big'} />}
      {!dataLoading && singleData && (
        <>
          <div className={cls.pic}>
            <img src={`${BASE_URL}img/heroes/${singleData.name}.jpg`} alt=""/>
          </div>
          <div className={cls.details}>
            <div className={cls.line}><span>Race: </span>{singleData.species}</div>
            <div className={cls.line}><span>Gender: </span>{singleData.gender}</div>
            <div className={cls.line}><span>Height: </span>{singleData.height}</div>
            <div className={cls.line}><span>Mass: </span>{singleData.mass}</div>
            <div className={cls.line}><span>Birth year: </span>{singleData.birth_year}</div>
            <div className={cls.line}><span>Native planet: </span>{singleData.homeworld}</div>
          </div>
          <div className={clsx(cls.data, cls.films)}>
            <div className={cls.title}>Films:</div>
            {singleData.films.length ? singleData.films.map((elem) => <span key={elem}>{elem}</span>) : <span>-none-</span>}
          </div>
          <div className={clsx(cls.data, cls.ships)}>
            <div className={cls.title}>Starships:</div>
            {singleData.starships.length ? singleData.starships.map((elem) => <span key={elem}>{elem}</span>) : <span>-none-</span>}
          </div>
          <div className={clsx(cls.data, cls.transports)}>
            <div className={cls.title}>Transport:</div>
            {singleData.vehicles.length ? singleData.vehicles.map((elem) => <span key={elem}>{elem}</span>) : <span>-none-</span>}
          </div>
        </>
      )}
    </div>
  )
}