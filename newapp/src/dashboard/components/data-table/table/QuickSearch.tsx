import {Box, IconButton} from "@mui/material";
import {useState} from "react";
import {PairExpression, Resource} from "@apibrew/react";
import TextField from "@mui/material/TextField";
import {BooleanExpression} from "@apibrew/client/model/extension";
import toast from "react-hot-toast";
import {Close, Search} from "@mui/icons-material";

export interface QuickSearchProps {
    resource: Resource
    query: BooleanExpression | undefined
    onApply: (sorting: BooleanExpression | undefined) => void
}

export function QuickSearch(props: QuickSearchProps) {
    const [searchText, setSearchText] = useState<string>(locateSearchTextFromQuery(props.query))

    return <Box p={1} width='600px'>
        <Box display='flex'>
            <TextField
                sx={{
                    flex: 1,
                    marginRight: '30px'
                }}
                label='Search'
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
            />
            <IconButton color='primary'
                    onClick={() => {
                        props.onApply(prepareQueryFromSearchText(props.resource, searchText))
                    }}>
                <Search/>
            </IconButton>
            <IconButton color='error'
                    onClick={() => {
                        props.onApply(undefined)
                    }}>
                <Close/>
            </IconButton>
        </Box>
    </Box>
}

function locateSearchTextFromQuery(query: BooleanExpression | undefined): string {
    if (query?.or) {
        for (const condition of query.or) {
            if ((condition as any).ilike) {
                return (condition as any).ilike.right.value as string;
            }
        }
    }
    return '';
}

function prepareQueryFromSearchText(resource: Resource, searchText: string): BooleanExpression | undefined {
    if (searchText === '') {
        return undefined;
    }

    const conditions: BooleanExpression[] = [];

    for (const propertyName of Object.keys(resource.properties)) {
        const property = resource.properties[propertyName];
        if (property.type === 'STRING') {
            conditions.push({
                ilike: {
                    left: {
                        property: propertyName
                    },
                    right: {
                        value: searchText as any
                    }
                } as PairExpression
            } as any);
        }
    }

    if (conditions.length === 0) {
        toast.error('No searchable fields found');
        return undefined;
    }

    return {
        or: conditions
    } as BooleanExpression;
}
