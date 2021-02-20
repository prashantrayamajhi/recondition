const Model = require('../../models/Model')

describe('Model model required validation', () => {
    it(' Should  validate user with all the required', async () => {
        let error = null

        try {
            const model = new Model({
                name: 'Mock name',
            })
            await model.validate()
        } catch (e) {
            error = e
        }

        expect(error).toBeNull()
    })

    it('Should not validate user with missing name', async () => {
        let error = null

        try {
            const model = new Model({})
            await model.validate()
        } catch (e) {
            error = e
        }

        expect(error).not.toBeNull()
    })
})
