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

interface IList {
    id: number
    name: string
}

export interface PMultiSelectField {
    selectedList: IList[] | any[]
    list: IList[] | any[]
    setInputField: any
    inputField: any
    name: string
    disable?: boolean
}

const MultiSelectField = ({
    name,
    selectedList,
    list,
    setInputField,
    inputField,
    disable,
}: PMultiSelectField) => {
    const [leftSide, setLeftSide] = useState(list)
    const [rightSide, setRightSide] = useState(selectedList)
    const [selected, setSelected] = useState([])
    const [leftFilter, setLeftFilter] = useState('')
    const [rightFilter, setRightFilter] = useState('')
    const [filteredLeft, setFilteredLeft] = useState(list)
    const [filteredRight, setFilteredRight] = useState(selectedList)
    const [allList, setAllList] = useState([...list])

    useEffect(() => {
        setInputField({ ...inputField, [name]: rightSide })
    }, [rightSide, rightFilter])

    useEffect(() => {
        setRightSide(selectedList)
        setFilteredRight(selectedList)
        setAllList([...list, ...selectedList])
    }, [selectedList])

    useEffect(() => {
        setLeftSide(list)
        setFilteredLeft(list)
        setAllList([...list, ...selectedList])
    }, [list])

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
        if (!selected.length) return
        const selectedItems = selected.length
            ? selected.map((el) =>
                  allList.find((list) => list.id.toString() === el)
              )
            : []
        console.log('selected', selected)
        switch (position) {
            case 'left':
                const newLeftSide: any = []
                leftSide.map((el: any) => {
                    const idx = selected.findIndex(
                        (val) => el.id.toString() === val
                    )
                    if (idx === -1) newLeftSide.push(el)
                })
                // console.log('newLeftSide', newLeftSide)
                // const selectedItems = allList.length && allList.filter(el => el.id.toString() === selected)

                // console.log('selectedItems', selectedItems)

                rightArr = [...selectedItems, ...rightSide]
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
                // console.log('selected', selected)
                rightSide.map((el: IList) => {
                    const idx = selected.findIndex(
                        (val) => el.id.toString() === val
                    )
                    if (idx === -1) newRightSide.push(el)
                })
                console.log('newRightSide', newRightSide)
                setLeftFilter('')
                rightArr = [...newRightSide]
                leftArr = [...selectedItems, ...leftSide]
                setLeftSide(leftArr)
                setFilteredLeft(leftArr)

                setFilteredRight(rightArr)
                setRightSide(rightArr)
                setSelected([])
                break
        }
    }
    console.log('rightSide', rightSide)
    console.log('leftSide', leftSide)

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
                    x.name.toLocaleLowerCase().includes(filterVal)
                )
                setFilteredLeft(filteredLeft)
                break
            case 'right-filter':
                setRightFilter(filterVal)
                const rightFilterArr = rightSide
                const filteredRight = rightFilterArr.filter((x) =>
                    x.name.toLocaleLowerCase().includes(filterVal)
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
                        disabled={disable}
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
                                disabled={disable}
                                inputProps={{
                                    id: 'select-multiple-native',
                                }}
                                variant="outlined"
                            >
                                {filteredLeft.map((el) => (
                                    <option key={el.id} value={el.id}>
                                        {el.name}
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
                                disabled={disable}
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
                                disabled={disable}
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
                                disabled={disable}
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
                                disabled={disable}
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
                        disabled={disable}
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
                                disabled={disable}
                                inputProps={{
                                    id: 'select-multiple-native',
                                }}
                                variant="outlined"
                            >
                                {filteredRight.map((el) => (
                                    <option key={el.id} value={el.id}>
                                        {el.name}
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
