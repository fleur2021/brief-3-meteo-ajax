 
//1 Recupérer une clé API
//2 Tester l'URL dans le navigateur
//3 Afficher la reponse HTTP dans la console du navigateur avec l'objet javascript 'fetch()'
   const fetchSearch = async() => { // asynchrone : on n'attends pas le reponse du serveur pour executer une autre tache 
    fetch ("https://api.openweathermap.org/data/2.5/forecast?q=Nice&appid=470bd0243265f5c58e487f8033826f28")
    
    //.then (res=>res.json()) //1ere promesse 
    .then ( res=>{
        if (res.ok){
            res.json().then(data=>{
                console.log(data)
            })
        } else {
        console.log("error");
        }
    })
 
}  
fetchSearch(); // appel de la fonction 

// bloquer le rechargement de la page au clic du bouton 
// jQuery   
$(function(){
    console.log("toto");
    var apiKey = "470bd0243265f5c58e487f8033826f28" ;
    //var baseUrl = "https://api.openweathermap.org/data/2.5/weather?q=paris&appid=" + apiKey ;
    //var baseUrl = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey +"&q=paris" ;
    var baseUrl = "https://api.openweathermap.org/data/2.5/weather?appid=" + apiKey + "&units=metric&lang=fr"  ; // j'ai ajouté &units=metric  pour le Celsius 
    


    console.log(baseUrl);
    $("#weather button").click(function(e){
        e.preventDefault(); // qd on clique que le bouton recherchez la page ne se recharge plus 
        //AJAX consiste à charger des données et à les afficher sur la page Web, sans recharger toute la page
        //https://api.jquery.com/jQuery.ajax/ 
        var cityValue = $("#city").val() ;

        var params={ // objet
            url: baseUrl + "&q="+cityValue, // & pour dire on passe plusieurs parametre lune a la suite des autres 
            method: 'GET' 
        }
        $.ajax(params).done(function(response){ // si tt se passe bien on execute la fonction 
            console.log("succes");
            console.log(response);
            //montrer la carte 
            $(".card").removeClass("d-none");
            // Error
            $("#city").removeClass("is-invalid");
            $(".invalid-feedback").slideUp(); // masquer mon msg d'erreur
            //$(".invalid-feedback").hide(); //meme resultat 
            $(".card").show();


            //titre 
            $(".card-title").text(response.name);
            //description 
            $(".description-weather").text(response.weather[0].description)
            /////photo en background 

            /*fetch('https://source.unsplash.com/1600x900/?'+cityValue) // fonctionne aussi
                .then((res) => { //console.log(res); console.log(res.url);
                    var urlcity = res.url;
                    console.log("urlcity : " +urlcity);
                    $("body").css("background-image", "url(" + urlcity + ")");
                
                })*/
              
             document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + cityValue + "')"; // fonctionne aussi
            //document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?Nice')";


            //temperature
            var temp = Math.round(response.main.temp)+"°";
            var tempMax = Math.round(response.main.temp_max)+"°";
            var tempMin = Math.round(response.main.temp_min)+"°";

            $(".temp-weather").text(temp);
            $(".temp-max-weather").text(tempMax);
            $(".temp-min-weather").text(tempMin);

            //les images
            var image = response.weather[0].icon;
            $(".image-weather").attr("src" ,  'https://openweathermap.org/img/wn/'+image+'@2x.png');
            $(".image-weather").attr("alt" ,  response.name);

            
        })
        .fail(function(){
            console.error("ERREUR");
            $(".invalid-feedback").slideDown();
            $("#city").addClass("is-invalid");
            $(".card").hide();

        });





    });



});
 
 
