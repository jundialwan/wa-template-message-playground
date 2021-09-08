import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { normalizedBodyTextSelector, renderedBodyTextSelector } from '../Recoil/bodyText'
import { normalizedFooterTextSelector } from '../Recoil/footerText'
import { headerTextSelector } from '../Recoil/header'

const TemplateMessagePreview: FC = () => {
  const headerText = useRecoilValue(headerTextSelector)
  const bodyText = useRecoilValue(renderedBodyTextSelector)
  const footerText = useRecoilValue(normalizedFooterTextSelector)

  return (
    <div className="w-full min-h-[20px] bg-white rounded-lg shadow z-10 px-2 py-1 text-black font-normal font-sans">
      <div className="font-bold">{headerText}</div>
      <div className="whitespace-pre-line	my-[6px]" dangerouslySetInnerHTML={{__html: bodyText}}></div>
      <div className="text-gray-600 text-xs">{footerText}</div>
      <div className="float-none text-right">
        <span className="text-gray-400 text-xs">10:10</span>
      </div>
    </div>
  )
}

export default TemplateMessagePreview