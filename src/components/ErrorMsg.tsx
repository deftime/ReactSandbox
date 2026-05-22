import type { FallbackProps } from "react-error-boundary"
import cls from '@/styles/modules/error.module.scss'

export function ErrorMsg({ error }: FallbackProps) {
  const message = error instanceof Error ? error.message : 'Something wrong in... ErrorMsg.tsx'

  return (
    <div className={cls.errorScreen}>
      <span>Fatal error!</span>
      <span>{message}</span>
    </div>
  )
}