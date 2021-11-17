module.exports = function dbfile(pool) {

  async function insertNewFruit(name, price) {
    var name = name.toUpperCase();
      await pool.query("insert into fruit_basket (fruit_name, fruit_price,count)values($1, $2,$3)",[name, price, 1])
  }

  async function getFruitNames() {
    var data = (await pool.query("select fruit_name from fruit_basket")).rows;
    var arg = data.map((current) => {
      return current.fruit_name;
    });
    return arg;
  }

  async function getFruitsData() {
    var data = (await pool.query("select fruit_name, fruit_price,count, (fruit_price * count) as total  from fruit_basket")).rows;
    return data;
  }

  async function getDetails(fruitName) {
      var data = (await pool.query("select fruit_name, fruit_price,count from fruit_basket where fruit_name=$1", [fruitName])).rows;
      fulldata = data[0]
      return data[0];
  }
  
  async function update( count, fruitName){
    await pool.query("update fruit_basket set count = count + $1 where fruit_name = $2", [count, fruitName])
  }
 
  async function disconnect(){
    await pool.end();
  }

  async function getTotal(fruitName){
    var data = await pool.query("select (fruit_price * count) as total from fruit_basket where fruit_name = $1 ", [fruitName])
    return data.rows
  }

  return {
    insertNewFruit,
    getFruitNames,
    getFruitsData,
    getDetails,
    update,
    disconnect,
    getTotal
  };
};
