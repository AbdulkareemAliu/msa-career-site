import alchemist_final from './images/alchemist_final.png';
import React, {useState} from 'react';
import {referral_web_app_url} from './config.js'
import { Link, useLoaderData, useParams, useNavigation } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import './ReferralList.css';

export async function getCompanyMap(){
  try {
    const response = await fetch(referral_web_app_url, {
      redirect: 'follow',
      method: "GET"
    });
    const data = await response.json();
    var entries = data.data.slice(1);
    var companyMap = new Map();

    entries.forEach(([time, name, email, company, role]) => {
      var entry = {name: name, email: email, role: role}
      if (companyMap.has(company)) {
        companyMap.get(company).push(entry);
      } else {
        companyMap.set(company, [entry]);
      }
    });

    return companyMap;
    // console.log('Data from the web app:', data.data); 
    // return data.data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
const ContactTable = ({ data }) => {
  return (
      <table className="contact-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {data.map((person, index) => (
            <tr key={index}>
              <td>{person.name}</td>
              <td><a href={"mailto:" + person.email}>{person.email}</a></td>
              <td>{person.role}</td>
            </tr>
          ))}
        </tbody>
      </table>)
}

export function ExpandedCompanyPage() {
  const referralEntries = useLoaderData();
  const { company } = useParams();
  const selectedCompany = referralEntries.get(company);

  if (!selectedCompany) {
    return <div>Company not found</div>;
  }

  return (<>
      <div className='logo-container'>
        <Link to="/">
        <img src={alchemist_final} alt="Logo" className="logo" id="logo" height="150" />
        </Link>
      </div>
      <div className="title-table">
      <h1>{company}</h1>
      <ContactTable data={selectedCompany} />
      </div>
    </>);
}

function ReferralList() {
  const referralEntries = useLoaderData();

  const navigation = useNavigation();


  if (navigation.state === "loading") {
    const override = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    }

    return <ClipLoader color="#8B0000" size="60" cssOverride={override}/>

  } else {

    return (<>

      <div className="logo-heading" id="logo-heading">
          <div className='logo-container'>
            <Link to="/">
            <img src={alchemist_final} alt="Logo" className="logo" id="logo" height="150" />
            </Link>
          </div>
          <div className='title-container'>
            <h1 id="big_title" className="big-title"> MIT MSA Referral Page </h1>
          </div>
      </div>
      <div className="filters-entries">
        {Array.from(referralEntries).map(([company, contacts]) => (
          <div className="referral-section" key={company}>
              <Link to={'/referral-page/'+company} style={{ textDecoration: 'none' }}>
              <h2 className="companyName">{company}</h2>
              </Link>
          </div>
        ))}
      </div>

  </>)
  }
}

export default ReferralList;
