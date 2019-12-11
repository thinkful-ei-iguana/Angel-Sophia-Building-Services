//name, price, date_added, checked, category
const ShoppingListService = require('../src/shopping-list-services')
const knex = require('knex')

describe(`Shopping Service Object`, function() {
  let db
  let testItems = [
    {
      id:1,
      name:'Fish tricks',
      price:13.10,
      date_added:'2020-01-01T00:00:00.000Z',
      checked:false,
      category: 'Main',
    },
    {
      id:2,
      name:'Not Dogs',
      price:4.99,
      date_added:'2020-01-01T00:00:00.000Z',
      checked:true,
      category:'Snack',
    },
    {
      id:3,
      name:'Bluffalo Wings',
      price:5.50,
      date_added:'2020-01-01T00:00:00.000Z',
      checked:false,
      category:'Snack',
    },
  ]

  before(()=> {
    db = knex({
      client:'pg',
      connection: process.env.TEST_DB_URL,
    })
  })

  before(() => db('shopping_items').truncate())

  after(()=> db.destroy())

  afterEach(()=> db('shopping_items').truncate())

  context(`Given 'shopping_items' has no data`,
    ()=> {
      it(`getAllItems() resolves an empty array`,   ()=> {
        return ShoppingListService.getAllItems
        (db)
          .then(actual => {
            expect(actual).to.eql([])
          })
      })
    }
  )
  
  it(`insertItem() inserts a new item and resolves the new item with an 'id'`, () => {
      const newItem = {
        name: 'Test new Name',
        price: 1.00,
        date_added: new Date('2020-01-01T00:00:00.000Z'),
        checked: false,
        category: 'Main'
      }
      return ShoppingListService.insertItem(db, newItem)
      .then(actual => {
          expect(actual).to.eql({
              id: 1,
              name: newItem.name,
              price: newItem.price,
              date_added: newItem.date_added,
              checked: newItem.checked,
              category: newItem.category,
          })
      })
  })


    context(`Given 'shopping_items' has data`, ()=> {
      beforeEach(()=> {
        return db 
          .into('shopping_items')
          .insert(testItems)
      })
      it(`updateItem() updates item from the 'shopping_items'table`, ()=> {
        const idOfItemToUpdate = 4
        const newItemData = {
          name: 'Test new Name',
          price: 1.00,
          date_added: '2020-01-01T00:00:00.000Z',
          checked: false,
          category: 'Main'
        }
        return ShoppingListService.updateItem(db, idOfItemToUpdate, newItemData)
          .then(()=> ShoppingListService.getById(db, idOfItemToUpdate))
          .then(item => {
            expect(item).to.eql({
              id: idOfItemToUpdate,
              ...newItemData,
            })
          })
      })
      it(`deleteItem() removes an item by id from an article by id from 'shopping_list' take`, () => {
          const itemId = 2
          return ShoppingListService.deleteItem(db, itemId)
          .then(() => ShoppingListService.getAllItems(db))
          .then(allItems => {
              const expected = testItems.filter(item => item.id !== item.id)
              expect(allItems).to.eql(expected)
          })
      })
      it(`getById() resolves an article by id from 'shopping_items' table`, ()=> {
        const thirdId = 3
        const thirdTestItem = testItems[thirdId - 1]
        return ShoppingListService.getById(db, thirdId)
          .then(actual=> {
            expect(actual).to.eql({
              id: thirdId,
              name: thirdTestItem.name,
              price: thirdTestItem.price,
              date_added: thirdTestItem.date_added,
              checked: thirdTestItem.checked,
              category: thirdTestItem.category
            })
          })
      })
      it(`getAllItems() resolves all items from 'shopping_list' table`, () => {
          return ShoppingListService.getAllItems(db)
          .then(actual => {
              expect(actual).to.eql(testItems)
          })
      })
    })
})