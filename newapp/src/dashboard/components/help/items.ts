export type Category = 'general' | 'resources' | 'nano-code'

export interface HelpItem {
    title: string;
    link: string;
    category: Category;
}

export const helpItems: HelpItem[] = [
    {
        title: 'General',
        link: '/help/general',
        category: 'general'
    },
    {
        title: 'Resources',
        link: '/help/resources',
        category: 'resources'
    },
    {
        title: 'Resources',
        link: '/help/resources',
        category: 'resources'
    },
    {
        title: 'Resources',
        link: '/help/resources',
        category: 'resources'
    },
    {
        title: 'Resources',
        link: '/help/resources',
        category: 'resources'
    }
]
