const getMeal = (searchData='fish')=> {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchData}`;
    fetch(url)
    .then(req => req.json())
    .then(data => showData(data.meals));
}
// getMeal2 by async-await
const getMeal2 = async(searchData='fish') => {
    try{
        const url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchData}`;
        const res = await fetch(url);
        const data = await res.json();
        showData(data.meals);
    }
    catch(err){
        console.log(err);
    }
}

const showData = (meals) => {
        // get the container
        const mealCon = document.getElementById('meal-container');
        mealCon.innerHTML = '';
        meals.forEach(meal=>{
        //
        //console.log(meal);
        // create child
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col');
        // set child value
        mealDiv.innerHTML = `
        <div class="col">
        <div class="card h-100">
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strCategory}</p>
        <button type="button" onclick="loadDetail2(${meal.idMeal})" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mealModal">
            Details
        </button>
        </div>
        </div>
        </div> 
        `
        // append child
        mealCon.appendChild(mealDiv);

    })
}

const loadDetail = mealID =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;
    //console.log(mealID);
    fetch(url)
    .then(req => req.json())
    .then(data=>displayMealDetail(data.meals[0]));
}
// loadDetail2 by async await
const loadDetail2 = async(mealID) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`;
    try{
        const response = await fetch(url);
        const data = await response.json();
        displayMealDetail(data.meals[0]);
    }
    catch(error){
        console.log(error);
    }
    
}
const displayMealDetail = mealDet =>{
    document.getElementById('mealModalLabel').innerText = mealDet.strMeal;
    const detBody = document.getElementById('modalBody');
    let vdoUrl = mealDet.strYoutube;
    let url = vdoUrl.replace("watch?v=", "embed/");
    console.log(url);
    detBody.innerHTML = `
    <img src="${mealDet.strMealThumb}" class="img-fluid" alt="...">
    <h4><b>Origin: ${mealDet.strArea}</b></h4>
    
    <h4><b>Instruction</b></h4>
    <p>${mealDet.strInstructions}</p>
    <br>
    <iframe width="450" height="315" src="${url}">
    </iframe>
    `
}

// to get data by search
const searchMeals = ()=>{
    const txt = document.getElementById('search-field').value;
        //console.log(txt);
    // to display search meal we can modify getmeal func ( pass the txt value and create dynamic string)
    getMeal(txt);
    document.getElementById('search-field').value = '';
}

// type letters of food name and search dynamically
const dynamicText = document.getElementById('search-field').addEventListener('keyup',function(event){
    const rawTxt = event.target.value;
    getMeal(rawTxt);
})

getMeal();
