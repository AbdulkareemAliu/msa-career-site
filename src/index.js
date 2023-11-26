import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from "./routes/root";
import JobBoard, {getData} from './JobBoard';
import ReferralList, {getCompanyMap as rootLoader, ExpandedCompanyPage} from './ReferralList';
import reportWebVitals from './reportWebVitals';
import ErrorPage from "./error-page";
import './index.css';

const router = createBrowserRouter([
  {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />
  },
  {
    path: "referral-page",
    element: <ReferralList />,
    errorElement: <ErrorPage />,
    loader: rootLoader
  },
  {
    path: "referral-page/:company",
    element: <ExpandedCompanyPage />,
    errorElement: <ErrorPage />,
    loader: rootLoader
  },
  {
    path: "job-board",
    element: <JobBoard />,
    errorElement: <ErrorPage />,
    loader: getData
  },
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
