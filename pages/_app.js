import { SnackbarProvider } from 'notistack'
import ThemeRegistry from '../muiconfigs/ThemeRegistry'
import '../styles/globals.css'
import { StoreProvider } from '../utils/store'

function MyApp({ Component, pageProps }) {
  return (
  <ThemeRegistry>
  <StoreProvider>
    <SnackbarProvider>

  <Component {...pageProps} />
    </SnackbarProvider>
  </StoreProvider>
  </ThemeRegistry>
  )
}

export default MyApp
