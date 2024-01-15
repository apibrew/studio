import React from "react";
import {Typography, useTheme} from "@mui/material";
import {Link, useMatches} from "react-router-dom";

export interface BreadcrumbsProps {

}

export interface RouterWithBreadcrumb {
    pathname: string
    handle: {
        breadcrumb: string
    }
}

export function Breadcrumbs() {
    const routeMatches = useMatches();
    const theme = useTheme()

    const breadcrumbs = routeMatches
        .map(item => item as RouterWithBreadcrumb)
        .filter(item => item.handle && item.handle.breadcrumb)
        .map(item => {
            return {
                title: item.handle.breadcrumb,
                link: item.pathname,
            }
        })

    return <>
        {breadcrumbs.map((breadcrumb, index) => {
            const isLast = index == breadcrumbs.length - 1
            const isLink = !isLast && breadcrumb.link

            return <React.Fragment key={index}>
                {index != 0 && <Typography style={{
                    padding: '4px',
                    margin: '0 5px',
                    color: 'rgb(150, 150, 150)',
                }}>
                    /
                </Typography>}
                <Typography sx={{
                    padding: '4px',
                    fontSize: '15px',
                    fontWeight: isLast ? 500 : 400,
                    color: isLast ? theme.palette.text.primary : theme.palette.text.secondary,
                }}>
                    {isLink && <Link
                        style={{
                            textDecoration: 'none',
                            color: 'black'
                        }}
                        to={breadcrumb.link}>{breadcrumb.title}</Link>}
                    {!isLink && breadcrumb.title}
                </Typography>
            </React.Fragment>
        })}
    </>
}