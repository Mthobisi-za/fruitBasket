module.exports = function dbfile(pool) {
  async function insertNewFruit(name, price) {
    var name = name.toUpperCase();
    var checker = (
      await pool.query("select * from  fruit_basket  where fruit_name = $1", [
        name,
      ])
    ).rows;
    if (checker.length < 1) {
      //does not exist
      await pool.query(
        "insert into fruit_basket (fruit_name, fruit_price,total,count)values($1, $2,$3,$4)",
        [name, price, 0, 0]
      );
    }
  }

  async function getFruitNames() {
    var data = (await pool.query("select fruit_name from fruit_basket")).rows;
    var arg = data.map((current) => {
      return current.fruit_name;
    });
    return arg;
  }

  async function getFruitsData() {
    var data = (await pool.query("select fruit_name, fruit_price, total,count  from fruit_basket")).rows;
    return data;
  }

  async function getDetails(fruitName) {
      var data = (await pool.query("select fruit_name, fruit_price, total,count from fruit_basket where fruit_name=$1", [fruitName])).rows;
      fulldata = data[0]
      return data[0];
  }
  async function update(total, count, fruitName){
    await pool.query("update fruit_basket set count = $1, total = $2 where fruit_name = $3", [count, total, fruitName])
  }
  async function reset(){
    await pool.query("delete from fruit_basket");
  }
  async function disconnect(){
    await pool.end();
  }
  return {
    insertNewFruit,
    getFruitNames,
    getFruitsData,
    getDetails,
    update,
    reset,
    disconnect
  };
};
