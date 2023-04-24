const BASE_URI = 'http://localhost:5100/'

export interface IErrorResponse {
    status: number
    code: string
    error: boolean
    title: string
    message: string
    target: string
    details?: IErrorDetails[]
}

export interface IErrorDetails {
    code: string
    target: string
    message: string
}

export interface IToken {
    token: string
    idToken?: string
    refreshToken?: string
}
export interface IRegisterResponse {
    location: string
}

export class ResponseError extends Error {
    error: IErrorResponse
    constructor(errorResponse: IErrorResponse) {
        super(errorResponse.message || 'Error')
        this.error = errorResponse
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ResponseError.prototype)
        // the next line is important so that the ValidationError constructor is not part
        // of the resulting stacktrace
        Error.captureStackTrace(this, ResponseError)
    }
}

export function isResponseJson(response: Response): boolean {
    const contentType = response.headers.get('content-type')
    return !!(contentType && contentType.indexOf('application/json') !== -1)
}

export async function fetchWithErrorHandling<Type>(
    method: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH',
    url: string,
    body?: string
): Promise<Type> {
    let requestInfo = {}
    if (method === 'GET') {
        requestInfo = {
            credentials: 'same-origin',
            method: method,
        }
    } else {
        requestInfo = {
            credentials: 'same-origin',
            method: method,
            body: body || {},
        }
    }

    console.log('BASE_URI', BASE_URI)

    return fetch(BASE_URI + url, requestInfo)
        .then((result) => {
            if (!result.ok && !isResponseJson(result)) {
                throw result
            }
            return Promise.all([
                result.ok,
                result.status === 204 ? '' : result.json(),
            ])
        })
        .then(([ok, body]) => {
            if (ok) return body
            else throw new ResponseError(body)
        })
        .catch((error) => {
            console.log('Error occurred')
            console.log(error)
            //should we handle differently these two errors?
            if (error instanceof ResponseError) {
                throw error
            }
            if (error instanceof Error) {
                throw error
            }
            throw new Error(error)
        })
}
