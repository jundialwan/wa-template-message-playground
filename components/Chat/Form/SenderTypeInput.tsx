import React, { FC } from 'react';
import { useRecoilState } from 'recoil';
import { senderTypeSelector } from '@/Recoil/senderText';
import RadioButtonItem from '@/components/Common/RadioButtonItem';
import tw, { styled, css, theme } from 'twin.macro';
import { listFlowAtom } from '@/Recoil/Flow/ListFlow';

const SenderTypeInput: FC<{ bubbleId: number; chatBy: string; flowId: number }> = ({ bubbleId, chatBy, flowId }) => {
  const [listFlow, setListFlow] = useRecoilState(listFlowAtom);
  const handleSenderTypeChange = (event: any, bubbleId: number, flowId: number) => {
    let newlistFlow = listFlow.map((data: any) => {
      console.log('data flowid', data);
      return {
        ...data,
        [flowId - 1]: {
          ...data[flowId - 1],
          bubbles: {
            ...data[flowId - 1].bubbles,
            [bubbleId]: {
              ...data[flowId].bubbles[bubbleId],
              chatBy: event.target.value,
            },
          },
        },
      };
    });
    // setListFlow(newlistFlow);
    console.log('listFlow after update', flowId);
  };
  console.log('listFlow flowId', flowId);
  return (
    <>
      <div tw='flex flex-row'>
        <RadioButtonItem isChecked={chatBy === 'brand'} value='brand' id='brand-sender' label='Brand' onChange={(event) => handleSenderTypeChange(event, bubbleId, flowId)} />
        <RadioButtonItem isChecked={chatBy === 'user'} value='user' id='user-sender' label='User' onChange={(event) => handleSenderTypeChange(event, bubbleId, flowId)} />
      </div>
    </>
  );
};

export default SenderTypeInput;
