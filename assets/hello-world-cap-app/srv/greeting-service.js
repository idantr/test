import cds from '@sap/cds'

export default class GreetingService extends cds.ApplicationService {

  async init() {
    this.on('greet', req => {
      const { name } = req.data
      const displayName = (name && name.trim()) ? name.trim() : 'World'
      return `Hello, ${displayName}!`
    })
    return super.init()
  }

}
