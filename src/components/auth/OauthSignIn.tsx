import React from 'react'
import { supabase } from '../../supa/config';
import { FcGoogle } from 'react-icons/fc'
import { TheIcon } from '../../shared/extra/TheIcon';
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
className='p-2  gap-3 flex  items-center justify-center border-2 rounded-lg hover:scale-105 bg-slate-800'>

<TheIcon Icon={FcGoogle} size='40'/>
    <div className='text-lg font-bold '>Sign In</div>
</button>
 </div>
);
}
