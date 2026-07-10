import cls from '@/styles/modules/heroCard.module.scss';

type HeroCardProps = {
  name: string
  race: string
  gender: string
  height: string
  weight: string
  planet: string
  onOpen: () => void
}

export function HeroCard(props: HeroCardProps) {
  const avaImg = `/img/heroes/${props.name}_face.jpg`;

  return (
    <div className={cls.hero} onClick={props.onOpen}>
      <div className={cls.side}>
        <div className={cls.ava}>
          <img src={avaImg} alt="hero_ava"/>
        </div>
        <div className={cls.name}>{props.name}</div>
      </div>
      <div className={cls.side}>
        <div className={cls.line}><span>Race:</span> {props.race}</div>
        <div className={cls.line}><span>Gender:</span> {props.gender}</div>
        <div className={cls.line}><span>Height:</span> {props.height}</div>
        <div className={cls.line}><span>Weight:</span> {props.weight}</div>
        <div className={cls.line}><span>Planet:</span> {props.planet}</div>
      </div>
    </div>
  )
}