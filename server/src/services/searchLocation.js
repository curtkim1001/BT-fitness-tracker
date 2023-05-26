import got from 'got'

class searchLocation {
    static async getSearchResults (query) {
        try {
            const API_KEY = process.env.GOOGLE_MAPS_API_KEY
            const search_limit = 5
            const response = await got(`https://maps.googleapis.com/maps/api/place/textsearch/json?key=${API_KEY}&query=${query}`)
            const body = JSON.parse(response.body)
            const filteredBody = body.results.map((result)=> {
                return {
                    place_id: result.place_id,
                    name: result.name,
                    address: result.formatted_address,
                    geometry: result.geometry,
                    photos: result.photos
                }
            })
            return filteredBody
        } catch (error) {
            console.log(error)
        }
    }
}

export default searchLocation