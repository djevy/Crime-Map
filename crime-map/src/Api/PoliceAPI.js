import axios from 'axios'

const options = {
    baseURL: "https://data.police.uk/api",
    headers: {
        Accept: 'application/json,text/plain,*/*',
        'Content-Type': 'application/json',
    },
}

export const request = axios.create(options)

request.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)


export const findCrimesAtALocation = async (date, lat, lng) => {
    try {
        const url = `/crimes-at-location?date=${date}&lat=${lat}&lng=${lng}`

        const response = await request.get(url)

        return response?.data
    } catch (err) {
        if (err?.response?.data?.data?.message) {
            throw new Error(err.response.data.data.message.join('\n\n'))
        }
        const error = err?.response?.data?.message || err?.message
        throw new Error(error)
    }
}

export const findStreetLevelCrime = async (date, lat, lng) => {
    try {
        const url = `/crimes-street/all-crime?lat=${lat}&lng=${lng}&date=${date}`
        // const url = `/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2020-01`

        const response = await request.get(url)

        return response?.data
    } catch (err) {
        if (err?.response?.data?.data?.message) {
            throw new Error(err.response.data.data.message.join('\n\n'))
        }
        const error = err?.response?.data?.message || err?.message
        throw new Error(error)
    }
}