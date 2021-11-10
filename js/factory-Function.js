module.exports = function factory(pool){
    const useDb = require("./database")(pool);
    async function setNewFruit(name, price){
        await useDb.insertNewFruit(name,price)
    }
    async function getfruitnames(){
        var data = await useDb.getFruitNames();
        return data
    }
    async function getFruitsData(){
        var data = await useDb.getFruitsData();
        return data
    }
    async function getDeatails(fruitName){
        var data = await useDb.getDetails(fruitName);
        return data
    }
    async function update(price, count, fruitName){
        var total = price * count;
        await useDb.update(total, count, fruitName);
    }
    async function reset(){
        await useDb.reset()
    }
    async function disconnect(){
        await useDb.disconnect();
    }
    return{
        setNewFruit,
        getfruitnames,
        getFruitsData,
        getDeatails,
        update,
        reset,
        disconnect
    }
}