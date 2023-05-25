class PieChart {
    static extractData = (workouts) => {
        const subcategoryCounts = {}
        workouts.forEach((workout)=> {
            const { subcategory } = workout
            if (subcategoryCounts[subcategory]) {
                subcategoryCounts[subcategory]++
            } else {
                subcategoryCounts[subcategory] = 1
            }
        })
        const pieChartData = [['Subcategory', 'Count']]
        Object.entries(subcategoryCounts).forEach(([subcategory, count]) => {
            pieChartData.push([subcategory, count])
        })
        return pieChartData
    }

}

export default PieChart