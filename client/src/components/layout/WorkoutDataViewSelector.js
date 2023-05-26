import React from 'react'

const WorkoutDataViewSelector = ({ selectedView, setSelectedView, selectedWeek, setSelectedWeek, selectedMonth, setSelectedMonth }) => {

    const handleViewChange = (event) => {
        setSelectedView(event.currentTarget.value)
    }

    const handlePreviousWeek = () => {
        const previousWeek = new Date(selectedWeek)
        previousWeek.setDate(previousWeek.getDate() - 7)
        setSelectedWeek(previousWeek)
    }

    const handleNextWeek = () => {
        const nextWeek = new Date(selectedWeek);
        nextWeek.setDate(nextWeek.getDate() + 7);
        setSelectedWeek(nextWeek);
    }

    const getWeekDateRange = (endDate) => {
        const endDateFormat = endDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
        const startDate = new Date(endDate.getTime())
        startDate.setDate(endDate.getDate() - 6)
        const startDateFormat = startDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
        return `${startDateFormat} - ${endDateFormat}`;
    }

    const handleMonthChange = (event) => {
        setSelectedMonth(event.currentTarget.value)
    }

    const currentYear = new Date().getFullYear()

    return (
        <div>
            <div>
                <select value={selectedView} onChange={handleViewChange}>
                    <option value="">-- Select View --</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                    <option value="all-time">All Time</option>
                </select>
            </div>

            {selectedView === "yearly" && (
                <h4>{currentYear}:</h4>
            )}

            {selectedView === "monthly" && (<div>
                <label>Select Month:</label>
                <select value={selectedMonth} onChange={handleMonthChange}>
                    <option value="">-- Select Month --</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
            </div>
            )}

            {selectedView === "weekly" && (
                <div>
                    <div>
                        <button className="button" onClick={handlePreviousWeek}>Previous Week</button>
                        <button className="button" onClick={handleNextWeek}>Next Week</button>
                    </div>
                    <div>
                        <p>{getWeekDateRange(selectedWeek)}</p>
                    </div>
              </div>
            )}
        </div>
    )
}

export default WorkoutDataViewSelector