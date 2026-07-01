import { useNavigate } from "react-router-dom";
import { Brick } from "@/components/Brick.tsx";
import cls from '@/styles/pages/homePage.module.scss';

export function HomePage() {
  const navigate = useNavigate();

  const goTo = () => {
    navigate('/swapi')
  }

  return (
    <section className={cls.homePage}>
      <Brick img={'/img/app.png'} title={'App'} />
      <Brick img={'/img/save.png'} title={'Save'} />
      <Brick img={'/img/database.png'} title={'Data'} onClick={goTo} />
    </section>
  )
}