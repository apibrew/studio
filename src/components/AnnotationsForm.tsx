import {Annotations} from "../util/annotation";

export interface AnnotationsFormProps {
    value?: Annotations
    onChange: (annotations?: Annotations) => void
}

export function AnnotationsForm(props: AnnotationsFormProps) {
    return <>Annotations Form</>
}