import cls from '@/styles/modules/loader.module.scss';
import loaderIcon from '@/assets/loader.png';

export function Loader() {
  return (
    <div className={cls.loader}>
      <img src={loaderIcon} alt="loader"/>
    </div>
  )
}