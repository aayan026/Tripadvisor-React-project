import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './components/store/store.js'
import { BrowserRouter, createBrowserRouter, Router, RouterProvider } from 'react-router-dom'
import MainPage from './components/pages/MainPage.jsx'
import SearchLayout from './components/pages/SearchLayout.jsx'
import DetailPage from './components/pages/DetailPage.jsx'
import SignIn from './components/auth/SignIn.jsx'
import SignUp from './components/auth/SignUp.jsx'
import ReviewPage from './components/pages/ReviewPage.jsx'
import Header from './components/Layout/Header.jsx'
import ProfilePage from './components/pages/ProfilePage.jsx'
import FilterPage from './components/pages/FilterPage.jsx'
import EditPlace from './components/pages/admin/EditPlace.jsx'
import AdminPlaceDetails from './components/pages/admin/AdminPlaceDetails.jsx'
import AdminPage from './components/pages/admin/AdminPage.jsx'

const router = createBrowserRouter([
    {
        element: <App />,
        path: '/',
        children: [
            {
                element: <MainPage />,
                path: '/',
                children: [
                    {
                        element: <SearchLayout />,
                        path: '/',
                    }
                ]
            },
            {
                element: <DetailPage />,
                path: '/detail/:id'
            },
            {
                element:<FilterPage/>,
                path:"/filter",
                children:[{
                    element:<Header/>,
                    path:"/filter"
                }]
            },
            {
                element:<SignIn/>,
                path:"/signin"
            },
            {
                element:<SignUp/>,
                path:"/signup"
            },
            {
                element:<ReviewPage/>,
                path:"/reviewpage",
                children:[
                {
                    element:<Header/>,
                    path:"/reviewpage"
                }]
            },
            {
                element:<ProfilePage/>,
                path:"/profile"
            }
            ,
            {
                element: <AdminPage />,
                path: "/admin",
            },
            {
                element: <AdminPlaceDetails />,
                path: "/admin/details/:id"
            },

        ]
    }
])
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);
