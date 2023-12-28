import CustomImage from "../../ui/customImage";
import profile from "../../../assets/icons/profile-icon.svg"
import { useI18n } from "@/locales/client";

export default function Header() {
  const t = useI18n()
  return (
    <div className='w-full h-[70px] bg-theme border-b border-theme flex justify-between p-4'>
      <div className="flex m-2">
        <div className="text-primary-500 mx-1">{t('club')}</div>
        <div>{t('community')}</div>
      </div>
      <div className="flex">
        <CustomImage src={profile} height={40} width={40} />
        <div className="m-2">{t('helloUser')}</div>
      </div>
    </div>
  )
}
