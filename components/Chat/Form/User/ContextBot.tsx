import React from 'react';
import Select from '../../../Common/Select';
import tw from 'twin.macro';
const ContextBot = () => {
  return (
    <div tw='mb-2'>
      <Select items={[{ name: 'Bot Reply 1' }, { name: 'Bot Reply 2' }, { name: 'Bot Reply 3' }]} />
    </div>
  );
};

export default ContextBot;
