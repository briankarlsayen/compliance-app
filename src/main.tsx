import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import EditScheduleForm from './pages/EditScheduleForm'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/schedule-form',
        element: <EditScheduleForm />,
    },
])

ReactDOM.render(
    <React.StrictMode>
        <RouterProvider router={router} />
        {/* <App /> */}
    </React.StrictMode>,
    document.getElementById('root')
)
