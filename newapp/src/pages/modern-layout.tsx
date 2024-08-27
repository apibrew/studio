import type {FC, ReactNode} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import useMediaQuery from "@mui/material/useMediaQuery";
import type {Theme} from "@mui/material/styles/createTheme";
import {Logo} from "app/src/cloud/components/logo.tsx";

interface LayoutProps {
    children: ReactNode;
}

export const Layout: FC<LayoutProps> = (props) => {
    const {children} = props;

    const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

    return (
        <Box
            sx={{
                backgroundColor: 'background.default',
                display: 'flex',
                height: '100vh',
                flex: '1 1 auto',
                flexDirection: {
                    xs: 'column-reverse',
                    md: 'row',
                },
            }}
        >
            {!mdUp && <Box
                sx={{
                    alignItems: 'center',
                    backgroundColor: '#1C2537',
                    backgroundImage: 'url("/assets/gradient-bg.svg")',
                    backgroundPosition: 'top center',
                    backgroundRepeat: 'no-repeat',
                    color: 'common.white',
                    display: 'flex',
                    flex: {
                        xs: '0 0 auto',
                        md: '1 1 auto',
                    },
                    justifyContent: 'center',
                    p: {
                        xs: 4,
                        md: 8,
                    },
                }}
            >
                <Box maxWidth="md">
                    <Typography
                        sx={{mb: 1}}
                        variant="h4"
                    >
                        Streamlining Your API Development Journey
                    </Typography>
                    <Typography
                        color="#6C737F"
                        sx={{mb: 4}}
                    >
                        Experience the next generation of API management with ApiBrew – your one-stop solution
                        for
                        building, deploying, and managing APIs with ease. Harness the power of our intuitive,
                        low-code
                        platform to bring your applications to life faster than ever. Join our community of
                        innovators
                        and elevate your development workflow starting today.
                    </Typography>
                </Box>
            </Box>}
            <Box
                sx={{
                    backgroundColor: 'background.paper',
                    display: 'flex',
                    flex: {
                        xs: '1 1 auto',
                        md: '0 0 auto',
                    },
                    flexDirection: 'column',
                    justifyContent: {
                        md: 'center',
                    },
                    maxWidth: '100%',
                    p: {
                        xs: 4,
                        md: 8,
                    },
                    width: {
                        md: 600,
                    },
                }}
            >
                <a href='https://apibrew.io'
                   style={{
                       width: '200px',
                       marginBottom: '100px',
                       marginLeft: 'auto',
                       marginRight: 'auto',
                   }}>
                    <Logo/>
                </a>
                {children}
            </Box>
        </Box>
    );
};

Layout.propTypes = {
    children: PropTypes.node,
};
