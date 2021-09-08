import React, { FC } from 'react'
import { Switch } from '@chakra-ui/react'
import { useRecoilState } from 'recoil'
import { QuickReplyButtonIndex, quickReplyButtonSelector } from '../Recoil/buttons'

const QuickReplyButtonsInput: FC = () => {
  return (
    <div className="flex flex-col p-2 mt-2 gap-1">
      <QuickReplyButtonInput order={0} />
      <QuickReplyButtonInput order={1} />
      <QuickReplyButtonInput order={2} />
    </div>
  )
}

const QuickReplyButtonInput: FC<{ order: QuickReplyButtonIndex }> = ({ order }) => {
  const [thisButton, setThisButton] = useRecoilState(quickReplyButtonSelector(order))

  const onToggleChange = (e: any) => setThisButton(curr => ({...curr, enabled: e.target.checked}))
  const onButtonTextChange = (e: any) => setThisButton(curr => ({...curr, text: e.target.value}))

  return (
    <div className="flex flex-row gap-1 items-center">
      <Switch isDisabled={order === 0} isChecked={thisButton.enabled} size="sm" colorScheme="teal" ringColor="#047857" onChange={onToggleChange}/>
      <input
        type="text" name={`reply-${order}`} id={`reply-${order}`} placeholder={`Reply button ${order+1}`} value={thisButton.text} onChange={onButtonTextChange}
        className="border py-1 px-2 rounded text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600"
      />
      <span className="text-xs">{thisButton.text.length}/20</span>
    </div>
  )
}

export default QuickReplyButtonsInput