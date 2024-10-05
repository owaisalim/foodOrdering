import { supabase } from "@/src/lib/superbase";
import { Session } from "@supabase/supabase-js";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

interface Profile {
    id: string;
    group: string;
    // Add other properties here based on your database schema
}

type AuthData = {
    session: Session | null;
    loading: boolean;
    profile: Profile | null;
    isAdmin: boolean;
}


const AuthContext = createContext<AuthData>({
    session:null,
    loading:true,
    profile:null,
    isAdmin:false
});

export default function AuthProvider({children}:PropsWithChildren){
    const [session, setSession] = useState<Session | null >(null)
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState<Profile | null>(null);


    useEffect(() =>{
            const fetchSession = async() =>{
                const {data:{session}} = await supabase.auth.getSession()
                setSession(session)

                if ( session) {
                    // fetch profile
                    const { data } = await supabase
                      .from('profiles')
                      .select('*')
                      .eq('id', session.user.id)
                      .single();
                    setProfile(data || null);
                  }
                setLoading(false)

            }
            fetchSession()
            
            supabase.auth.onAuthStateChange((_event, session) => {
                setSession(session);
                
              });
    },[])
   
return <AuthContext.Provider value={{session,loading,profile,isAdmin:profile ?.group === "Admin"}}>{children}</AuthContext.Provider>
}
export const useAuth = () =>useContext(AuthContext)