import {FC, useEffect, useRef} from 'react';
import EditorJS, {OutputData} from '@editorjs/editorjs';

type EditorProps = {
    value: OutputData;
    onChange: (data: OutputData) => void;
};

const Editor: FC<EditorProps> = ({value, onChange}) => {
    const editorContainer = useRef<HTMLDivElement>(null);
    const editorInstance = useRef<EditorJS | null>(null);

    useEffect(() => {
        if (editorContainer.current) {
            editorInstance.current = new EditorJS({
                holder: editorContainer.current,
                autofocus: true,
                data: value,
                onChange: async () => {
                    if (editorInstance.current) {
                        const outputData = await editorInstance.current.save();
                        onChange(outputData);
                    }
                },
                // Add your custom tools and configuration here
            });
        }

        return () => {
            editorInstance.current?.destroy();
            editorInstance.current = null;
        };
    }, []);

    return <div ref={editorContainer}/>;
};

export default Editor;
