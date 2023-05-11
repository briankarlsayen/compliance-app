import {
    Button,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    Select,
    TextField,
} from '@material-ui/core'
import {
    ArrowLeft,
    ArrowRight,
    KeyboardArrowLeft,
    KeyboardArrowRight,
    Search,
} from '@material-ui/icons'
import React, { useEffect, useState } from 'react'

interface PMove {
    position: string
}

export interface PMultiSelectField {
    selectedList: string[]
    list: string[]
    setInputField: any
    inputField: any
    name: string
}

const MultiSelectField = ({
    name,
    selectedList,
    list,
    setInputField,
    inputField,
}: PMultiSelectField) => {
    const [leftSide, setLeftSide] = useState(list)
    const [rightSide, setRightSide] = useState(selectedList)
    const [selected, setSelected] = useState([])
    const [leftFilter, setLeftFilter] = useState('')
    const [rightFilter, setRightFilter] = useState('')
    const [filteredLeft, setFilteredLeft] = useState(list)
    const [filteredRight, setFilteredRight] = useState(selectedList)

    useEffect(() => {
        setInputField({ ...inputField, [name]: rightSide })
    }, [rightSide, rightFilter])

    const handleChangeMultiple = (event: any) => {
        const { options } = event.target
        const value = [] as any
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value)
            }
        }
        setSelected(value)
    }

    const handleMove = ({ position }: PMove) => {
        let rightArr = []
        let leftArr = []
        switch (position) {
            case 'left':
                const newLeftSide: any = []
                leftSide.map((el: string) => {
                    const idx = selected.findIndex((val) => el === val)
                    if (idx === -1) newLeftSide.push(el)
                })
                rightArr = [...selected, ...rightSide]
                leftArr = [...newLeftSide]

                setRightFilter('')
                setRightSide(rightArr)
                setFilteredRight(rightArr)

                setFilteredLeft(leftArr)
                setLeftSide(leftArr)
                setSelected([])
                break
            case 'right':
                const newRightSide: any = []
                rightSide.map((el: string) => {
                    const idx = selected.findIndex((val) => el === val)
                    if (idx === -1) newRightSide.push(el)
                })
                setLeftFilter('')
                rightArr = [...newRightSide]
                leftArr = [...selected, ...leftSide]
                setLeftSide(leftArr)
                setFilteredLeft(leftArr)

                setFilteredRight(rightArr)
                setRightSide(rightArr)
                setSelected([])
                break
        }
    }

    const handleMoveAll = ({ position }: PMove) => {
        let rightArr = []
        let leftArr = []
        switch (position) {
            case 'right':
                rightArr = [...leftSide, ...rightSide]
                setRightSide(rightArr)
                setFilteredRight(rightArr)
                setLeftSide([])
                setFilteredLeft([])

                break
            case 'left':
                leftArr = [...rightSide, ...leftSide]
                setRightSide([])
                setFilteredRight([])
                setLeftSide(leftArr)
                setFilteredLeft(leftArr)
                break
        }
    }

    const handleFilter = (e: any) => {
        const filterVal = e.target.value.toLowerCase()
        const name = e.target.name
        switch (name) {
            case 'left-filter':
                setLeftFilter(filterVal)
                const leftFilterArr = leftSide
                const filteredLeft = leftFilterArr.filter((x) =>
                    x.toLocaleLowerCase().includes(filterVal)
                )
                setFilteredLeft(filteredLeft)
                break
            case 'right-filter':
                setRightFilter(filterVal)
                const rightFilterArr = rightSide
                const filteredRight = rightFilterArr.filter((x) =>
                    x.toLocaleLowerCase().includes(filterVal)
                )
                setFilteredRight(filteredRight)
                break
        }
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={12} sm={5}>
                    <TextField
                        required
                        id="left-filter"
                        name="left-filter"
                        label="Select list"
                        fullWidth
                        size="small"
                        autoComplete="off"
                        variant="outlined"
                        value={leftFilter}
                        onChange={handleFilter}
                        style={{
                            marginBottom: '1rem',
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton>
                                        <Search />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <div>
                        <FormControl
                            style={{
                                width: '100%',
                            }}
                        >
                            <InputLabel shrink htmlFor="select-multiple-native">
                                Native
                            </InputLabel>
                            <Select
                                multiple
                                native
                                name="left-select"
                                value={selected}
                                onChange={handleChangeMultiple}
                                inputProps={{
                                    id: 'select-multiple-native',
                                }}
                                variant="outlined"
                            >
                                {filteredLeft.map((name, index) => (
                                    <option key={index} value={name}>
                                        {name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={2}
                    style={{
                        paddingRight: '1rem',
                        paddingLeft: '1rem',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '.5rem',
                                width: 'fit-content',
                            }}
                        >
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                style={{
                                    width: '100%',
                                }}
                                onClick={() => handleMove({ position: 'left' })}
                            >
                                <KeyboardArrowRight />
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                style={{
                                    width: '100%',
                                }}
                                onClick={() =>
                                    handleMove({ position: 'right' })
                                }
                            >
                                <KeyboardArrowLeft />
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                style={{
                                    width: '100%',
                                }}
                                onClick={() =>
                                    handleMoveAll({ position: 'right' })
                                }
                            >
                                <ArrowRight />
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                style={{
                                    width: '100%',
                                }}
                                onClick={() =>
                                    handleMoveAll({ position: 'left' })
                                }
                            >
                                <ArrowLeft />
                            </Button>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={5}>
                    <TextField
                        required
                        id="right-filter"
                        name="right-filter"
                        label="Selected"
                        fullWidth
                        size="small"
                        autoComplete="off"
                        variant="outlined"
                        value={rightFilter}
                        onChange={handleFilter}
                        style={{
                            marginBottom: '1rem',
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton>
                                        <Search />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <div>
                        <FormControl
                            style={{
                                width: '100%',
                            }}
                        >
                            <InputLabel shrink htmlFor="select-multiple-native">
                                Native
                            </InputLabel>
                            <Select
                                multiple
                                native
                                value={selected}
                                onChange={handleChangeMultiple}
                                name="right-select"
                                inputProps={{
                                    id: 'select-multiple-native',
                                }}
                                variant="outlined"
                            >
                                {filteredRight.map((name, index) => (
                                    <option key={index} value={name}>
                                        {name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default MultiSelectField
