import { createClient } from "@supabase/supabase-js";

const options = {
  db: {
    schema: "public",
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: {
      "x-my-custom-header": "my-app-name",
    },
  },
};
export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY,
  options
);


export const getUser = async () => {
try{
return await (await supabase.auth.getUser()).data.user; 
}
catch(e){
    //console.log("error getting user ",e)
throw e
}
};


export const logoutUser=async()=>{
  try{
    await supabase.auth.signOut()
  }
  catch(e){
    console.log("errors signing out")
  }

}

