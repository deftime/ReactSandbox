import { useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { type TaskTypeClear, type TaskType, type TaskTypeClearId } from "@/hooks/useTasks.ts";
import clsx from "clsx";
import cls from '@/styles/forms/formAddTask.module.scss';
import forms from '@/styles/forms/forms.module.scss';

type FormAddTaskProps = {
  pushData: (data: TaskTypeClearId) => void
  getData: TaskType | null
}

export function FormAddTask(props: FormAddTaskProps) {
  const defaultValues: TaskTypeClear = { title: '', desc: '' };
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskTypeClear>({
    defaultValues
  });

  // Проверяем, пришли ли в форму данные для редактирования.
  // Если да - ставим их в поля.
  // Если нет - значит мы создаем новую, форма очищается.
  useEffect(() => {
    if (props.getData) {
      reset({ title: props.getData.title, desc: props.getData.desc})
    } else {
      reset(defaultValues);
    }
  }, [props.getData])

  // При сабмите проверяем есть ли полученные данные.
  // Отправляем наверх данные только с тем отличием - есть ID или нет.
  // Есть - это существующая таска, редактируем.
  // Нет - ID еще не создан, новая таска, будет создан методом из хука.
  const onSubmit: SubmitHandler<TaskTypeClear> = (data: TaskTypeClear) => {
    if (props.getData) {
      props.pushData({ ...data, id: props.getData.id});
    } else {
      props.pushData({ ...data, id: null});
    }
    reset(defaultValues);
  }

  return (
    <form action="#" className={cls.formTask} onSubmit={handleSubmit(onSubmit)}>
      <div className={clsx(forms.inputBlock, cls.inp)}>
        <label htmlFor="taskTitle">Add new task:</label>
        <input
          type="text"
          id="taskTitle"
          placeholder="Give name of your task..."
          {...register('title',
            { required: 'Enter your task', minLength: {value: 10, message: 'Minimum 10 chars'} }
          )}
        />
        {errors.title && <span className={forms.errorMsg}>{errors.title?.message}</span>}
      </div>
      <div className={clsx(forms.inputBlock, cls.inp)}>
        <label htmlFor="taskDesc">Task description:</label>
        <textarea id="taskDesc" placeholder="Optional..." {...register('desc')} />
      </div>
      <button type="submit" className={clsx(forms.submit, cls.submit)}>
        {props.getData ? 'Save' : 'Add'}
      </button>
    </form>
  )
}