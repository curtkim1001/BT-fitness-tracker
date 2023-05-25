import { format } from "morgan";
import { Workout, User, Set, Exercise } from "../models/index.js"

class LineChart {
    static extractCaloriesData = (workouts) => {

        const formatDate = (date) => {
            const options = { month: 'short', day: 'numeric', year: 'numeric' };
            return new Intl.DateTimeFormat('en-US', options).format(date);
        }

        const caloriesByDate = {}
        workouts.forEach((workout)=> {
            const date = new Date(workout.workoutDate)
            const formattedDate = formatDate(date)
            if (!caloriesByDate[formattedDate]) {
                caloriesByDate[formattedDate] = 0
            }
            workout.sets.forEach((set)=> {
                if (set.calories) {
                    caloriesByDate[formattedDate] += set.calories
                }
            })
        })
        const caloriesLineChartData = [['Date', 'Calories']]
        Object.entries(caloriesByDate).forEach(([date, calories])=> {
            caloriesLineChartData.push([date, calories])
        })
        return caloriesLineChartData
    }

    static extractDistanceData = (workouts) => {

        const formatDate = (date) => {
            const options = { month: 'short', day: 'numeric', year: 'numeric' };
            return new Intl.DateTimeFormat('en-US', options).format(date);
        }

        const distanceByDate = {}
        workouts.forEach((workout)=> {
            const date = new Date(workout.workoutDate)
            const formattedDate = formatDate(date)
            if (!distanceByDate[formattedDate]) {
                distanceByDate[formattedDate] = 0
            }
            workout.sets.forEach((set)=> {
                if (set.miles) {
                    distanceByDate[formattedDate] += set.miles
                }
            })
        })
        const distanceLineChartData = [['Date', 'Miles']]
        Object.entries(distanceByDate).forEach(([date, miles])=> {
            distanceLineChartData.push([date, miles])
        })
        return distanceLineChartData
    }

    static extractDurationData = (workouts) => {

        const formatDate = (date) => {
            const options = { month: 'short', day: 'numeric', year: 'numeric' };
            return new Intl.DateTimeFormat('en-US', options).format(date);
        }

        const durationByDate = {}
        workouts.forEach((workout)=> {
            const date = new Date(workout.workoutDate)
            const formattedDate = formatDate(date)
            if (!durationByDate[formattedDate]) {
                durationByDate[formattedDate] = 0
            }
            if (workout.duration) {
                durationByDate[formattedDate] += workout.duration
            }
        })
        const durationLineChartData = [['Date', 'Duration']]
        Object.entries(durationByDate).forEach(([date, duration])=> {
            durationLineChartData.push([date, duration])
        })
        return durationLineChartData
    }

}

export default LineChart