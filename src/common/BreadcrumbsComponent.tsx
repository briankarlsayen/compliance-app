import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Breadcrumbs, Typography, Link } from '@material-ui/core'

const getLast = (urlArr: string[]) => {
    let last
    for (let i = urlArr.length - 1; i > 0; i = i - 1) {
        const isNumber = Number(urlArr[i]) > -1
        if (!isNumber) {
            last = urlArr[i]
            break
        }
    }
    return last
}

function BreadcrumbsComponent() {
    const location = useLocation()
    const url = location.pathname
    const urlArr = url.split('/').filter((e) => !!e)
    return (
        <Breadcrumbs
            aria-label='breadcrumb'
            style={{
                textTransform: 'capitalize',
                paddingTop: '1rem',
                paddingBottom: '1rem'
            }}
        >
            {urlArr.length > 1 &&
                urlArr.map((name, index) => {
                    const routeTo = `/${urlArr.slice(0, index + 1).join('/')}`
                    const isLast = getLast(urlArr) === name
                    const isNumber = Number(name) > -1

                    return !isNumber ? (
                        isLast ? (
                            <Typography key={name} color='textPrimary'>
                                {name}
                            </Typography>
                        ) : (
                            <Link
                                key={name}
                                component={RouterLink}
                                to={routeTo}
                                style={{ color: 'black' }}
                            >
                                {name}
                            </Link>
                        )
                    ) : undefined
                })}
        </Breadcrumbs>
    )
}

export default BreadcrumbsComponent
