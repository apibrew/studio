export interface Author {
    name: string;
    email: string;
}

export interface Step {
    operation: 'applyModule' | 'applyScript';
    name?: string;
    contentFile: string;
}

export interface PackageDetails {
    name: string;
    title: string;
    description: string;
    version: string;
    author: Author;
    license: string;
    paramsFile: string;
    uninstallScript: string;
    steps: Step[];
}


export interface Params {

}

export interface PageProps {
    details: any;

    params?: Params;
    setParams: (params: Params, valid: boolean) => void;
}

export type ParamsPage = (props: PageProps) => JSX.Element;
