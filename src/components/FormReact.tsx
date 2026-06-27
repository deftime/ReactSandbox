import clsx from "clsx";
import cls from "@/styles/modules/forms.module.scss";
import clsSpec from "@/styles/modules/formReact.module.scss";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { PopupLayout } from "@/components/PopupLayout.tsx";

type FormReactProps = {
  title?: string
  desc?: string
}

type FormDataType = {
  name: string
  email: string
  direction: '0' | 'Auto' | 'IT' | 'Military' | 'Gaming'
  format: 'remote' | 'office' | 'hybrid'
  message: string
  policy: boolean
  rules: boolean
}

export function FormReact(props: FormReactProps) {
  const [formData, setFormData] = useState<FormDataType | null>(null);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormDataType>({
    mode: "onBlur"
  });

  const onSubmit: SubmitHandler<FormDataType> = async (data) => {
    await new Promise(resolve => setTimeout(()=>{
      setFormData(data);
      resolve(true);
    }, 2000))
  }

  return (
    <>
      <form action="#" className={clsSpec.formReact} onSubmit={handleSubmit(onSubmit)}>
        {props.title && <div className={cls.formTitle}>{props.title}</div>}
        {props.desc && <div className={cls.formDesc}>{props.desc}</div>}

        <div className={cls.inputBlock}>
          <input type="text" placeholder="Name" {...register('name')} />
        </div>
        <div className={clsx(cls.inputBlock, {[cls.error]: errors.email})}>
          <input type="email" placeholder="E-Mail" {...register('email', { required: 'This field is required!' })} />
          {errors.email && <span className={cls.errorMsg}>{errors.email?.message}</span>}
        </div>
        <div className={cls.inputBlock}>
          <select {...register('direction')}>
            <option value="0" disabled>Select direction...</option>
            <option value="Auto">Auto</option>
            <option value="IT">IT</option>
            <option value="Military">Military</option>
            <option value="Gaming">Gaming</option>
          </select>
        </div>
        <div className={clsx(cls.inputBlock, cls.inputRadio, {[cls.error]: errors.format})}>
          <label>
            <input type="radio" value="remote" {...register('format', {required: 'Need to choose one!'})} />
            <span className={cls.check}></span>
            <span>Remote</span>
          </label>
          <label>
            <input type="radio" value="office" {...register('format', {required: 'Need to choose one!'})} />
            <span className={cls.check}></span>
            <span>In-Office</span>
          </label>
          <label>
            <input type="radio" value="hybrid" {...register('format', {required: 'Need to choose one!'})}/>
            <span className={cls.check}></span>
            <span>Hybrid</span>
          </label>
          {errors.format && <span className={cls.errorMsg}>{errors.format?.message}</span>}
        </div>
        <div className={cls.inputBlock}>
          <textarea placeholder="Message" {...register('message')} />
        </div>
        <div className={clsx(cls.inputBlock, cls.inputCheckbox, { [cls.error]: errors.policy })}>
          <label>
            <input type="checkbox" {...register('policy', {required: 'Agree is required!'})} />
            <span className={cls.check}></span>
            <span>Agree Policy</span>
          </label>
          {errors.policy && <span className={cls.errorMsg}>{errors.policy?.message}</span>}
        </div>
        <div className={clsx(cls.inputBlock, cls.inputCheckbox, { [cls.error]: errors.rules})}>
          <label>
            <input type="checkbox" {...register('rules', {required: 'Agree is required!'})} />
            <span className={cls.check}></span>
            <span>Accept Rules</span>
          </label>
          {errors.rules && <span className={cls.errorMsg}>{errors.rules?.message}</span>}
        </div>
        <button type="submit" className={clsx(cls.submit, isSubmitting && cls.load)}>Send</button>
        <button type="button" className={clsx(cls.reset, clsSpec.reset)} onClick={()=> reset()}>Clear</button>
      </form>

      {formData &&
        <PopupLayout isOpen onClose={()=> setFormData(null)} title={'Form sent!'}>
          <div className={clsSpec.formData}>

            {/*Разоврачиваем объект. Превращаем в масив (масивов) и проходимся мапом.*/}
            {Object.entries(formData).map(([key, value]) => {
                if (value && typeof value === 'string') return (
                <div className={clsSpec.line} key={key}>
                  <span>{key}: </span><span>{value}</span>
                </div>
                )
              }
            )}

          </div>
        </PopupLayout>
      }
    </>

  )
}