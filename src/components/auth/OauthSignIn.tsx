import React from 'react'
import { TheIcon } from '../../shared/TheIcon';
import { supabase } from '../../supa/config';
import { FcGoogle } from 'react-icons/fc'
interface OauthSignInProps {

}

export const OauthSignIn: React.FC<OauthSignInProps> = ({}) => {

    const signInWith=async()=>{
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: 'https://oooyhpgalfbpqvmutcru.supabase.co/auth/v1/callback'
            }
        })
    }
return (
 <div className='w-full h-full flex items-center justify-center'>
<button 
onClick={()=>signInWith()}
className='p-5 flex flex-col items-center justify-center border-2 rounded-lg hover:scale-105'>
<div>SIGN IN WITH GOOGLE</div>
<TheIcon Icon={FcGoogle} size='40'/>
</button>
 </div>
);
}
