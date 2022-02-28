import { useState, useEffect } from 'react';
import { supabase } from './../lib/supabase';

const useSession = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return session;
};

export { useSession };
