import React, { useState, useEffect } from "react"
import WorkoutDataViewSelector from "./WorkoutDataViewSelector"
import Calendar from 'react-calendar'
import "../../assets/scss/calendar.scss"
import { Chart } from 'react-google-charts'

const Dashboard = (props) => {

    const [selectedView, setSelectedView] = useState("")
    const [selectedWeek, setSelectedWeek] = useState(new Date())
    const [selectedMonth, setSelectedMonth] = useState("")
    const [pieChartData, setPieChartData] = useState([])
    const [caloriesLineChartData, setCaloriesLineChartData] = useState([])
    const [distanceLineChartData, setDistanceLineChartData] = useState([])
    const [durationLineChartData, setDurationLineChartData] = useState([])

    const getWorkoutData = async (viewType) => {
        try {
          const response = await fetch(`/api/v1/workouts/chart/${viewType}`);
          if (!response.ok) {
            const errorMessage = `${response.status} (${response.statusText})`;
            const error = new Error(errorMessage);
            throw error;
          }
          const body = await response.json();
          setPieChartData(body.pieChartData)
          setCaloriesLineChartData(body.caloriesLineChartData)
          setDistanceLineChartData(body.distanceLineChartData)
          setDurationLineChartData(body.durationLineChartData)
        } catch (error) {
          console.error(`Error in fetch: ${error.message}`);
        }
      };

    useEffect(() => {
        if (selectedView === "all-time") {
            getWorkoutData(selectedView)
      } else if (selectedView === "yearly") {
          const currentDate = new Date()
          const currentYear = currentDate.getFullYear()
          getWorkoutData(selectedView.concat(`/${currentYear}`))
      } else if (selectedView === "monthly" && selectedMonth.length !== 0) {
        getWorkoutData(selectedView.concat(`/${selectedMonth}`))
      } else if (selectedView === "weekly" && selectedWeek.length !== 0) {
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            const formattedDate = selectedWeek.toLocaleDateString('en-US', options).split('/').join('-');
            getWorkoutData(selectedView.concat(`/${formattedDate}`))
        }
    }, [selectedView, selectedWeek, selectedMonth])

    return (
        <div className="dashboard">
            <h1>Progress Dashboard</h1>
            <Calendar className="react-calendar" />
            <WorkoutDataViewSelector 
            selectedView={selectedView}
            setSelectedView={setSelectedView}
            selectedWeek={selectedWeek}
            setSelectedWeek={setSelectedWeek}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
             />
            <div className="chart-container category-piechart">
                {pieChartData.length > 1 ? (
                    <Chart 
                    className="chart"
                    chartType="PieChart"
                    data={pieChartData}
                    options={{
                        title: "Type of Exercise",
                        pieHole: 0.4
                    }}
                    graph_id="PieChart"
                    loader={<div>Loading Chart</div>}
                    width="100%"
                    height="400px"
                />
                ):(
                    <div>No exercise category data available.</div>
                )}
            </div>

            <div className="chart-container calories-linechart">
                {caloriesLineChartData.length > 1 ? (
                    <Chart
                    className="chart"
                    chartType="LineChart"
                    data={caloriesLineChartData}
                    options={{
                        title: 'CALORIES (KCAL)',
                        hAxis: {
                            title: 'Date'
                        },
                        vAxis: {
                            title: 'Calories',
                        },
                    }}
                    graph_id="CaloriesLineChart"
                    loader={<div>Loading Chart</div>}
                    width="100%"
                    height="400px"
                />
                ) : (
                    <div>No calories data available.</div>
                )}
            </div>

            <div className="chart-container distance-linechart">
                {distanceLineChartData.length > 1 ? (
                    <Chart
                    className="chart"
                    chartType="LineChart"
                    data={distanceLineChartData}
                    options={{
                        title: 'DISTANCE (MILES)',
                        hAxis: {
                            title: 'Date'
                        },
                        vAxis: {
                            title: 'miles',
                        },
                    }}
                    graph_id="DistanceLineChart"
                    loader={<div>Loading Chart</div>}
                    width="100%"
                    height="400px"
                />
                ) : (
                    <div>No distance data available.</div>
                )}
            </div>

            <div className="chart-container duration-linechart">
                {durationLineChartData.length > 1 ? (
                    <Chart
                    className="chart"
                    chartType="LineChart"
                    data={durationLineChartData}
                    options={{
                        title: 'DURATION (MINS)',
                        hAxis: {
                            title: 'Date'
                        },
                        vAxis: {
                            title: 'minutes',
                        },
                    }}
                    graph_id="DurationLineChart"
                    loader={<div>Loading Chart</div>}
                    width="100%"
                    height="400px"
                />
                ) : (
                    <div>No duration data available.</div>
                )}
            </div>
        </div>
    )
}

export default Dashboard