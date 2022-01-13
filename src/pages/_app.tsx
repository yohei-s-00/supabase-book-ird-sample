import { Auth } from "@supabase/ui";
import { AuthLayout } from "src/layout/AuthLayout";
import { client } from "src/libs/supabase";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div>
      <Auth.UserContextProvider supabaseClient={client}>
        <AuthLayout>
          <Component {...pageProps} />
        </AuthLayout>
      </Auth.UserContextProvider>
    </div>
  )
}

export default MyApp;
