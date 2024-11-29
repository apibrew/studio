import {Box, IconButton, MenuItem, TextField, Typography} from "@mui/material";
import {useMemo, useState} from "react";
import {Add, Clear} from "@mui/icons-material";
import Button from "@mui/material/Button";
import {PairExpression, Resource} from "@apibrew/react";
import {defaultNativeValue, isComparableProperty, isFilterableProperty} from "../../../../util/property";
import {PropertyValueEdit} from "../../property-value-edit/PropertyValueEdit.tsx";
import {Property} from "@apibrew/client/model";
import toast from "react-hot-toast";
import {BooleanExpression} from "@apibrew/client/model/extension";

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

    const properties = useMemo(() => filterableProperties(props.resource.properties), [props.resource])

    return <Box p={1} width='800px'>
        {filters.length === 0 && <Typography fontSize={14}>
            No filters applied to this view
            <br/>
            Add a column below to filter the view
        </Typography>}

        {filters.map((filter, index) => {
            const property = props.resource.properties[filter.property]
            const operators: { value: string, label: string }[] = [
                {value: '=', label: '='},
                {value: '!=', label: '!='},
            ]

            if (property && isComparableProperty(property)) {
                operators.push({value: '>=', label: '>='})
                operators.push({value: '<=', label: '<='})
                operators.push({value: '>', label: '>'})
                operators.push({value: '<', label: '<'})
            }
            if (property && property.type === 'STRING') {
                operators.push({value: 'like', label: 'like'})
                operators.push({value: 'ilike', label: 'case insensitive like'})
                operators.push({value: 'not-like', label: 'not like'})
                operators.push({value: 'not-ilike', label: 'not case insensitive like'})
            }

            operators.push({value: 'is-null', label: 'is null'})
            operators.push({value: 'is-not-null', label: 'is not null'})

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
                            filter.value = defaultNativeValue(props.resource.properties[filter.property].type)
                            setFilters([...filters])
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
                        }}
                        size='small'>
                        {operators.map(item => <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>)}
                    </TextField>
                </Box>
                <Box flex={4}>
                    {property && <PropertyValueEdit
                        resource={props.resource}
                        property={property}
                        propertyName={''}
                        value={filter.value}
                        onChange={value => {
                            filter.value = value
                            setFilters([...filters])
                        }}/>}
                </Box>
                <Box marginLeft={1}>
                    <IconButton size='small' onClick={() => {
                        filters.splice(index, 1)
                        setFilters([...filters])
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
                }}>
                <Add/>
                <span style={{marginLeft: '3px'}}>Add Filter</span>
            </Button>
            {/*<Button*/}
            {/*    color='primary'*/}
            {/*    variant='text'*/}
            {/*    size='small'*/}
            {/*    onClick={() => {*/}
            {/*        // setFilters([...filters, {*/}
            {/*        //     property: '',*/}
            {/*        //     operator: '=',*/}
            {/*        //     value: ''*/}
            {/*        // } as any])*/}
            {/*        // setChanged(true)*/}
            {/*        alert('Not implemented')*/}
            {/*    }}>*/}
            {/*    <Add/>*/}
            {/*    <span style={{marginLeft: '3px'}}>Add Group</span>*/}
            {/*</Button>*/}
            <Box flexGrow={1}/>

            <Button color='secondary'
                    variant='text'
                    onClick={() => {
                        props.onApply(undefined)
                    }}>
                <span style={{marginLeft: '3px'}}>Reset</span>
            </Button>

            <Button color='primary'
                    onClick={() => {
                        if (!validate(filters)) {
                            return;
                        }
                        props.onApply(prepareBooleanExpressionFromFilters(filters))
                    }}>
                <span style={{marginLeft: '3px'}}>Filter</span>
            </Button>
        </Box>
    </Box>
}

function validate(filters: Filter[]): boolean {
    for (const filter of filters) {
        if (filter.property === '') {
            toast.error('Property is required')
            return false
        }
    }

    return true;
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
            case 'like':
                exp = {
                    like: pairExp
                } as unknown as BooleanExpression
                break;
            case 'ilike':
                exp = {
                    ilike: pairExp
                } as unknown as BooleanExpression
                break;
            case 'not-like':
                exp = {
                    not: {
                        like: pairExp
                    }
                } as unknown as BooleanExpression
                break;
            case 'not-ilike':
                exp = {
                    not: {
                        ilike: pairExp
                    }
                } as unknown as BooleanExpression
                break;
            default:
                throw new Error('Unknown operator: ' + filter.operator)
        }

        list.push(exp)
    })

    if (list.length === 0) {
        return undefined
    }

    return {
        and: list
    } as BooleanExpression
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
        } else if ((exp as any).like) {
            result.push({
                property: (exp as any).like.left.property,
                operator: 'like',
                value: (exp as any).like.right.value
            })
        } else if ((exp as any).ilike) {
            result.push({
                property: (exp as any).ilike.left.property,
                operator: 'ilike',
                value: (exp as any).ilike.right.value
            })
        }
    })

    return result
}

function filterableProperties(properties: { [p: string]: Property }): string[] {
    const result: string[] = [];

    for (const key in properties) {
        if (properties.hasOwnProperty(key) && isFilterableProperty(properties[key])) {
            result.push(key)
        }
    }

    return result
}
