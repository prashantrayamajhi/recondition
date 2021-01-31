const Product = require('../../models/Product')

describe('Product model required validation', () => {
  it(' Should  validate user with all the required', async () => {
    let error = null

    try {
      const user = new Product({
        category: 'Mock category',
        model: 'Mock model',
        description: 'Mock description',
        price: 10,
        name: 'Mock name',
      })
      await user.validate()
    } catch (e) {
      error = e
    }

    expect(error).toBeNull()
  })

  it(' Should not validate user if name is missing', async () => {
    let error = null

    try {
      const user = new Product({
        category: 'Mock category',
        model: 'Mock model',
        description: 'Mock description',
        price: 10,
      })
      await user.validate()
    } catch (e) {
      error = e
    }

    expect(error).not.toBeNull()
  })

  it('Should not validate user with missing price', async () => {
    let error = null

    try {
      const user = new Product({
        category: 'Mock category',
        model: 'Mock model',
        description: 'Mock description',
        name: 'Mock name',
      })
      await user.validate()
    } catch (e) {
      error = e
    }

    expect(error).not.toBeNull()
  })

  it('Should not validate user with missing description', async () => {
    let error = null

    try {
      const user = new Product({
        category: 'Mock category',
        model: 'Mock model',
        price: 10,
        name: 'Mock name',
      })
      await user.validate()
    } catch (e) {
      error = e
    }

    expect(error).not.toBeNull()
  })
})
