import { createContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../../lib/supabase';
import { User } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  username: string;
  user_id: string;
  full_name: string;
  avatar_url?: string;
  avatar_img: string;
  user_age: number;
  location: string;
  user_bio: string;
  user_coordinate: object;
}

interface UserContextType {
  user: User;
  profile: UserProfile;
  loading: boolean;
  refreshProfile: () => Promise<void>;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  profile: null,
  loading: true,
  refreshProfile: async () => {},
});

// export const UserContext = createContext({
//   user: User || null,
//   profile: UserProfile || null,
//   refreshProfile: async () => {},
//   loading: true,
// });

export default function UserProvider({ children }) {
  const [user, setUser] = useState({ user: null, profile: null });

  useEffect(() => {
    const getUserAndProfile = async () => {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData?.user ?? null;

      let profile = null;
      if (user) {
        const { data } = await supabase
          .from('user_profile')
          .select('*')
          .eq('user_id', user.id)
          .single();
        profile = data ?? null;
      }

      setUser({ user, profile });
    };

    getUserAndProfile();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null;
      if (user) {
        supabase
          .from('user_profile')
          .select('*')
          .eq('user_id', user.id)
          .single()
          .then(({ data }) => {
            setUser({ user, profile: data ?? null });
          });
      } else {
        setUser({ user: null, profile: null });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const refreshProfile = async (userId = user?.user?.id) => {
    if (!userId) return;

    const { data } = await supabase
      .from('user_profile')
      .select('*')
      .eq('user_id', userId)
      .single();

    setUser((prev) => ({ ...prev, profile: data ?? null }));
  };

  return (
    <UserContext.Provider value={{ ...user, refreshProfile }}>
      {children}
    </UserContext.Provider>
  );
}
