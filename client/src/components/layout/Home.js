import React from "react"
import friends from "../../../public/images/friends.jpg"
// import { FontAwesomeIcon } from "@fontawesome/react-fontawesome"

const Home = (props) => {
    return (
        <div className="homepage">
            <h1>Welcome to FitTrackr</h1>
            <div className="callout home-welcome-box rounded-corner">
                <p>
                Take control of your fitness journey with our powerful tracking tools. Log your workouts, monitor your progress, and achieve your goals. From cardio to strength training, we've got everything you need to stay motivated and stay on track.
                Track your activities, set personal records, and watch your performance improve. Connect with a community of fitness enthusiasts, share your achievements, and get inspired by others on the same journey.
                Start today and make every workout count. Your Fitness Tracker is here to support you every step of the way.
                Get ready to level up your fitness game!
                </p>
            </div>
            <img className="home-image" src={friends} alt="image of four friends on a hill" />
            <div className="home-page-footer-text">
                <p>Application Developed By: Curt Kim</p>
            </div>
        </div>
    )
}

export default Home