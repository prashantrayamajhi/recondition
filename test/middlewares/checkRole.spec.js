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

  it('Test is admin auth will let user go in if user is admin', async (done) => {
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
    expect(theMessage).toMatchObject({ err: 'Not authorized' })
    expect(i).toBe(0)
    expect(theStatus).toBe(401)
    // ...
    done()
  })
})
