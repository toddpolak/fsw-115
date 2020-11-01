const json = '{"results":[{"id":795751,"title":"Chicken Fajita Stuffed Bell Pepper","image":"https://spoonacular.com/recipeImages/795751-312x231.jpg","imageType":"jpg","nutrition":{"nutrients":[{"title":"Calories","amount":647.148,"unit":"kcal"},{"title":"Protein","amount":51.7495,"unit":"g"},{"title":"Fat","amount":25.9958,"unit":"g"},{"title":"Carbohydrates","amount":52.6629,"unit":"g"}]}},{"id":640062,"title":"Corn Avocado Salsa","image":"https://spoonacular.com/recipeImages/640062-312x231.jpg","imageType":"jpg","nutrition":{"nutrients":[{"title":"Calories","amount":238.845,"unit":"kcal"},{"title":"Protein","amount":4.61977,"unit":"g"},{"title":"Fat","amount":15.5354,"unit":"g"},{"title":"Carbohydrates","amount":26.2712,"unit":"g"}]}},{"id":715421,"title":"Cheesy Chicken Enchilada Quinoa Casserole","image":"https://spoonacular.com/recipeImages/715421-312x231.jpg","imageType":"jpg","nutrition":{"nutrients":[{"title":"Calories","amount":594.096,"unit":"kcal"},{"title":"Protein","amount":34.2319,"unit":"g"},{"title":"Fat","amount":23.7656,"unit":"g"},{"title":"Carbohydrates","amount":68.0382,"unit":"g"}]}},{"id":715543,"title":"Homemade Guacamole","image":"https://spoonacular.com/recipeImages/715543-312x231.jpg","imageType":"jpg","nutrition":{"nutrients":[{"title":"Calories","amount":170.127,"unit":"kcal"},{"title":"Protein","amount":2.31707,"unit":"g"},{"title":"Fat","amount":14.7885,"unit":"g"},{"title":"Carbohydrates","amount":10.9065,"unit":"g"}]}},{"id":651977,"title":"Mini Stuffed Mexican Bell Peppers","image":"https://spoonacular.com/recipeImages/651977-312x231.jpg","imageType":"jpg","nutrition":{"nutrients":[{"title":"Calories","amount":445.41,"unit":"kcal"},{"title":"Protein","amount":29.5274,"unit":"g"},{"title":"Fat","amount":5.15297,"unit":"g"},{"title":"Carbohydrates","amount":71.5317,"unit":"g"}]}},{"id":715533,"title":"Filet Mignon Soft Tacos","image":"https://spoonacular.com/recipeImages/715533-312x231.jpg","imageType":"jpg","nutrition":{"nutrients":[{"title":"Calories","amount":512.324,"unit":"kcal"},{"title":"Protein","amount":49.6232,"unit":"g"},{"title":"Fat","amount":28.72,"unit":"g"},{"title":"Carbohydrates","amount":12.4853,"unit":"g"}]}},{"id":975070,"title":"Instant Pot Chicken Taco Soup","image":"https://spoonacular.com/recipeImages/975070-312x231.jpg","imageType":"jpg","nutrition":{"nutrients":[{"title":"Calories","amount":345.987,"unit":"kcal"},{"title":"Protein","amount":25.4117,"unit":"g"},{"title":"Fat","amount":7.80926,"unit":"g"},{"title":"Carbohydrates","amount":49.5178,"unit":"g"}]}},{"id":715391,"title":"Slow Cooker Chicken Taco Soup","image":"https://spoonacular.com/recipeImages/715391-312x231.jpg","imageType":"jpg","nutrition":{"nutrients":[{"title":"Calories","amount":311.769,"unit":"kcal"},{"title":"Protein","amount":24.3302,"unit":"g"},{"title":"Fat","amount":3.78036,"unit":"g"},{"title":"Carbohydrates","amount":49.2427,"unit":"g"}]}},{"id":645856,"title":"Grilled Salmon With Cherry, Pineapple, Mango Salsa","image":"https://spoonacular.com/recipeImages/645856-312x231.jpg","imageType":"jpg","nutrition":{"nutrients":[{"title":"Calories","amount":510.373,"unit":"kcal"},{"title":"Protein","amount":37.1566,"unit":"g"},{"title":"Fat","amount":18.6914,"unit":"g"},{"title":"Carbohydrates","amount":53.5279,"unit":"g"}]}},{"id":664501,"title":"Vegan Taco bowls with Cilantro Lime Cauliflower Rice","image":"https://spoonacular.com/recipeImages/664501-312x231.jpg","imageType":"jpg","nutrition":{"nutrients":[{"title":"Calories","amount":529.469,"unit":"kcal"},{"title":"Protein","amount":12.6506,"unit":"g"},{"title":"Fat","amount":48.2374,"unit":"g"},{"title":"Carbohydrates","amount":22.1403,"unit":"g"}]}}],"offset":0,"number":10,"totalResults":159}';
const obj = JSON.parse(json);

for (let i = 0; i < obj.results.length; i++) {
    let content = document.getElementById('content');
    let title = document.createElement('h2');
    let nutrition = document.createElement('ul');
    let img = document.createElement('img');
    let itemInfo = document.createElement('div');
    let itemImg = document.createElement('div');
    let nutrients = obj.results[i].nutrition.nutrients;
    let calories = document.createElement('li');
    let protein = document.createElement('li');
    let fat = document.createElement('li');
    let carbs = document.createElement('li');

    itemInfo.style.display = 'flex';
    itemInfo.style.border = '1px solid black';
    img.src = obj.results[i].image;
    title.innerHTML = obj.results[i].title;
    calories.innerHTML = `Calories: ${Math.round(nutrients[0].amount)}`;
    protein.innerHTML = `Protein: ${Math.round(nutrients[1].amount)} gram(s)`;
    fat.innerHTML = `Fat: ${Math.round(nutrients[2].amount)} gram(s)`;
    carbs.innerHTML = `Carbs: ${Math.round(nutrients[3].amount)} gram(s)`;

    nutrition.appendChild(calories);
    nutrition.appendChild(protein);
    nutrition.appendChild(fat);
    nutrition.appendChild(carbs);
    itemInfo.appendChild(img);
    itemInfo.appendChild(nutrition);

    content.appendChild(title)
    content.appendChild(itemInfo);
    content.appendChild(itemImg);
}