const json = '{"results":[{"id":644482,"title":"German Meatloaf Falscher Hase","image":"https://spoonacular.com/recipeImages/644482-312x231.jpg","imageType":"jpg","nutrition":{"nutrients":[{"title":"Calories","amount":381.136,"unit":"kcal"},{"title":"Fat","amount":20.5184,"unit":"g"},{"title":"Carbohydrates","amount":7.94852,"unit":"g"}]}},{"id":638493,"title":"Chicken/sweet Potato Roulade With Goat Cheese Sauce","image":"https://spoonacular.com/recipeImages/638493-312x231.jpg","imageType":"jpg","nutrition":{"nutrients":[{"title":"Calories","amount":230.236,"unit":"kcal"},{"title":"Fat","amount":7.78143,"unit":"g"},{"title":"Carbohydrates","amount":20.6592,"unit":"g"}]}},{"id":644488,"title":"German Rhubarb Cake with Meringue","image":"https://spoonacular.com/recipeImages/644488-312x231.jpg","imageType":"jpg","nutrition":{"nutrients":[{"title":"Calories","amount":211.633,"unit":"kcal"},{"title":"Fat","amount":4.43153,"unit":"g"},{"title":"Carbohydrates","amount":39.0698,"unit":"g"}]}},{"id":643851,"title":"Frikadellen German Meat Patties","image":"https://spoonacular.com/recipeImages/643851-312x231.jpg","imageType":"jpg","nutrition":{"nutrients":[{"title":"Calories","amount":149.848,"unit":"kcal"},{"title":"Fat","amount":9.6438,"unit":"g"},{"title":"Carbohydrates","amount":6.70472,"unit":"g"}]}},{"id":635108,"title":"Black Forest Cake For Blogger Friends","image":"https://spoonacular.com/recipeImages/635108-312x231.jpg","imageType":"jpg","nutrition":{"nutrients":[{"title":"Calories","amount":228.236,"unit":"kcal"},{"title":"Fat","amount":11.4882,"unit":"g"},{"title":"Carbohydrates","amount":21.8943,"unit":"g"}]}},{"id":641308,"title":"Decadent Black Forest Cake","image":"https://spoonacular.com/recipeImages/641308-312x231.jpg","imageType":"jpg","nutrition":{"nutrients":[{"title":"Calories","amount":203.269,"unit":"kcal"},{"title":"Fat","amount":10.5082,"unit":"g"},{"title":"Carbohydrates","amount":26.8038,"unit":"g"}]}},{"id":644462,"title":"German Chocolate Drink with Xocai Healthy Chocolate","image":"https://spoonacular.com/recipeImages/644462-312x231.jpg","imageType":"jpg","nutrition":{"nutrients":[{"title":"Calories","amount":132.412,"unit":"kcal"},{"title":"Fat","amount":1.11252,"unit":"g"},{"title":"Carbohydrates","amount":18.5364,"unit":"g"}]}}],"offset":0,"number":10,"totalResults":7}';
const obj = JSON.parse(json);

for (let i = 0; i < obj.results.length; i++) {
    
    let content = document.getElementById('content');
    let title = document.createElement('h2');
    let nutrition = document.createElement('div');
    let img = document.createElement('img');
    let nutrients = obj.results[i].nutrition.nutrients;

    title.innerHTML = obj.results[i].title;
    nutrition.innerHTML = `Calories: ${Math.round(nutrients[0].amount)} Fat: ${Math.round(nutrients[1].amount)} gram(s) Carbs: ${Math.round(nutrients[2].amount)}`;
    img.src = obj.results[i].image;

    content.appendChild(title);
    content.appendChild(nutrition);
    content.appendChild(img);
}