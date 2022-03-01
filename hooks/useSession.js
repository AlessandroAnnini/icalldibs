import { useState, useEffect } from 'react';
import { supabase } from './../lib/supabase';

const useSession = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    try {
      setSession(supabase.auth.session());
    } catch (error) {
      alert('session', error.message);
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      if (authListener) {
        authListener.unsubscribe();
      }
    };
  }, []);

  return session;
};

export { useSession };
