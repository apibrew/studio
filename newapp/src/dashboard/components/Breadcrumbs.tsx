import {Fragment} from "react";
import {ArrowForwardIos, Home} from "@mui/icons-material";
import {useActiveMenuItem} from "../hooks/active-menu-item.tsx";
import {Link, useParams} from "react-router-dom";

export interface BreadcrumbsProps {

}

export interface RouterWithBreadcrumb {
    pathname: string
    handle: {
        breadcrumb: string
    }
}

export function Breadcrumbs() {
    const {activeItem, activeSubItem} = useActiveMenuItem()
    const params = useParams()

    let breadcrumbs = [
        {
            title: activeItem?.title,
            link: activeItem?.path
        },
    ]

    if (activeSubItem) {
        breadcrumbs.push({
            title: activeSubItem?.title,
            link: undefined
        })
    }

    if (activeItem?.title === 'Home') {
        breadcrumbs = [
            {
                title: 'Dashboard',
                link: undefined
            },
            {
                title: 'Overview',
                link: undefined
            }
        ]
    }

    if (activeItem?.title === 'Resources') {
        breadcrumbs = [
            {
                title: 'Resources',
                link: undefined
            },
        ]

        if (params['namespace'] && params['namespace'] !== 'default') {
            breadcrumbs.push({
                title: params['namespace'],
                link: undefined
            })
        }

        if (params['resource']) {
            breadcrumbs.push({
                title: params['resource'],
                link: undefined
            })
        }

        breadcrumbs.push({
            title: 'Overview',
            link: undefined
        })
    }

    console.log(params)

    return <>
        <div className="mh-div1 flex-center">
            <Link to={'./'} style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit'
            }}>
                <Home/>
            </Link>

            {breadcrumbs.map((breadcrumb, index) => {
                return <Fragment key={index}>
                    <ArrowForwardIos/>
                    <span className='mh-text'>{breadcrumb.title}</span>
                </Fragment>
            })}
        </div>
    </>
}
