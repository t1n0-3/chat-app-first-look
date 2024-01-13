const baseURl = 'http://localhost:3000/'
async function requester(method, url, data) {
    const option = { method }

    if (data) {
        option['headers'] = { 'Content-Type': 'application/json' }
        option.body = JSON.stringify(data)
    }

    const response = await fetch(baseURl + url, option)
    if (!response.ok) {
        throw new Error(response)
    }
    return response.json()

}

export const GET = requester.bind(null, 'GET')
export const POST = requester.bind(null, 'POST')
export const PUT = requester.bind(null, 'PUT')
export const DEL = requester.bind(null, 'DELETE')