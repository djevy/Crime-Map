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


export const findCrimesAtALocation = async (lng, lat) => {
    try {
        const url = `/crimes-at-location?date=2017-02&lat=${lng}&lng=${lat}`
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