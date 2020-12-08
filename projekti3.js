function getFakta() {
    $('#info').fadeOut();
    
    var faktat = ["Thanks to an extremely efficient pair of kidneys, cats can hydrate themselves by drinking salt water.",
                    "There are cases of cats reacting to natural disasters long before they happened.",
                    "Many Egyptians worshipped the goddess Bast, who had a woman’s body and a cat’s head.",
                    "Cats use their whiskers to detect if they can fit through a space.",
                    "A cat's whiskers are the exact width of their body."];
    
    var fakta = $('<p>' + faktat[Math.floor(Math.random() * faktat.length)] + '</p>');
    $('#faktadiv').html(fakta);
    
}

$("#faktanappi").on("click", function() {
    getFakta();
    
});

$(document).ready(function() {
    var xml = $.get("https://cat-fact.herokuapp.com/facts");
    console.log(xml);
    
    var kuvat = ['https://images.pexels.com/photos/156934/pexels-photo-156934.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                'https://images.pexels.com/photos/479009/pexels-photo-479009.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
                'https://images.pexels.com/photos/774731/pexels-photo-774731.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'];

    $('<img src="' + kuvat[Math.floor(Math.random() * kuvat.length)] + '">').appendTo('#kuvat');
});






