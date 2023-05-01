import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Link as MUILink,
    Container,
} from '@material-ui/core'
import { useEffect, useState } from 'react'
import { IIntegrationApp } from 'oneplace-components'
import {
    changeIntegrationStatus,
    getIntegrationApps,
} from '../../data_sources/api'
import { Link, useHistory } from 'react-router-dom'
import { capitalizeFirst } from '../../utils'
import Loading from '../common/Loading'
import { queryActions } from '../../constants'
import Alert, { IAlertProps } from '../common/Alert'

const tableHeaderStyle = {
    backgroundColor: '#00317d',
    color: 'white',
}

function IntegrationListing() {
    const [alert, setAlert] = useState({} as IAlertProps)
    const [integrations, setIntegrations] = useState<IIntegrationApp[]>()
    const [currentId, setCurrentId] = useState<number>()
    const [changeStatus, setChangeStatus] = useState<boolean>()
    const [loading, setLoading] = useState<boolean>(false)
    const history = useHistory()

    // check if saved/synced integration in previous page
    useEffect(() => {
        if (history.location.search) {
            const urlParams = new URLSearchParams(history.location.search)
            if (urlParams.get('action') === queryActions.SAVED) {
                history.replace({ search: '' })
                setAlert({
                    ...alert,
                    message: 'Integration saved successfully!',
                    error: null,
                })
            }
            if (urlParams.get('action') === queryActions.SYNCED) {
                history.replace({ search: '' })
                setAlert({
                    ...alert,
                    message: 'Synchronisation Started Successfully!',
                    error: null,
                })
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // fetch integration
    useEffect(() => {
        async function fetchIntegrations() {
            try {
                setLoading(true)
                const integrationsResponse = await getIntegrationApps()
                setIntegrations(integrationsResponse || [])
            } catch (e) {
                setIntegrations([])
                setAlert({ ...alert, error: e })
            }
            setLoading(false)
        }
        /*while loading, this method might be called again as we might update alert
    dependency if we receive params in url, adding a 'loading' check we avoid that*/
        if (!integrations && !loading) {
            fetchIntegrations()
        }
    }, [integrations, alert, loading])

    // change integration status
    useEffect(() => {
        async function changeSelectedIntegrationStatus() {
            try {
                if (currentId && currentId === -1) {
                    history.push('/integrations/-1')
                    return
                }
                setLoading(true)

                const integrationResponse = await changeIntegrationStatus(
                    currentId!
                )
                const arrayCopy: IIntegrationApp[] = integrations!.map(
                    (item) => {
                        if (item.integrationId === integrationResponse.id)
                            return {
                                ...item,
                                integrationStatus: integrationResponse.status,
                            }
                        return { ...item }
                    }
                )
                setIntegrations(arrayCopy)
                setAlert({
                    ...alert,
                    message: 'Integration updated successfully!',
                    error: null,
                })
            } catch (e) {
                setAlert({ ...alert, error: e })
            }
            setLoading(false)
        }
        if (changeStatus && currentId) {
            setChangeStatus(false)
            changeSelectedIntegrationStatus()
        }
    }, [currentId, changeStatus, integrations, history, alert])

    return (
        <>
            {!loading && (
                <Alert
                    {...{
                        ...alert,
                        useSnackbar: false,
                        onClose: () =>
                            setAlert({
                                ...alert,
                                message: '',
                                error: null,
                            }),
                    }}
                />
            )}
            {integrations && (
                <Container maxWidth={false}>
                    <TableContainer
                        component={Paper}
                        style={{ marginBottom: '50px' }}
                    >
                        <Table>
                            <TableHead style={tableHeaderStyle}>
                                <TableRow>
                                    <TableCell
                                        style={{
                                            color: 'white',
                                            fontWeight: 'bolder',
                                        }}
                                    >
                                        Name
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            color: 'white',
                                            fontWeight: 'bolder',
                                        }}
                                    >
                                        Type
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            color: 'white',
                                            fontWeight: 'bolder',
                                        }}
                                    >
                                        Status
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            color: 'white',
                                            fontWeight: 'bolder',
                                        }}
                                    >
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {integrations.map((app) => (
                                    <TableRow key={app.id}>
                                        <TableCell component="th" scope="row">
                                            <Link
                                                to={`/integrations/${
                                                    app.integrationId
                                                }${
                                                    app.integrationId === -1
                                                        ? '?app=' + app.appName
                                                        : ''
                                                }`}
                                            >
                                                {app.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell>{app.name}</TableCell>
                                        <TableCell>
                                            {capitalizeFirst(
                                                app.integrationStatus!
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <MUILink
                                                onClick={() => {
                                                    if (
                                                        app.integrationId &&
                                                        app.integrationId >= 0
                                                    ) {
                                                        setCurrentId(
                                                            app.integrationId!
                                                        )
                                                        setChangeStatus(true)
                                                    } else {
                                                        history.push(
                                                            `/integrations/-1?app=${app.appName}`
                                                        )
                                                    }
                                                }}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                {app.integrationStatus ===
                                                'active'
                                                    ? 'Deactivate'
                                                    : 'Activate'}
                                            </MUILink>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            )}

            <Loading loading={loading} />
        </>
    )
}

export default IntegrationListing
