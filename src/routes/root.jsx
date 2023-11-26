import alchemist_final from '../images/alchemist_final.png';
import job_board_icon from '../images/board2.png';
import referral_page_icon from '../images/page2.png';
import { Link, useNavigation } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import '../main.css';


export default function Root() {
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

        return (
            <>
            <div className="home-page">
            <div className="main-title">
            <img src={alchemist_final} alt="Logo" className="home_logo" height="200" />
            <h1>MIT MSA Career Site</h1>
            </div>
            <div className="navigation">
                <div className="nav-board-icon">
                <Link to={'/job-board/'}>
                <img src={job_board_icon} alt="Logo" className="nav_logo" id="logo" height="175" />
                </Link>
                <h2>Job Board</h2>
                </div>
                <div className="nav-page-icon">
                <Link to={'/referral-page/'}>
                <img src={referral_page_icon} alt="Logo" className="nav_logo" id="logo" height="175" />
                </Link>
                <h2>Referral Page</h2>
                </div>
            </div>
            </div>
            </>
        )
    }
}