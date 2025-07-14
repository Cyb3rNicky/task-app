import {
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
} from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import { Alert } from "react-native";
import AuthForm from "../../components/AuthForm";
import { supabase } from "../../lib/supabase";
import { useUserInfo } from "../../lib/userContext";
import { useRouter } from "expo-router";

export default function AuthScreen() {
  const [loading, setLoading] = useState(false);
  const { session } = useUserInfo();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.replace("/"); // Redirige al layout principal
    }
  }, [session]);

  const handleSignup = async (credentials: SignUpWithPasswordCredentials) => {
    if (!("email" in credentials)) return;
    setLoading(true);
    const { email, password, options } = credentials;
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options,
    });

    if (error) Alert.alert(error.message);
    console.log(data);
    setLoading(false);
  };

  const handleLogin = async (credentials: SignInWithPasswordCredentials) => {
    if (!("email" in credentials)) return;
    setLoading(true);
    const { email, password } = credentials;
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    console.log(data);
    setLoading(false);
  };

  return (
    <AuthForm loading={loading} onLogin={handleLogin} onSignUp={handleSignup} />
  );
}
