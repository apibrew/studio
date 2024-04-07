import {Box, Grid, TextField, Typography} from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import OpenAI from "openai";
import {Instructions} from "./instructions";

const asistantName = 'asst_N4doNhgJCu6FkXWloc42sIkN'

const openai = new OpenAI({
    apiKey: "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",
    dangerouslyAllowBrowser: true
});

async function run(coreInstructions: string, userInstructions: string, onMessage: (message: string) => void) {
    const assistant = await openai.beta.assistants.update(
        asistantName,
        {
            instructions: coreInstructions,
            name: "ApiBrew - Api Maker",
            tools: [],
            model: "gpt-3.5-turbo",
        }
    )

    const thread = await openai.beta.threads.create()

    // await openai.beta.threads.messages.create(
    //     thread.id,
    //     {
    //         role: "user",
    //         content: assistantInstructions
    //     }
    // );
    await openai.beta.threads.messages.create(
        thread.id,
        {
            role: "user",
            content: userInstructions,
        }
    );

    // We use the createAndStream SDK helper to create a run with
// streaming. The SDK provides helpful event listeners to handle
// the streamed response.

    const run = openai.beta.threads.runs.createAndStream(thread.id, {
        assistant_id: assistant.id
    })
        .on('textCreated', (text) => onMessage('\nassistant > '))
        .on('textDelta', (textDelta, snapshot) => onMessage(textDelta.value!))
        .on('toolCallCreated', (toolCall) => onMessage(`\nassistant > ${toolCall.type}\n\n`))
        .on('toolCallDelta', (toolCallDelta, snapshot) => {
            if (toolCallDelta.type === 'code_interpreter') {
                if (toolCallDelta.code_interpreter?.input) {
                    onMessage("\nCode: >\n");
                    onMessage(toolCallDelta.code_interpreter.input);
                    onMessage("\nCode END: >\n");
                }
                if (toolCallDelta.code_interpreter?.outputs) {
                    onMessage("\noutput >\n");
                    toolCallDelta.code_interpreter.outputs.forEach(output => {
                        if (output.type === "logs") {
                            onMessage(`\n${output.logs}\n`);
                        }
                    });
                    onMessage("\nEND >\n");
                }
            }
        });
}

export function AIAssistantPage() {
    const [instructions, setInstructions] = React.useState<string>('')

    return <Grid container height='100%'>
        <Grid item xs={8} height='100%' borderRight='1px solid gray'>
            <Box m={2} height='100%'>
                <Box height='90%'>
                    <Typography>Instructions:</Typography>
                    <TextField value={instructions} onChange={e => setInstructions(e.target.value)}
                               multiline={true}
                               fullWidth
                               rows={20}
                               variant='filled'/>
                </Box>
                <Box height='10%' m={2}>
                    <Box flexGrow={1}/>
                    <Button onClick={() => {
                        run(Instructions, instructions, (message) => {
                            console.log(message)
                        })
                    }}>Run</Button>
                </Box>
            </Box>
        </Grid>
        <Grid item xs={4} height='100%'>
            <Box height='50%' m={1} borderBottom='1px solid gray'>
                <Typography>Use Cases:</Typography>
            </Box>
            <Box height='50%' m={1}>
                <Typography>Resources:</Typography>
            </Box>
        </Grid>
    </Grid>
}