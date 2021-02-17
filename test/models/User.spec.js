const User = require('../../models/User')

describe('User model required validation', () => {
  it(' Should  validate user with all the required', async () => {
    let error = null

    try {
      const user = new User({
        name: 'Mock name',
        email: 'email@mock.com',
        phone: 'mock phone',
        password: 'mock password',
        address: 'mock_address',
        role: 'admin',
      })
      await user.validate()
    } catch (e) {
      error = e
    }

    expect(error).toBeNull()
  })

  it('Should not validate user with missing phone', async () => {
    let error = null

    try {
      const user = new User({
        name: 'mock name',
        email: 'email@mock.com',
        password: 'mock password',
        address: 'mock_address',
      })
      await user.validate()
    } catch (e) {
      error = e
    }

    expect(error).not.toBeNull()
  })

  it('Should not validate user with missing password', async () => {
    let error = null

    try {
      const user = new User({
        email: 'email@mock.com',
        phone: 'mock phone',
        name: 'mock name',
        address: 'mock_address',
      })
      await user.validate()
    } catch (e) {
      error = e
    }

    expect(error).not.toBeNull()
  })

  it('Should not validate user with missing address', async () => {
    let error = null

    try {
      const user = new User({
        email: 'email@mock.com',
        phone: 'mock phone',
        password: 'mock password',
        name: 'mock name',
      })
      await user.validate()
    } catch (e) {
      error = e
    }

    expect(error).not.toBeNull()
  })

  it('Should not validate user with missing email', async () => {
    let error = null

    try {
      const user = new User({
        name: 'mock name',
        phone: 'mock phone',
        password: 'mock password',
        address: 'mock_address',
      })
      await user.validate()
    } catch (e) {
      error = e
    }

    expect(error).not.toBeNull()
  })
})
