const coffeeList = document.getElementById("coffeeList");

fetch('http://localhost:8282/results')
    .then(response => response.json())
    .then(data => {
        data.forEach(coffee => {
            const coffeeItem = `<div id='coffeeItem'><p><a href=${coffee.fixedCoffeeURL}><img src="https://store.georgehowellcoffee.com${coffee.coffeeImage}"></a><p><h2>` + coffee.coffeeName + `</h2><h3>` + coffee.coffeeCountry + `</h3><p>` + coffee.coffeeFlavors + `</p></div>`
            coffeeList.insertAdjacentHTML('beforeend', coffeeItem);
        })
    })
    .catch(err => console.log(err));