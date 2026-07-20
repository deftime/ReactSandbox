import { useNavigate } from "react-router-dom";
import { Brick } from "@/components/Brick.tsx";
import { BASE_URL } from "@/app/router.ts";
import cls from '@/styles/pages/homePage.module.scss';

export function HomePage() {
  const navigate = useNavigate();

  const goTo = () => {
    navigate('/swapi')
  }

  return (
    <section className={cls.homePage}>
      <Brick img={BASE_URL + 'img/app.png'} title={'App'} />
      <Brick img={BASE_URL + 'img/save.png'} title={'Save'} />
      <Brick img={BASE_URL + 'img/planets.png'} title={<>StarWars<br/>Heroes</>} onClick={goTo} />
    </section>
  )
}