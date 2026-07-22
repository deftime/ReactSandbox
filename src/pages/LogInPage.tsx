import clsx from "clsx";
import cls from '@/styles/pages/loginPage.module.scss';
import forms from '@/styles/forms/forms.module.scss';
import { WrapperLayout } from "@/components/WrapperLayout.tsx";
import { type SubmitHandler, useForm } from "react-hook-form";

type FormDataType = {
  name: string
  password: string
}

export function LogInPage() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormDataType>();

  const onSubmit: SubmitHandler<FormDataType> = (data) => {
    console.log(data);
  }

  // Тут будем делать авторизацию через Firebase
  // Обрабатываем ошибки
  // Нужно ли передавать новый статус или Firebase сам его запоминт и обновит?

  return (
    <section className={cls.loginPage}>
      <WrapperLayout>
        <div className={cls.title}>Log In</div>
        <form action="#" onSubmit={handleSubmit(onSubmit)}>
          <div className={forms.inputBlock}>
            <input type="email" placeholder="Login" {...register('name')} />
          </div>
          <div className={forms.inputBlock}>
            <input type="password" placeholder="Password" {...register('password')} />
          </div>
          <button type="submit" className={clsx(forms.submit, isSubmitting && forms.load)}>Send</button>
        </form>
      </WrapperLayout>
    </section>
  )
}