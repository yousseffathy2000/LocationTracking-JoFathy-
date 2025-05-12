// خاصية تحديد الموقع
navigator.geolocation.getCurrentPosition(
    function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        getData(`${latitude},${longitude}`);
    },
    function (error) {
        console.log("Could not get your location");
        getData("cairo");
    }
);


document.getElementById("input-value").addEventListener("input",function(){
    let ValueInput = document.getElementById("input-value").value;
    console.log(ValueInput);
    getData(ValueInput);
})

document.getElementById("button-addon2").addEventListener("click",function(){
    let ValueInput = document.getElementById("input-value").value;
    console.log(ValueInput);
    getData(ValueInput);
})

async function getData(city) {
    try {
        let promise = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=4f1bb927e02e4e9cae7172644241212&q=${city}&days=3`);
        let response = await promise.json();
        console.log(response);
        let imageUrl = await getCityImage(response.location.name);
        displyData(response, imageUrl);
    } catch (error) {
        console.log(error);
    }
}

async function getCityImage(cityName) {
    try {
        let unsplashKey = 'gU2eyiuj1F2UoSLwLTAPuEiiwR5hJ6-tta34iFs1WgQ';
        let res = await fetch(`https://api.unsplash.com/search/photos?query=${cityName}&client_id=${unsplashKey}`);
        let data = await res.json();
        if (data.results.length > 0) {
            return data.results[0].urls.small;
        } else {
            return 'https://via.placeholder.com/600x300?text=No+Image';
        }
    } catch (err) {
        console.log("Error fetching city image", err);
        return 'https://via.placeholder.com/600x300?text=Error';
    }
}

function displyData(response, imageUrl){
    let cartona = ``;
    let googleMapsUrl = `https://www.google.com/maps?q=${response.location.lat},${response.location.lon}`;
        cartona += `<div class="col-12">
                            <div class="card h-100">
                                <div class="card-body">
                                    <img src="${imageUrl}" class="rounded-circle mx-auto d-block" alt="${response.location.name}" style="width: 200px; height: 200px; object-fit: cover; margin-top: 15px;">
                                    <div class="degree-top text-center">${response.location.name}</div>
                                    <div class="d-flex justify-content-center align-items-center">
                                        <ul class="list-unstyled mt-4 d-flex column-gap-5">
                                            <li class="fs-5">Lat: ${response.location.lat}</li>
                                            <li class="fs-5">Lon: ${response.location.lon}</li>
                                        </ul> 
                                    </div>
                                    <div class="d-flex justify-content-center align-items-center">
                                        <a href="${googleMapsUrl}" target="_blank" class="btn btn-primary mt-3">View on Google Maps <i class="fa-solid fa-location-dot fa-beat-fade ms-3"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>`;
    document.getElementById("card-group").innerHTML = cartona;
    }


