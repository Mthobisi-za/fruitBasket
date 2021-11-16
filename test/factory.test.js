const { Pool } = require("pg");
var connectionString = process.env.DATABASE_URL;
var pool;
if (connectionString) {
  pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false}});
} else {
  pool = new Pool({
    user: "postgres",
    password: "mthobisi",
    database: "users",
    ssl: false,
    port: 5432,
  });
}
const useFactory = require("../js/factory-Function")(pool);
const assert = require("assert");
//-----unit test
describe("Factory Function Tests", async function(){
    beforeEach(async function(){
        await useFactory.reset()
    });
    it('Should be able to register a new fruit Basket', async function()  {
        var data ='APPLE'
        await useFactory.setNewFruit("apple", 5);
        assert.equal(data, await useFactory.getfruitnames())
    }); 
    it('Should be able to get all fruits names', async function()  {
        var data =['APPLE', 'ORANGE', "PEACH"]
        await useFactory.setNewFruit("apple", 5);
        await useFactory.setNewFruit("orange", 5);
        await useFactory.setNewFruit("peach", 5);
        assert.deepEqual(data, await useFactory.getfruitnames())
    }); 
    it('Should be able to get full data for all fruits', async function()  {
        var data = [
          {
            count: 1,
            fruit_name: 'APPLE',
            fruit_price: '5.00',
            total: '5.00'
          },
          {
            count: 1,
            fruit_name: 'ORANGE',
            fruit_price: '5.00',
            total: '5.00'
          },
          {
            count: 1,
            fruit_name: 'PEACH',
            fruit_price: '5.00',
            total: '5.00'
          }
        ]
        await useFactory.setNewFruit("apple", 5);
        await useFactory.setNewFruit("orange", 5);
        await useFactory.setNewFruit("peach", 5);
        assert.deepEqual(data, await useFactory.getFruitsData())
    });
    it('Should be able to get data for specific fruit', async function()  {
        var data ={
            count: 1,
            fruit_name: 'APPLE',
            fruit_price: '5.00'
          }
        await useFactory.setNewFruit("apple", 5);
        await useFactory.setNewFruit("orange", 5);
        await useFactory.setNewFruit("peach", 5);
        assert.deepEqual(data, await useFactory.getDeatails("APPLE"))
    });
    it('Should be able to update data for a specific fruit', async function()  {
        var data = [
          {
            count: 8,
            fruit_name: 'APPLE',
            fruit_price: '5.00',
            total: "40.00"
          }
          ]
        await useFactory.setNewFruit("apple", 5);
        await useFactory.update(7, 'APPLE');
        assert.deepEqual(data, await useFactory.getFruitsData())
    });
    it('Should be able to show the total price for a specific basket', async function()  {
      var data = [
        {
          total: "40.00"
        }
        ]
      await useFactory.setNewFruit("apple", 5);
      await useFactory.update(7, 'APPLE');
      assert.deepEqual(data, await useFactory.getTotal("APPLE"))
  });
    after(async function (){
       await useFactory.disconnect()
    })
});