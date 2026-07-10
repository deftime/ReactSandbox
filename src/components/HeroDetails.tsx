import clsx from "clsx";
import cls from '@/styles/modules/heroDetails.module.scss';

type HeroDetailsProps = {
  name: string
  race: string
  gender: string
  height: string
  weight: string
  year: string
  planet: string
  films: string[]
  starships: string[]
  transports: string[]
}

export function HeroDetails(props: HeroDetailsProps) {
  const pic: string = `/img/heroes/${props.name}.jpg`;

  return (
    <div className={cls.heroDetails}>
      <div className={cls.pic}>
        <img src={pic} alt=""/>
      </div>
      <div className={cls.details}>
        <div className={cls.line}><span>Race: </span>{props.race}</div>
        <div className={cls.line}><span>Gender: </span>{props.gender}</div>
        <div className={cls.line}><span>Height: </span>{props.height}</div>
        <div className={cls.line}><span>Mass: </span>{props.weight}</div>
        <div className={cls.line}><span>Birth year: </span>{props.year}</div>
        <div className={cls.line}><span>Native planet: </span>{props.planet}</div>
      </div>
      <div className={clsx(cls.data, cls.films)}>
        <div className={cls.title}>Films:</div>
        {props.films.length ? props.films.map((elem) => <span key={elem}>{elem}</span>) : <span>-none-</span>}
      </div>
      <div className={clsx(cls.data, cls.ships)}>
        <div className={cls.title}>Starships:</div>
        {props.starships.length ? props.starships.map((elem) => <span key={elem}>{elem}</span>) : <span>-none-</span>}
      </div>
      <div className={clsx(cls.data, cls.transports)}>
        <div className={cls.title}>Transport:</div>
        {props.transports.length ? props.transports.map((elem) => <span key={elem}>{elem}</span>) : <span>-none-</span>}
      </div>
    </div>
  )
}