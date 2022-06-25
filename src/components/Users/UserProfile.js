import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';

const UserProfile = () => {

    const [toggleState, setToggleState] = useState(1);
    const toggleTab = (index) => {setToggleState(index)};

    return (
        <div className="card slide">
            <div className="card-body" style={{paddingTop:"0"}}>
                <div className="bloc-tabs">
                    <button className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(1)}> Details </button>
                </div>

                <div className="content-tabs">

                    <div className={toggleState === 1 ? "content  active-content" : "content"}>

                        <div className="user-profile">

                            <div className="user-details">
                                <i class="uil uil-user-circle user_profile_image"></i>
                            </div>

                            <div className="user-name">
                                <span>Tamuka Mutinhima</span>
                            </div>

                            <div className="company-name-container">
                                <span>Theocash - Admin</span>
                            </div>

                            <div className="user-personal-details">
                                <p>Email: beemutsetsa@gmail.com</p>
                                <p>Employee Number: MFITHEOC0001</p>
                                
                                <p>Date of Birth: None</p>
                                
                                
                                <p>Gender: None</p>
                                
                                <p>Branch: Main Branch</p>
                                <p>Phone Number: None</p>
                                <p>Home Address: None</p>
                            </div>

                        </div>
                        <div className="btn-flex-space-btwn">
                            <NavLink className="btn btn-default" to="/staff"><i class="uil uil-arrow-left"></i>Back</NavLink>
                            <NavLink className="btn btn-success" to="/staff">Edit Tamuka</NavLink>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default UserProfile;