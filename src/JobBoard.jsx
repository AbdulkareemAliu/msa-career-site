import alchemist_final from './images/alchemist_final.png';
import React, {useState} from 'react';
import {referral_web_app_url, job_web_app_url} from './config.js'
import { Link, useLoaderData, useParams, useNavigation } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import './JobBoard.css';

function getRequirementsList(reqs) {
    return (<ul>
        {reqs.map((req) => <li> {req} </li>)}
    </ul>)
  }

function goHome(setSearchInput){
    const postings = document.querySelectorAll('.job-posting');
    const searchInput = document.getElementById("searchBar");
    setSearchInput("");
    postings.forEach(posting => {
        posting.style.display = 'block';
        posting.setAttribute("searchHit", "yes");
});

}

export async function getData(){
    try {

      const response = await fetch(job_web_app_url, {
        redirect: 'follow',
        method: "GET"
      });
      const data = await response.json();
      
      // console.log('Data from the web app:', data.data); 
      return data.data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

const Heading = () => {
    return (

        <div className="backdrop" id="backdrop" >
        <div className="logo_container" id="logo_container" >
        <Link to="/">
        <img src={alchemist_final} alt="Logo" className="logo" id="logo" height="150"/>
        </Link>
        </div>
        <div className="search_header" id="search_header">
        <h1 id="big_title" className="animated-element"> MIT MSA Job Board </h1>
        <input type="text" placeholder="Search" className="animated-element" id="searchBar"/>
        </div>
        </div>
    )
}

const FilterGroups = () => {
    return (
        <>
        <div className="filter-group">
            <h2 className="filterName">Job Type</h2>
            <label>
                <input type="checkbox" className="filterBox" name="jobType" value="Internship"/> Internship
            </label>
            <label>
                <input type="checkbox" className="filterBox" name="jobType" value="Full-Time"/> Full Time
            </label>
            <label>
                <input type="checkbox" className="filterBox" name="jobType" value="Part-Time"/> Part Time
            </label>
        </div>

        <div className="filter-group">
            <h2 className="filterName">Remote</h2>
            <label>
                <input type="checkbox" className="filterBox" name="remote" value="Remote"/> Remote
            </label>
        </div>
        </>

    )
}

const JobPosting = (row) => {
    var [timestamp, title, company, description, reqs, loc, type, contact, start, end] = row.row;

    timestamp = new Date(timestamp).toDateString();
    var dateDetails;
    if (end == "") {
      dateDetails = "Starts on " + new Date(start).toDateString();
    } else {
      dateDetails = "Starts on " + new Date(start).toDateString() + " and ends on " + new Date(end).toDateString();
    }

    return (<div className="job-posting" 
    title={title}
    type={type} 
    company={company}
    location={loc}
    description={description}
    requirements={reqs}
    searchHit="yes">
    <div className="job-title-type">
    <div className="job-title">{title}</div>
    <div className="job-type">{type}</div>
    </div>
    <div className="company-name">{company}</div>
    <div className="job-location">{loc}</div>
    <div className="job-description">{description}</div>
    <div className="job-reqs">Requirements:  {getRequirementsList(reqs.split(". "))}</div>
    <div className="contact">Please reach out to <a href={"mailto:" + contact}> {contact} </a> for more details</div>
    <div className="date-details">Posted on {timestamp}</div>
    <div className="date-details">{dateDetails}</div>
    </div>)
}

export default function JobBoard() {
    const [searchInput, setSearchInput] = useState("");

    // const handleChange = (e) => {
    //     e.preventDefault();
    //     setSearchInput(e.target.value);
    // }

    // if (searchInput === "") {
    //     goHome(setSearchInput);
    // } 

    const allPostings = useLoaderData();

    return (<body>
        <Heading />
        <div className="bodyElements">
        <div className='filterGroups'>
        <FilterGroups />
        </div>
        {
            <div className='jobPostings'>
            {allPostings.slice(1).map((posting) => <JobPosting row={posting}/>)}
            </div>
        }
        </div>
    </body>)
}