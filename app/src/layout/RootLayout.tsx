import {Toaster} from "react-hot-toast";
import {ReactNode} from "react";

export interface RootLayoutProps {
    children: ReactNode;
}

export function RootLayout(props: RootLayoutProps) {
    return <>
        <Toaster position='bottom-right'/>
        {props.children}
    </>
}
