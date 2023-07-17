import React from 'react'
import Typography from '@material-ui/core/Typography'
import onePlaceLogo from './img/1Place-logo.png'
import oneplaceChildCareLogo from './img/1Place-Childcare-logo-tagline.png'
import './ChecklistEnd.css'
import { Button } from '@material-ui/core'

type ChecklistEndProp = {
    checklistName: string
    surveyLink: string
}

const ChecklistEnd = (checklistEnd: ChecklistEndProp) => {
    return (
        <div style={{ textAlign: 'center' }}>
            <div id='onePlaceLogo'>
                <div className='txtLogo'>
                    <b>Powered by</b>
                </div>
                <div>
                    <img className='imgLogo' src={onePlaceLogo} alt='1Place' />
                </div>
                <div className='txtLogo'>
                    Visit our <a href='https://www.1placeonline.com'>website</a>
                </div>
                <div>
                    <img
                        className='imgLogo'
                        src={oneplaceChildCareLogo}
                        alt='1Place Childcare'
                    />
                </div>
                <div className='txtLogo'>
                    Visit our{' '}
                    <a href='https://www.1placechildcare.com'>website</a>
                </div>
            </div>
            <div className='endMessage'>
                <Typography variant='h3' style={{ marginBottom: '15px' }}>
                    Thanks for submitting the {checklistEnd.checklistName}!
                </Typography>
                <Button
                    variant='contained'
                    color='primary'
                    href={checklistEnd.surveyLink}
                >
                    Start Another Survey
                </Button>
            </div>
        </div>
    )
}
export { ChecklistEnd }
