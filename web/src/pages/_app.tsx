import { ApolloProvider } from '@apollo/client'
import { ColorScheme, MantineProvider } from '@mantine/core'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import { NotificationsProvider } from '@mantine/notifications'
import type { AppProps } from 'next/app'
import apolloClient from '../lib/apolloClient'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  })

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  useHotkeys([['ctrl+K', () => toggleColorScheme()]])

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colors: {
          brand: [
            '#E6E3F0',
            '#CBC4E5',
            '#B0A4DE',
            '#9480DF',
            '#7759E6',
            '#562BF7',
            '#4D26DF',
            '#4D30BB',
            '#4D389C',
            '#4A3B83',
          ],
        },
        colorScheme,
        primaryColor: 'brand',
      }}>
      <NotificationsProvider>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </NotificationsProvider>
    </MantineProvider>
  )
}

export default MyApp
