import {Package} from "../../../model/package";
import * as Mui from "@mui/material";
import {Box, Card, CardActions, CardContent, CardHeader, FormControl, TextField} from "@mui/material";
import {PackageDetails, Params, ParamsPage} from "./PackageDetails";
import * as React from "react";
import {useEffect, useState} from "react";
import {LoadingOverlay} from "../../../components/LoadingOverlay";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import {loadPackageDetails, readFile} from "./helper";

export interface PackageProps {
    pkg: Package
    params: Params
    cancel: () => void
    install: (name: string, params: Params) => void
}

export function PackagePage(props: PackageProps) {
    let [name, setName] = useState(props.pkg.name)
    let [params, setParams] = useState({...props.params} as any)
    let [valid, setValid] = useState(false)

    const [packageDetails, setPackageDetails] = useState<PackageDetails>()
    const [paramsContent, setParamsContent] = useState<string>()

    useEffect(() => {
        (async function () {
            const packageDetails = await loadPackageDetails(props.pkg)
            const paramsFile = await readFile(props.pkg.repository, `${props.pkg.path}/${packageDetails.paramsFile}`)

            setPackageDetails(packageDetails)
            setParamsContent(paramsFile)
        })()
    }, [props.pkg.repository, props.pkg.path, props.pkg.name])

    if (!packageDetails) {
        return <LoadingOverlay/>
    }

    let exports: any = {}
    let require = (name: string) => {
        switch (name) {
            case '@mui/material':
                return Mui
            case 'react':
                return React
            default:
                throw new Error(`Unknown module ${name}`)
        }
    }
    eval(paramsContent as string)
    const Params = exports.default as ParamsPage

    return <Box m={1} width='600px'>
        <Card>
            <CardHeader title={packageDetails.title}/>
            <CardContent>
                <FormControl fullWidth>
                    <TextField value={name}
                               onChange={e => {
                                   setName(e.target.value)
                               }}
                               label="Name"/>
                </FormControl>
                <Params params={params}
                        setParams={(params, valid) => {
                            setParams(params)
                            setValid(valid)
                        }}
                        details={packageDetails}/>
            </CardContent>
            <CardActions>
                <Button onClick={() => {
                    if (valid) {
                        props.install(name, params)
                    } else {
                        toast.error('Please fill in all required fields')
                    }
                }}>Install</Button>
                <Button onClick={() => {
                    props.cancel()
                }}>Cancel</Button>
            </CardActions>
        </Card>
    </Box>
}
