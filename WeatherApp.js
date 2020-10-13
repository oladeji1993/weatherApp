window.addEventListener("load", ()=>{
     
    let lat;
    let long;

    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    const temperatureSpan = document.querySelector(".temperature Span");
    
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

            fetch(api,  {
                headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/json",
                }
              })
                .then(response =>{
                    return response.json();
            })
            .then(data =>{
                console.log(data)
                const {temperature, summary, icon} = data.currently;
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;

                let celsius = (temperature - 32) * (5 / 9)

                setIcon(icon, document.querySelector('.icon'));


                temperatureDegree.addEventListener('click', ()=>{
                    if(temperatureSpan.textContent === 'F'){
                       temperatureSpan.textContent = "C"
                       temperatureDegree.textContent = Math.floor(celsius)
                    }else{
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    }
                })
            })
            
        }) 
    }

    function setIcon(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);


    }
});