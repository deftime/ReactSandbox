import { type SubmitHandler, useForm } from "react-hook-form";
import { type TaskTypeClear } from "@/hooks/useTasks.ts";
import clsx from "clsx";
import cls from '@/styles/modules/formAddTask.module.scss';
import forms from '@/styles/modules/forms.module.scss';

type FormAddTaskProps = {
  pushData: (data: TaskTypeClear) => void
}

export function FormAddTask(props: FormAddTaskProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskTypeClear>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<TaskTypeClear> = (data: TaskTypeClear) => {
    props.pushData(data);
    reset();
  }

  return (
    <form action="#" className={cls.formTask} onSubmit={handleSubmit(onSubmit)}>
      <div className={clsx(forms.inputBlock, cls.inp)}>
        <label htmlFor="taskTitle">Add new task:</label>
        <input type="text" id="taskTitle" placeholder="Give name of your task..." {...register('title', { required: 'Enter your task', minLength: 10 })} />
        {errors.title && <span className={forms.errorMsg}>{errors.title?.message}</span>}
      </div>
      <div className={clsx(forms.inputBlock, cls.inp)}>
        <label htmlFor="taskDesc">Task description:</label>
        <textarea id="taskDesc" placeholder="Optional..." {...register('desc')} />
      </div>
      <button type="submit" className={clsx(forms.submit, cls.submit)}>Add</button>
    </form>
  )
}