import { WrapperLayout } from "@/components/WrapperLayout.tsx";
import { FormSimple } from "@/components/FormSimple.tsx";
import cls from '@/styles/modules/formsPage.module.scss';

export function FormsPage() {
  return (
    <section className={cls.formsPage}>
      <WrapperLayout>
        <FormSimple title={'Simple native form'} desc={'Simple native form description. Do not use React form library.'} />
      </WrapperLayout>
    </section>
  )
}