const Category = require('../../models/Category')

describe('Category model required validation', () => {
  it(' Should  validate user with all the required', async () => {
    let error = null

    try {
      const category = new Category({
        name: 'Mock name',
      })
      await category.validate()
    } catch (e) {
      error = e
    }

    expect(error).toBeNull()
  })

  it('Should not validate category with missing name', async () => {
    let error = null

    try {
      const category = new Category({})
      await category.validate()
    } catch (e) {
      error = e
    }

    expect(error).not.toBeNull()
  })
})
