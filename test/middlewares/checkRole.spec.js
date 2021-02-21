const { adminAndCoAdminRouteRequired } = require('../../middlewares/checkRole')
const { adminRouteRequired } = require('../../middlewares/checkRole')

let req = null
let i = 0
let theStatus = null
let theMessage = null

beforeAll(() => {
    req = {
        user: {
            role: 'admin',
        },
    }
})

beforeEach(() => {
    i = 0
})

describe('Check Role Test', () => {
    it('Test is admin auth will let user go in if user is admin', async (done) => {
        adminRouteRequired(req, {}, () => {
            i += 1
        })

        expect(i).toBe(1)
        done()
    })

    it('Test is admin auth will not let user go in if user is not admin', async (done) => {
        req = {
            user: {
                role: 'co-admin',
            },
        }
        adminRouteRequired(
            req,
            {
                status(status) {
                    theStatus = status
                    return this
                },
                send(message) {
                    theMessage = message
                    return this
                },
            },
            () => {
                i += 1
            }
        )
        expect(theMessage).toMatchObject({ err: 'Not authorized' })
        expect(i).toBe(0)
        expect(theStatus).toBe(401)
        req = {
            user: {
                role: 'user',
            },
        }

        adminRouteRequired(
            req,
            {
                status(status) {
                    theStatus = status
                    return this
                },
                send(message) {
                    theMessage = message
                    return this
                },
            },
            () => {
                i += 1
            }
        )

        // ...
        done()
    })
})

describe('Check CoAdmin Role Test', () => {
    it('Test is admin auth will let user go in if user is co-admin or admin', async (done) => {
        req = {
            user: {
                role: 'admin',
            },
        }

        adminAndCoAdminRouteRequired(req, {}, () => {
            i += 1
        })

        req = {
            user: {
                role: 'co-admin',
            },
        }

        adminAndCoAdminRouteRequired(req, {}, () => {
            i += 1
        })

        expect(i).toBe(2)
        done()
    })

    it('Test is admin auth will not let user go in if user is not admin or co-admin', async (done) => {
        req = {
            user: {
                role: 'user',
            },
        }

        adminAndCoAdminRouteRequired(
            req,
            {
                status: function (status) {
                    theStatus = status
                    return this
                },
                send: function (message) {
                    theMessage = message
                    return this
                },
            },
            () => {
                i += 1
            }
        )
        expect(theMessage).toMatchObject({ err: 'Not authorized' })
        expect(i).toBe(0)
        expect(theStatus).toBe(401)
        // ...
        done()
    })
})
