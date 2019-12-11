//name, price, date_added, checked, category
const ShoppingListService = require('../src/shopping-list-services')
const knex = require('knex')

describe(`Shopping Service Object`, function() {
  let db
  let testItems = [
    {
      id:1,
      name:'Fish tricks',
      price:"13.10",
      date_added:new Date('2020-01-01T00:00:00.000Z'),
      checked:false,
      category: 'Main',
    },
    {
      id:2,
      name:'Not Dogs',
      price:"4.99",
      date_added:new Date('2020-01-01T00:00:00.000Z'),
      checked:false,
      category:'Snack',
    },
    {
      id:3,
      name:'Bluffalo Wings',
      price:"5.50",
      date_added:new Date('2020-01-01T00:00:00.000Z'),
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

  before(() => db('shopping_list').truncate())

  after(()=> db.destroy())

  afterEach(()=> db('shopping_list').truncate())

  context(`Given 'shopping_list' has no data`,
    ()=> {
      it(`getAllItems() resolves an empty array`, () => {
        return ShoppingListService.getAllItems(db)
        .then(actual => {
            expect(actual).to.eql([])
        })
      })
    }
  )
  
  it(`insertItem() inserts a new item and resolves the new item with an 'id'`, () => {
      const newItem = {
        name: 'Test new Name',
        price: "1.00",
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


    context(`Given 'shopping_list' has data`, ()=> {
      beforeEach(()=> {
        return db 
          .into('shopping_list')
          .insert(testItems)
      })
      it(`updateItem() updates item from the 'shopping_list'table`, ()=> {
        const idOfItemToUpdate = 3
        const newItemData = {
          name: 'Test new Name',
          price: "1.00",
          date_added: new Date('2020-01-01T00:00:00.000Z'),
          checked: false,
        }
        const originalItem = testItems[idOfItemToUpdate -1]
        console.log(originalItem);
        return ShoppingListService.updateItem(db, idOfItemToUpdate, newItemData)
          .then(()=> ShoppingListService.getById(db, idOfItemToUpdate))
          .then(item => {
            expect(item).to.eql({
              id: idOfItemToUpdate,
              ...originalItem,
              ...newItemData,
            })
          })
      })
      it(`deleteItem() removes an item by id from an article by id from 'shopping_list' take`, () => {
          const itemId = 2
          return ShoppingListService.deleteItem(db, itemId)
          .then(() => ShoppingListService.getAllItems(db))
          .then(allItems => {
              const expected = testItems
                .filter(item => item.id !== itemId)
                .map(item => ({
                  ...item,
                  checked: false,
                }))
              expect(allItems).to.eql(expected)
          })
      })
      it(`getById() resolves an article by id from 'shopping_list' table`, ()=> {
        const idToGet = 3
        const thirdItem = testItems[idToGet - 1]
        return ShoppingListService.getById(db, idToGet)
          .then(actual=> {
            expect(actual).to.eql({
              id: idToGet,
              name: thirdItem.name,
              price: thirdItem.price,
              date_added: thirdItem.date_added,
              checked: false,
              category: thirdItem.category,
            })
          })
       })
       it(`getAllItems() resolves all items from 'shopping_list' table`, ()=> {
        const expectedItems = testItems.map(item => ({
          ...item,
          checked: false,
        }))
        return ShoppingListService.getAllItems(db)
          .then(actual => {
            expect(actual).to.eql(expectedItems)
          })
        })
    })
})