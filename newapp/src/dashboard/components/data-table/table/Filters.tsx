import {Box, IconButton, MenuItem, TextField, Typography} from "@mui/material";
import {useMemo, useState} from "react";
import {Add, Clear} from "@mui/icons-material";
import Button from "@mui/material/Button";
import {PairExpression, Resource} from "@apibrew/react";
import {isComparableProperty} from "../../../../util/property";
import {BooleanExpression} from "@apibrew/client/model/permission";

export interface Filter {
    property: string
    operator: string
    value: any
}

export interface FiltersProps {
    resource: Resource
    query: BooleanExpression | undefined
    onApply: (exp: BooleanExpression | undefined) => void
}

export function Filters(props: FiltersProps) {
    const [filters, setFilters] = useState<Filter[]>(prepareFiltersFromBooleanExpression(props.query))
    const [changed, setChanged] = useState<boolean>(false)

    const properties = useMemo(() => Object.keys(props.resource.properties), [props.resource])

    return <Box p={1} width='800px'>
        {filters.length === 0 && <Typography fontSize={14}>
            No filters applied to this view
            <br/>
            Add a column below to filter the view
        </Typography>}

        {filters.map((filter, index) => {
            const property = props.resource.properties[filter.property]
            return <Box key={index} p={1} display='flex' alignItems='center'>
                <Box flex={1} marginRight={1}>
                    <TextField
                        className='filter-property'
                        select
                        label='Property'
                        fullWidth
                        value={filter.property}
                        onChange={e => {
                            filter.property = e.target.value as string
                            setFilters([...filters])
                            setChanged(true)
                        }}
                        size='small'>
                        <MenuItem/>
                        {properties.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                    </TextField>
                </Box>
                <Box flex={1} marginRight={1}>
                    <TextField
                        className='filter-operator'
                        select
                        label='Operator'
                        fullWidth
                        value={filter.operator}
                        onChange={e => {
                            filter.operator = e.target.value as string
                            setFilters([...filters])
                            setChanged(true)
                        }}
                        size='small'>
                        <MenuItem value='='>=</MenuItem>
                        <MenuItem value='!='>!=</MenuItem>
                        {property && isComparableProperty(property) && <>
                            <MenuItem value='>='>&gt;=</MenuItem>
                            <MenuItem value='<='>&lt;=</MenuItem>
                            <MenuItem value='>'>&gt;</MenuItem>
                            <MenuItem value='<'>&lt;</MenuItem>
                        </>}
                        <MenuItem value='is-null'>is null</MenuItem>
                        <MenuItem value='is-not-null'>is not null</MenuItem>
                    </TextField>
                </Box>
                <Box flex={4}>
                    <TextField
                        label='Value'
                        className='filter-value'
                        fullWidth
                        size='small'
                        value={filter.value}
                        onChange={e => {
                            filter.value = e.target.value
                            setFilters([...filters])
                            setChanged(true)
                        }}/>
                </Box>
                <Box marginLeft={1}>
                    <IconButton size='small' onClick={() => {
                        filters.splice(index, 1)
                        setFilters([...filters])
                        setChanged(true)
                    }}>
                        <Clear/>
                    </IconButton>
                </Box>
            </Box>
        })}

        <hr/>

        <Box display='flex'>
            <Button
                color='primary'
                variant='text'
                size='small'
                onClick={() => {
                    setFilters([...filters, {
                        property: '',
                        operator: '=',
                        value: ''
                    } as any])
                    setChanged(true)
                }}>
                <Add/>
                <span style={{marginLeft: '3px'}}>Add Filter</span>
            </Button>
            <Button
                color='primary'
                variant='text'
                size='small'
                onClick={() => {
                    // setFilters([...filters, {
                    //     property: '',
                    //     operator: '=',
                    //     value: ''
                    // } as any])
                    // setChanged(true)
                    alert('Not implemented')
                }}>
                <Add/>
                <span style={{marginLeft: '3px'}}>Add Group</span>
            </Button>
            <Box flexGrow={1}/>

            <Button color='secondary'
                    variant='text'
                    disabled={!changed} onClick={() => {
                props.onApply(undefined)
                setChanged(false)
            }}>
                <span style={{marginLeft: '3px'}}>Reset</span>
            </Button>

            <Button color='primary'
                    disabled={!changed}
                    onClick={() => {
                        props.onApply(prepareBooleanExpressionFromFilters(filters))
                        setChanged(false)
                    }}>
                <span style={{marginLeft: '3px'}}>Filter</span>
            </Button>
        </Box>
    </Box>
}

function prepareBooleanExpressionFromFilters(filters: Filter[]): BooleanExpression | undefined {
    const list: BooleanExpression[] = []

    filters.forEach(filter => {
        const pairExp: PairExpression = {
            left: {
                property: filter.property,
            },
            right: {
                value: filter.value
            }
        } as PairExpression

        if (filter.property && filter.operator && filter.value) {
            let exp: BooleanExpression

            switch (filter.operator) {
                case '=':
                    exp = {
                        equal: pairExp
                    } as BooleanExpression
                    break;
                case '!=':
                    exp = {
                        not: {
                            equal: pairExp
                        }
                    } as BooleanExpression
                    break;
                case '>=':
                    exp = {
                        greaterThanOrEqual: pairExp
                    } as BooleanExpression
                    break;
                case '<=':
                    exp = {
                        lessThanOrEqual: pairExp
                    } as BooleanExpression
                    break;
                case '>':
                    exp = {
                        greaterThan: pairExp
                    } as BooleanExpression
                    break;
                case '<':
                    exp = {
                        lessThan: pairExp
                    } as BooleanExpression
                    break;
                case 'is-null':
                    exp = {
                        isNull: {
                            property: filter.property
                        }
                    } as BooleanExpression
                    break;
                case 'is-not-null':
                    exp = {
                        not: {
                            isNull: {
                                property: filter.property
                            }
                        }
                    } as BooleanExpression
                    break;
                default:
                    throw new Error('Unknown operator: ' + filter.operator)
            }

            list.push(exp)
        }
    })

    if (list.length === 0) {
        return undefined
    } else if (list.length === 1) {
        return list[0]
    } else {
        return {
            and: list
        } as BooleanExpression
    }
}

function prepareFiltersFromBooleanExpression(expression?: BooleanExpression): Filter[] {
    const result: Filter[] = []

    if (!expression) {
        return result
    }

    const expList = expression.and || [expression]

    expList.forEach(exp => {
        if (exp.equal) {
            result.push({
                property: exp.equal.left.property,
                operator: '=',
                value: exp.equal.right.value
            })
        } else if (exp.not && exp.not.equal) {
            result.push({
                property: exp.not.equal.left.property,
                operator: '!=',
                value: exp.not.equal.right.value
            })
        } else if (exp.greaterThanOrEqual) {
            result.push({
                property: exp.greaterThanOrEqual.left.property,
                operator: '>=',
                value: exp.greaterThanOrEqual.right.value
            })
        } else if (exp.lessThanOrEqual) {
            result.push({
                property: exp.lessThanOrEqual.left.property,
                operator: '<=',
                value: exp.lessThanOrEqual.right.value
            })
        } else if (exp.greaterThan) {
            result.push({
                property: exp.greaterThan.left.property,
                operator: '>',
                value: exp.greaterThan.right.value
            })
        } else if (exp.lessThan) {
            result.push({
                property: exp.lessThan.left.property,
                operator: '<',
                value: exp.lessThan.right.value
            })
        } else if (exp.isNull) {
            result.push({
                property: exp.isNull.property,
                operator: 'is-null',
                value: ''
            })
        } else if (exp.not && exp.not.isNull) {
            result.push({
                property: exp.not.isNull.property,
                operator: 'is-not-null',
                value: ''
            })
        }
    })

    return result
}
