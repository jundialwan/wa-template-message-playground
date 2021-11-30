import tw, { TwStyle } from 'twin.macro';
import React, { Fragment, useState } from 'react';
import { Dialog } from '@headlessui/react';
import Transition from './Transition';
import Button from './Button/Button';

/**
 * HeadlessUI "Dialog (Modal)"
 * Customized for twin.macro + typescript
 * https://headlessui.dev/react/dialog
 */

type ContentProps = {
  title: string;
  content: React.ReactNode;
  footer: React.ReactNode;
  closeModal?: () => void;

  titleProps?: { as?: React.ElementType };
  descriptionProps?: { as?: React.ElementType };
  description?: { as?: React.ElementType };
};

type ModalProps = {
  dialogProps?: {
    open?: boolean;
    onClose?: () => void;
    tw?: string;
    initialFocus?: React.MutableRefObject<HTMLElement | null>;
    static?: boolean;
    unmount?: undefined;
  } & { as?: React.ElementType };
  contentProps: ContentProps;
  dialogOverlayProps?: { as?: React.ElementType };
  titleProps?: { as?: React.ElementType };
  descriptionProps?: { as?: React.ElementType };
  isOpen: boolean;
  onClose: () => void;
};

export default function Modal({ dialogProps, contentProps, dialogOverlayProps, titleProps, descriptionProps, isOpen, onClose }: ModalProps) {
  // let [isOpen, setIsOpen] = useState(false);

  // function closeModal() {
  //   setIsOpen(false);
  // }

  // function openModal() {
  //   setIsOpen(true);
  // }

  return (
    <Fragment>
      {/* <Trigger label={children} openModal={openModal} /> */}
      <Transition show={isOpen} as={Fragment}>
        <Dialog tw='fixed inset-0 z-10 overflow-y-auto' onClose={onClose} {...dialogProps}>
          <div tw='min-h-screen px-4 text-center'>
            <Transition.Child {...overlayTransitionProps} as='div'>
              <Dialog.Overlay tw='fixed inset-0 bg-black opacity-30' {...dialogOverlayProps} />
            </Transition.Child>
            <CenterAlignmentHack />
            <Transition.Child {...contentTransitionProps} as={Fragment}>
              <div tw='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl text-gray-900'>
                <Content {...contentProps} titleProps={titleProps} descriptionProps={descriptionProps} />
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  );
}

function Content({ title, content, footer, titleProps, descriptionProps, description }: ContentProps) {
  return (
    <Fragment>
      <Dialog.Title as='h3' tw='text-lg font-medium leading-6 text-gray-900' {...titleProps}>
        {title}
      </Dialog.Title>
      <Dialog.Description {...descriptionProps}>{description}</Dialog.Description>
      <div tw='mt-2'>{content}</div>
      <div tw='mt-4 flex'>{footer}</div>
    </Fragment>
  );
}

/* This element is to trick the browser into centering the modal contents. */
function CenterAlignmentHack() {
  return (
    <span tw='inline-block h-screen align-middle' aria-hidden='true'>
      &#8203;
    </span>
  );
}

const overlayTransitionProps = {
  enter: tw`ease-out duration-300`,
  enterFrom: tw`opacity-0`,
  enterTo: tw`opacity-100`,
  leave: tw`ease-in duration-200`,
  leaveFrom: tw`opacity-100`,
  leaveTo: tw`opacity-0`,
};

const contentTransitionProps = {
  enter: tw`ease-out duration-300`,
  enterFrom: tw`opacity-0 scale-95`,
  enterTo: tw`opacity-100 scale-100`,
  leave: tw`ease-in duration-200`,
  leaveFrom: tw`opacity-100 scale-100`,
  leaveTo: tw`opacity-0 scale-95`,
};
