// Luodaan tapahtumateksti, joka antaa ilmoituksen ohjelman toiminnoista
var tapahtumaTeksti = $('<p></p>');
var tapahtumaTeksti_paikka = $('p');

// Luetaan käyttäjän syötöt ja tallennetaan ne taulukkoon / localstorageen
function lisaaTeht() {
    var syotto = $('#input').val();
    var listaTaulukko = lataaLista(); // Tuodaan lataaLista-funktiosta taulukon arvot
    $(tapahtumaTeksti).appendTo(tapahtumaTeksti_paikka[0]);

    if(syotto.length > 0) {
        listaTaulukko.push(syotto); // Tallennetaan käyttäjän syöttämät arvot taulukkoon
        localStorage.setItem('listaJasen', JSON.stringify(listaTaulukko)); // Tallennetaan taulukon sisältö localstorageen string-muodossa

        // Päivitetään tapahtumateksti syötön oikeellisuuden perusteella
        $(tapahtumaTeksti).css("color", "green");
        $(tapahtumaTeksti).html("Tehtävä lisätty onnistuneesti.");
        $('#input').css("border", "1px solid black");

        luoLista(); // Kutsutaan funktiota, joka tuo listan ruudulle
    } else {
        $('#input').css("border", "1px solid red");
        $(tapahtumaTeksti).css("color", "red");
        $(tapahtumaTeksti).html("Ethän jätä kenttää tyhjäksi.");
        return false;
    }
}

//Poistetaan listan jäsen, kun sen vieressä olevaa nappia painetaan
function poistaTeht() {
    var tehtID = $(this).attr('id'); // Haetaan kyseisen listan jäsenen/poista-napin id
    var listaTaulukko = lataaLista();

    listaTaulukko.splice(tehtID, 1); // Poistetaan listan jäsen taulukosta/listasta id:n perusteella
    localStorage.setItem('listaJasen', JSON.stringify(listaTaulukko)); // ja päivitetään localstorage
    luoLista();
}

// Tyhjennetään koko lista kerrallaan
function tyhjennaLista() {
    var listaTaulukko = lataaLista();
    $(tapahtumaTeksti).appendTo(tapahtumaTeksti_paikka[0]);

    // Tarkistetaan onko lista jo tyhjä vai ei 
    if (listaTaulukko.length > 0) {
        localStorage.clear();
        $(tapahtumaTeksti).css("color", "green");
        $(tapahtumaTeksti).html("Lista tyhjennetty!");
        luoLista();
    } else {
        $(tapahtumaTeksti).css("color", "red");
        $(tapahtumaTeksti).html("Lista on jo tyhjä.");
    }
}

// Tuodaan lista näkyviin ruudulle
function luoLista() {
    var listaTaulukko = lataaLista();
    var listaTeksti = "";

    // Luodaan listan jäsenet for-silmukalla ja luodaan jokaiselle poista-napille oma id
    for (var i = 0; i < listaTaulukko.length; i++) {
        listaTeksti += "<li><input type='checkbox' id='cbox_" + i + "' class='cbox'><label>" + listaTaulukko[i] + "</label><input type='button' id='" + i + "' class='poistoNappi' value='Poista'></li>";
    }

    $('#toDoLista').html(listaTeksti); // Sijoitetaan listan jäsenet html-listaan

    // Luodaan jokaiselle poista-napille oma tapahtumakuuntelija, joka kutsuu poistamisfunktiota
    var poistoNapit = $('.poistoNappi');
    for (var i = 0; i < poistoNapit.length; i++) {
        $(poistoNapit[i]).on("click", function() {
            poistaTeht();
        });
    }
}

// Näytetään listassa jo olevat, tallennetut tehtävät napin painalluksella
function naytaLista() {
    $('#toDoLista').fadeIn();
    var listaTaulukko = lataaLista();
    $(tapahtumaTeksti).appendTo(tapahtumaTeksti_paikka[0]);

    if (listaTaulukko.length == 0) {
        $(tapahtumaTeksti).css("color", "red");
        $(tapahtumaTeksti).html("Lista on tyhjä.");
    } else {
        luoLista();
    }
}

// Ladataan localstoragesta arvot ja tallennetaan taulukkoon
function lataaLista() {
    var listaTaulukko = []; // Luodaan taulukko, johon arvot tallennetaan
    var haetutTeht = localStorage.getItem('listaJasen'); // Haetaan tallennettuja arvoja localstoragesta

    // Tarkistetaan onko localstoragessa mitään, jos on tallennetaan siellä olevat arvot taulukkoon
    if (haetutTeht == null) {
        console.log("Mitään ei ole tallennettu.");
    } else {
        listaTaulukko = JSON.parse(haetutTeht);
    }
    
    return listaTaulukko; // Palautetaan taulukko muiden funktioiden käytettäväksi
}

// Piilotetaan lista napin painalluksella
function piilotaLista() {
    var listaTaulukko = lataaLista();

    if (listaTaulukko.length > 0) {
        $('#toDoLista').fadeOut(); // JQuery animaatio piilottaa listan, jos se ei ole tyhjä
        $(tapahtumaTeksti).css("color", "green");
        $(tapahtumaTeksti).html("Lista piilotettu.");
    } else {
        $(tapahtumaTeksti).css("color", "red");
        $(tapahtumaTeksti).html("Lista on tyhjä.");
    }
}

// Nappien tapahtumakuuntelijat:

$('#lisaaNappi').on("click", function() {
    lisaaTeht();
});

$('#naytaNappi').on("click", function() {
    naytaLista();
});

$('#piilotusNappi').on("click", function() {
    piilotaLista();
});

$('#tyhjennysNappi').on("click", function() {
    tyhjennaLista();
});


