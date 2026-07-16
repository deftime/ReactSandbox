import clsx from "clsx";
import cls from '@/styles/modules/loader.module.scss';
import loaderIcon from '@/assets/loader.png';

type LoaderProps = {
  variant?: 'absolute'
  size?: 'big'
}

export function Loader(props: LoaderProps) {
  return (
    <div className={clsx(cls.loader,
      props.variant && cls[props.variant],
      props.size && cls[props.size])}>
      <img src={loaderIcon} alt="loader"/>
    </div>
  )
}