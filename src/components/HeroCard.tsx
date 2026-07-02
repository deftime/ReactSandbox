import cls from '@/styles/modules/heroCard.module.scss';

type HeroCardProps = {
  name: string
  race: string
  gender: string
  height: string
  weight: string
  planet: string
}

export function HeroCard(props: HeroCardProps) {
  const avaImg = `/img/heroes/${props.name}_face.jpg`;

  return (
    <div className={cls.hero}>
      <div className={cls.side}>
        <div className={cls.ava}>
          <img src={avaImg} alt="hero_ava"/>
        </div>
        <div className={cls.name}>{props.name}</div>
      </div>
      <div className={cls.side}>
        <div className={cls.line}>Race: {props.race}</div>
        <div className={cls.line}>Gender: {props.gender}</div>
        <div className={cls.line}>Height: {props.height}</div>
        <div className={cls.line}>Weight: {props.weight}</div>
        <div className={cls.line}>Planet: {props.planet}</div>
      </div>
    </div>
  )
}