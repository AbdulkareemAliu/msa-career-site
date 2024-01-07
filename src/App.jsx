import Root from './components/Main'
import JobPostings from './components/JobPostings'
import ReferralPage from './components/ReferralPage'
import NavBar from './components/NavBar'
import ErrorPage from "./ErrorPage";

import {Route, Routes} from 'react-router-dom'

import './styles.css'


export default function App() {
    return (
    <>
        <NavBar />
            <Routes>
                <Route path="/" element={<Root />} errorElement={<ErrorPage />}/>
                <Route path="/job-board" element={<JobPostings />} errorElement={<ErrorPage />}/>
                <Route path="/referral-page" element={<ReferralPage />} errorElement={<ErrorPage />}/>
            </Routes>
    </>
    )
}
