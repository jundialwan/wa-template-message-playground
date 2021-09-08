import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { normalizedBodyTextSelector, renderedBodyTextSelector } from '../Recoil/bodyText'
import { allQuickReplyButtonSelector, buttonsTypeSelector, QuickReplyButtonIndex, quickReplyButtonSelector } from '../Recoil/buttons'
import { normalizedFooterTextSelector } from '../Recoil/footerText'
import { headerTextSelector } from '../Recoil/header'
import { classNames } from '../util'

const TemplateMessagePreview: FC = () => {
  const headerText = useRecoilValue(headerTextSelector)
  const bodyText = useRecoilValue(renderedBodyTextSelector)
  const footerText = useRecoilValue(normalizedFooterTextSelector)
  const buttonType = useRecoilValue(buttonsTypeSelector)

  return (
    <>
      <div className="w-full min-h-[20px] bg-white rounded-lg shadow z-10 px-2 py-1 text-black font-normal font-sans">
        <div className="font-bold">{headerText}</div>
        <div className="whitespace-pre-line	my-[6px]" dangerouslySetInnerHTML={{__html: bodyText}}></div>
        <div className="text-gray-600 text-xs">{footerText}</div>
        <div className="float-none text-right">
          <span className="text-gray-400 text-xs">10:10</span>
        </div>
      </div>
      {
        buttonType === 'reply' ?
          <div className="grid grid-cols-2 gap-[2px] mt-[2px]">
            <QuickReplyButton order={0} />
            <QuickReplyButton order={1} />
            <QuickReplyButton order={2} />
          </div>
        : null
      }
    </>
  )
}

export default TemplateMessagePreview

const QuickReplyButton: FC<{ order: QuickReplyButtonIndex }> = ({ order }) => {
  const allButtons = useRecoilValue(allQuickReplyButtonSelector)
  const thisButton = allButtons[order]

  const cn = classNames(
    'w-full min-h-[20px] bg-white rounded-lg shadow z-10 px-2 py-2 font-sans text-center text-[#00A5F4] font-normal',
    order === 2 || (order === 0 && !allButtons[1].enabled) ? 'col-span-2' : ''
  )

  if (thisButton.enabled) {
    return <div className={cn}>{thisButton.text}</div>
  } else {
    return null
  }
}