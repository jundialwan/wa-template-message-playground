import 'react-aspect-ratio/aspect-ratio.css'
import { FC } from 'react'
import { useRecoilValue } from 'recoil'
import { Icon } from '@chakra-ui/react'
import { BsImage, BsPlay, BsFileEarmarkText } from 'react-icons/bs'
import { normalizedBodyTextSelector, renderedBodyTextSelector } from '../Recoil/bodyText'
import { allCTAButtonSelector, allQuickReplyButtonSelector, buttonsTypeSelector, CTAButtonIndex, QuickReplyButtonIndex, quickReplyButtonSelector } from '../Recoil/buttons'
import { normalizedFooterTextSelector } from '../Recoil/footerText'
import { headerTextSelector, headerTypeSelector } from '../Recoil/header'
import { classNames } from '../util'
import { PhoneIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import AspectRatio from 'react-aspect-ratio'
import { IconType } from 'react-icons'

const HeaderIllustration: FC<{ icon?: IconType, ratio: string, iconBoxSize: string }> = ({ icon, ratio, iconBoxSize }) => (
  <AspectRatio ratio={ratio}>
    <div className="w-full bg-gray-300 h-6 rounded-md font-bold text-gray-400 text-center items-center justify-center flex text-xl">
      {icon ? <Icon as={icon} boxSize={iconBoxSize} /> : null}
    </div>
  </AspectRatio>
) 

const TemplateMessagePreview: FC = () => {
  const headerType = useRecoilValue(headerTypeSelector)
  const headerText = useRecoilValue(headerTextSelector)
  const bodyText = useRecoilValue(renderedBodyTextSelector)
  const footerText = useRecoilValue(normalizedFooterTextSelector)
  const buttonType = useRecoilValue(buttonsTypeSelector)

  return (
    <>
      <div className="relative w-full min-h-[20px] bg-white rounded-lg shadow z-10 px-1 py-1 pb-2 text-black font-normal font-sans">
        {headerType === 'text' ? <div className="font-bold px-[4px]">{headerText}</div> : null}
        {headerType === 'image' ?
          <HeaderIllustration ratio="16/9" iconBoxSize="16" icon={BsImage} />
        : null}
        {headerType === 'video' ?
          <HeaderIllustration ratio="16/9" iconBoxSize="16" icon={BsPlay} />
        : null}
        {headerType === 'doc' ?
          <HeaderIllustration ratio="4/1" iconBoxSize="8" icon={BsFileEarmarkText} />
        : null}

        <div className="relative px-[4px] pb-2">
          <div className="whitespace-pre-line	my-[6px]">
            {bodyText ? <div dangerouslySetInnerHTML={{__html: bodyText}}></div> : <div>&nbsp;</div>}
          </div>
          <div className="text-gray-600 text-xs">{footerText}</div>
          <div className="absolute bottom-0 right-[4px] text-right">
            <span className="text-gray-400 text-xs">10:10</span>
          </div>
        </div>

        {
          buttonType === 'cta' ?
            <>
              <div className="border-t mx-[6px] my-[2px]"></div>
      
              <CTAButton order={0} />
              <CTAButton order={1} />
            </>
          : null
        }
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

const CTAButton: FC<{ order: CTAButtonIndex }> = ({ order }) => {
  const allButtons = useRecoilValue(allCTAButtonSelector)
  const thisButton = allButtons[order]

  if (thisButton.enabled) {
    return (
      <div className="font-sans text-base text-center text-[#00A5F4] py-1 flex flex-row gap-1 items-center justify-center">
        {thisButton.type === 'call-phone' ? <PhoneIcon /> : <ExternalLinkIcon />}
        <span>{thisButton.text}</span>
      </div>
    )
  } else {
    return null
  }

}