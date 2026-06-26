import { WrapperLayout } from "@/components/WrapperLayout.tsx";
import { FormSimple } from "@/components/FormSimple.tsx";
import { FormReact } from "@/components/FormReact.tsx";
import cls from '@/styles/modules/formsPage.module.scss';

export function FormsPage() {
  return (
    <section className={cls.formsPage}>
      <WrapperLayout>
        <FormSimple title={'Simple native form'} desc={'Simple native form description. Do not use React form library.'} />
      </WrapperLayout>
      <WrapperLayout>
        <FormReact title={'React form'} desc={'Simple react form description. Here we use React Hook Form.'} />
      </WrapperLayout>
    </section>
  )
}