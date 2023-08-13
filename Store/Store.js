class Store {
  constructor() {
    this._store = new Map()
  }

  get(key) {
    return this._store.get(key)
  }
  set(key, value) {
    this._store.set(key, value)
  }
  has(key) {
    return this._store.has(key)
  }
  show() {
    const obj = {}
    this._store.forEach((value, key) => {
      obj[key] = value
    })

    return obj
  }
  deleteByKey(key) {
    return this._store.delete(key)
  }

  connect(Cls) {
    const store = this

    return class extends Cls {
      constructor(...args) {
        super(...args)

        this.get = store.get.bind(store)
        this.set = store.set.bind(store)
        this.has = store.has.bind(store)
        this.show = store.show.bind(store)
        this.deleteByKey = store.deleteByKey.bind(store)
      }
    }
  }
}

export const store = new Store()
