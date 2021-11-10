const factory = require("./factory-Function");
module.exports = function routes(pool){
    const useFactory = factory(pool);
    async function home(req,res){
        var allFruits = await useFactory.getfruitnames();
        var full = JSON.stringify(allFruits)
        res.render("index", {data: full})
    }
    async function registerFruit(req,res){
        var name = req.body.fruitName;
        var price = (Number(req.body.fruitPrice)) .toFixed(2);
        await useFactory.setNewFruit(name, price);
        res.redirect("/");
    }
    async function fruits(req,res){
        var allFruits = await useFactory.getFruitsData();
        res.render("fruits", {fruit: allFruits});
    }
    async function fruit(req,res){
            var fruitName = req.params.fruitName;
            var data = await  useFactory.getDeatails(fruitName);
            res.render("details", {data})    
    }
    async function update(req,res){
        var price = req.body.price;
        var count = req.body.count;
        var fruitName = req.body.fruitName;
        console.log(req.body)
        await useFactory.update(price, count, fruitName);
        res.redirect("/fruit/"+ fruitName+"");
    }
    async function reset(req,res){
        await useFactory.reset();
        res.redirect("/");
    }
    return{
        home,
        registerFruit,
        fruits,
        fruit,
        update,
        reset
    }
}