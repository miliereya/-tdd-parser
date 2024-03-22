import { theme } from '@/config/theme'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { ThemeProvider } from '@mui/material'
import GlobalProvider from './global-context.provider'

interface Props {
	children: React.ReactNode
}

export const AppProvider = ({ children }: Props) => (
	<AppRouterCacheProvider>
		<ThemeProvider theme={theme}>
			<GlobalProvider>{children}</GlobalProvider>
		</ThemeProvider>
	</AppRouterCacheProvider>
)
