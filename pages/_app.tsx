import { AppProps } from 'next/app'
import { useServerStyles } from '@ui/ssr'
import { UIProvider } from '@ui/Provider'
import { appWithTranslation } from 'next-i18next';
import { QueryProvider } from "@api/QueryProvider";
import '../ui/globals.css'

const NextApp = ({ Component, pageProps }: AppProps) => {
  useServerStyles()

  return (
    <QueryProvider>
      <UIProvider>
        <Component {...pageProps} />
      </UIProvider>
    </QueryProvider>
  )
}

export default appWithTranslation(NextApp)