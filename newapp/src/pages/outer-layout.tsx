import type {FC, ReactNode} from 'react';
import PropTypes from 'prop-types';

interface LayoutProps {
    children: ReactNode;
}

export const Layout: FC<LayoutProps> = (props) => {
    const {children} = props;

    return (
        <div className="sign-pages">
            {children}
        </div>
    )
};

Layout.propTypes = {
    children: PropTypes.node,
};
