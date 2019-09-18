import { ImmortalStorage, IndexedDbStore, LocalStorageStore, SessionStorageStore } from 'immortal-db'

const stores = [IndexedDbStore, LocalStorageStore, SessionStorageStore]
const db = new ImmortalStorage(stores)

export default db
