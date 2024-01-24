import {Box, IconButton} from "@mui/material";
import {AddBox} from "@mui/icons-material";
import React from "react";

export default function TestPage() {
    const [size, setSize] = React.useState(0)
    return <Box display='flex'
                sx={{
                    width: '100%',
                    height: '100%',
                    border: '1px solid black',
                }}
                flexDirection='column'>
        <Box display='flex'>
            <IconButton onClick={() => {
                setSize(size === 0 ? 1 : 0)
            }}>
                <AddBox/>
            </IconButton>
            <Box flexGrow={1}/>
            <IconButton>
                <AddBox/>
            </IconButton>
        </Box>
        <Box display='flex' flexGrow={1} style={{overflow: 'auto', height: '1px'}}>
            <Box display='flex' flexGrow={1} flexDirection='column' style={{overflow: 'auto', width: '1px'}}>
                {size === 0 && <div style={{
                    width: '20px',
                    height: '20px',
                    border: '1px solid black',
                }}></div>}
                {size === 1 && <div style={{
                    width: '2500px',
                    height: '2500px',
                    border: '1px solid black',
                    backgroundColor: 'lightcoral',
                }}>
                    <p>
                        asdasdasd dhaskj hdajs hdjksahd jkashdj ahsjdahsjdhasj hdjashdjash djashdj ashdj ahsjd
                    </p>
                    <p>
                        asdasdasd dhaskj hdajs hdjksahd jkashdj ahsjdahsjdhasj hdjashdjash djashdj ashdj ahsjd
                    </p>
                    <p>
                        asdasdasd dhaskj hdajs hdjksahd jkashdj ahsjdahsjdhasj hdjashdjash djashdj ashdj ahsjd
                    </p>
                    <p>
                        asdasdasd dhaskj hdajs hdjksahd jkashdj ahsjdahsjdhasj hdjashdjash djashdj ashdj ahsjd
                    </p>
                    <p>
                        asdasdasd dhaskj hdajs hdjksahd jkashdj ahsjdahsjdhasj hdjashdjash djashdj ashdj ahsjd
                    </p>
                    <p>
                        asdasdasd dhaskj hdajs hdjksahd jkashdj ahsjdahsjdhasj hdjashdjash djashdj ashdj ahsjd
                    </p>
                    <p>
                        asdasdasd dhaskj hdajs hdjksahd jkashdj ahsjdahsjdhasj hdjashdjash djashdj ashdj ahsjd
                    </p>
                    <p>
                        asdasdasd dhaskj hdajs hdjksahd jkashdj ahsjdahsjdhasj hdjashdjash djashdj ashdj ahsjd
                    </p>
                    <p>
                        asdasdasd dhaskj hdajs hdjksahd jkashdj ahsjdahsjdhasj hdjashdjash djashdj ashdj ahsjd
                    </p>
                    <p>
                        asdasdasd dhaskj hdajs hdjksahd jkashdj ahsjdahsjdhasj hdjashdjash djashdj ashdj ahsjd
                    </p>
                    <p>
                        asdasdasd dhaskj hdajs hdjksahd jkashdj ahsjdahsjdhasj hdjashdjash djashdj ashdj ahsjd
                    </p>
                    <p>
                        asdasdasd dhaskj hdajs hdjksahd jkashdj ahsjdahsjdhasj hdjashdjash djashdj ashdj ahsjd
                    </p>
                    <p>
                        asdasdasd dhaskj hdajs hdjksahd jkashdj ahsjdahsjdhasj hdjashdjash djashdj ashdj ahsjd
                    </p>
                    <p>
                        asdasdasd dhaskj hdajs hdjksahd jkashdj ahsjdahsjdhasj hdjashdjash djashdj ashdj ahsjd
                    </p>
                    <p>
                        asdasdasd dhaskj hdajs hdjksahd jkashdj ahsjdahsjdhasj hdjashdjash djashdj ashdj ahsjd
                    </p>
                    <p>
                        asdasdasd dhaskj hdajs hdjksahd jkashdj ahsjdahsjdhasj hdjashdjash djashdj ashdj ahsjd
                    </p>
                    <p>
                        end asdasdasd dhaskj hdajs hdjksahd jkashdj ahsjdahsjdhasj hdjashdjash djashdj ashdj ahsjd
                        end
                    </p>
                </div>}
            </Box>
        </Box>
        <Box display='flex'>
            <IconButton>
                <AddBox/>
            </IconButton>
            <Box flexGrow={1}/>
            <IconButton>
                <AddBox/>
            </IconButton>
        </Box>
    </Box>
}