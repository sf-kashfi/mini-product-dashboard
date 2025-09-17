import type { ReactNode } from "react";
import {
    createTheme,
    ThemeProvider as MUIThemeProvider,
    StyledEngineProvider
} from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

interface Props {
    children: ReactNode;
}

function ThemeProvider({ children }: Props) {
    const theme = createTheme({
        palette: {
            mode: "light",
            primary: {
                main: "#1976d2",
            },
            secondary: {
                main: "#9c27b0",
            },
        },
        typography: {
            fontFamily: "Roboto, Arial, sans-serif",
        },
    });

    return (
        <StyledEngineProvider injectFirst>
            <MUIThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MUIThemeProvider>
        </StyledEngineProvider>
    )
}

export default ThemeProvider
