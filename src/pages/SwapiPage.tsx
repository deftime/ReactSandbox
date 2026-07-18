import { useReducer } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useSwapi } from "@/hooks/useSwapi.ts";
import { Loader } from "@/components/Loader.tsx";
import { HeroCard } from "@/components/HeroCard.tsx";
import { PopupLayout } from "@/components/PopupLayout.tsx";
import { HeroDetails } from "@/components/HeroDetails.tsx";
import cls from '@/styles/pages/swapiPage.module.scss';

type ReducerStateType = {
  isOpen: boolean
  heroName?: string
  url?: string | null
}

type ActionType = {
  type: 'open'
  name?: string
  url?: string | null
} | {
  type: 'close'
}

const stateReducer = (state: ReducerStateType, action: ActionType) => {
  switch (action.type) {
    case 'open':
      return { isOpen: true, heroName: action.name, url: action.url };
    case 'close':
      return { isOpen: false, heroName: '', url: null };
    default:
      return state;
  }
}

export function SwapiPage() {
  const [ state, dispatch ] = useReducer(stateReducer, { isOpen: false, heroName: '', url: null });
  const { heroes, heroesLoading } = useSwapi();

  //console.log(state);

  return (
    <>
      <section className={cls.swapiPage}>
        {heroesLoading && <Loader />}
        {(!heroesLoading && heroes) &&
          heroes.map((elem, index) =>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.15 * index }}
            >
              <HeroCard
                key={elem.id}
                name={elem.name}
                race={elem.species}
                gender={elem.gender}
                height={elem.height}
                weight={elem.mass}
                planet={elem.homeworld}
                onOpen={() => {
                  dispatch({ type: 'open', name: elem.name, url: elem.url });
                }}
              />
            </motion.div>
            )}
      </section>
      <AnimatePresence>
        {state.isOpen && (
          <PopupLayout key={'popup'} isOpen title={state.heroName} onClose={()=> dispatch({ type: 'close' })}>
            <HeroDetails
              url={state.url}
            />
          </PopupLayout>
        )}
      </AnimatePresence>
    </>
  )
}