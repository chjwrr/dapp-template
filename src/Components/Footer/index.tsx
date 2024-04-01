import './index.less'
import useTranslationLanguage from "@/hooks/useTranslationLanguage";
export default function Footer() {
  const {t} = useTranslationLanguage()
  return(
    <div className="rowCenter footView">
      foot
    </div>
  )
}
