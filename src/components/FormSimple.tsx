import {type SubmitEvent, useState} from "react";
import clsx from "clsx";
import cls from '@/styles/forms/forms.module.scss';

type FormSimpleProps = {
  title?: string
  desc?: string
}

type FormDataType = {
  name: string
  mail: string
  text: string
}

export function FormSimple(props: FormSimpleProps) {
  const [ data, setData ] = useState<FormDataType | null>(null);

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.currentTarget));
    setData(formData as FormDataType);
    console.log(formData);
  }

  return (
    <form action='#' name='nativeForm' className={cls.formBox} onSubmit={handleSubmit}>
      {props.title && <div className={cls.formTitle}>{props.title}</div>}
      {props.desc && <div className={cls.formDesc}>{props.desc}</div>}

      {data &&
        <div className={cls.thankMsg}>
          <div className={cls.thankTitle}>Form sent!</div>
          {Object.entries(data).map(([key, value]) => (
            <span key={key}>{key}: {value}</span>
          )
          )}
          <button type="button" className={clsx(cls.submit, cls.reset)} onClick={() => setData(null)}>Reset</button>
        </div>
      }

      {!data &&
        <>
          <div className={cls.inputBlock}>
            <input type="text" name="name" id="name" placeholder="Name" required />
          </div>
          <div className={cls.inputBlock}>
            <input type="email" name="mail" id="mail" placeholder="E-Mail" required />
          </div>
          <div className={cls.inputBlock}>
            <textarea name="text" id="text" placeholder="Message" />
          </div>
          <button type="submit" className={cls.submit}>Send</button>
        </>
      }
    </form>
  )
}