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
const useFactory = require("../js/database")(pool);
const assert = require("assert");
//-----unit test
describe("Factory Function Tests", async function(){
    beforeEach(async function(){
      await pool.query("delete from fruit_basket")
    });
    it('Should be able to register a new fruit Basket', async function()  {
        var data = [
          {
            fruit_name: 'APPLE'
          }
        ]
        await useFactory.insertNewFruit("apple", 5);
        assert.deepEqual(data, await useFactory.getFruitNames())
    }); 
    it('Should be able to get all fruits names', async function()  {
        var data =[
          {
            fruit_name: 'APPLE'
          },
          {
            fruit_name: 'APPLE'
          },
          {
            fruit_name: 'ORANGE'
          },
          {
            fruit_name: 'PEACH'
          }
        ]
        await useFactory.insertNewFruit("apple", 5);
        await useFactory.insertNewFruit("apple", 10);
        await useFactory.insertNewFruit("orange", 5);
        await useFactory.insertNewFruit("peach", 5);
        assert.deepEqual(data, await useFactory.getFruitNames())
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
        await useFactory.insertNewFruit("apple", 5);
        await useFactory.insertNewFruit("orange", 5);
        await useFactory.insertNewFruit("peach", 5);
        assert.deepEqual(data, await useFactory.getFruitsData())
    });
    it('Should be able to get data for specific fruit', async function()  {
        var data ={
            count: 1,
            fruit_name: 'APPLE',
            fruit_price: '5.00'
          }
        await useFactory.insertNewFruit("apple", 5);
        await useFactory.insertNewFruit("orange", 5);
        await useFactory.insertNewFruit("peach", 5);
        assert.deepEqual(data, await useFactory.getDetails("APPLE"))
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
        await useFactory.insertNewFruit("apple", 5);
        await useFactory.update(7, 'APPLE');
        assert.deepEqual(data, await useFactory.getFruitsData())
    });
    it('Should be able to show the total price for a specific basket', async function()  {
      var data = [
        {
          total: "40.00"
        }
        ]
      await useFactory.insertNewFruit("apple", 5);
      await useFactory.update(7, 'APPLE');
      assert.deepEqual(data, await useFactory.getTotal("APPLE"))
  });
    after(async function (){
       await useFactory.disconnect()
    })
});