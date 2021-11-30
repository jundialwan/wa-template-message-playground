import React, { useEffect, useState } from 'react';
import tw, { styled } from 'twin.macro';
import LoginModal from '../Auth/LoginModal';
import Button from '../Common/Button/Button';
import Card from '../Common/Card';
import { supabase } from '@/utils/supabaseClient';

const UserWrap = (user: any) => {
  if (user) {
    return <h3 tw='text-base font-bold'>Hi, {user?.user_metadata?.name}</h3>;
  } else return <h3 tw='text-base font-bold'> Please sign in via Github</h3>;
};

const Header = () => {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    checkUser();
    window.addEventListener('hashchange', function () {
      checkUser();
    });
    console.log('user', user);
  }, [user]);
  async function checkUser() {
    const user = await supabase.auth.user();
    setUser(user);
  }
  async function signInWithGithub() {
    await supabase.auth.signIn({
      provider: 'github',
    });
  }
  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
  }

  return (
    <Card tw='flex items-center '>
      <Wrapper>
        <div>{UserWrap(user)}</div>
        <div tw='flex items-center space-x-2'>
          <AutoSave>
            <SaveDate>Last Saved November 21, 2021 at 12:00:00 AM</SaveDate>
          </AutoSave>
          <Button variant='primary' size='small'>
            Present
          </Button>
          {user ? (
            <Button variant='danger' size='small' onClick={signOut}>
              Logout
            </Button>
          ) : (
            <LoginModal
              contentProps={{
                title: 'Please Login first',
                content: (
                  <Button variant='secondary' size='default' tw='w-full text-center justify-center flex' onClick={signInWithGithub}>
                    Login via Github
                  </Button>
                ),
                closeLabel: 'Cancel',
              }}
            >
              Login
            </LoginModal>
          )}
        </div>
      </Wrapper>
    </Card>
  );
};

const Wrapper = tw.div`flex items-center space-x-2 w-full justify-between`;
const AutoSave = tw.div`flex space-x-2`;
const SaveDate = tw.p`text-sm text-gray-500 `;

export default Header;
