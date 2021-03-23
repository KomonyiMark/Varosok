$(function () {

    $("#vnev").on("keyup", beolvas);
    $("article").delegate("th", "click", rendezes);
    $("article").delegate("th","mouseenter",rarak);
    $("article").delegate("th","mouseleave",levesz);
});
var varosok = [];
function rarak(){
    $(this).addClass("fejlec");
}
function levesz(){
     $(this).removeClass("fejlec");
}
function beolvas() {

    console.log($("#vnev").val());
    $.ajax({
        type: "GET",
        url: "feldolgoz.php?nev=" + $("#vnev").val(),
        success: function (result) {
            //   console.log(result); /*JSONn formátumban várjuk az AB eredményeit*/
            varosok = JSON.parse(result);
            console.log(varosok); /*JSONn formátumban várjuk az AB eredményeit*/
            kiir();
        },
        error: function () {
            alert("Hiba az adatok betöltésekor!");
        }
    });
}
function kiir() {
    var txt = "<table><tr><th nev='nev'>Városnév</th><th jar='jar'>Járás</th><th megy='megy'>Megye</th><th id='torol'>Torol</th></tr>";
    for (var i = 0; i < varosok.length; i++) {
        txt += "<tr><td>" + varosok[i].nev + "</td><td>" + varosok[i].jaras + "</td><td>" + varosok[i].megye + "</td><td><button id='torol'>Töröl</button></td></tr>";


    }
    txt += "</table>";
    $("article").html(txt);


    txt = "<select>";
    for (var i = 0; i < varosok.length; i++) {
        txt += "<option>" + varosok[i].nev + "</option>";
    }
    txt += "<select>";
    $(".legordulo").html(txt);
}
var irany = false;
function rendezes() {
//    if (ez === "nev") {
////        varosok.sort(function (a, b) {
////        if(irany){
////        return Number(a[ez] > b[ez])-0.5;
////    }
////        else{
////          return Number(a[ez] < b[ez])-0.5;  
////        }
////    });
//        varosok.sort(function (a, b) {
//            if (irany) {
//                return Number(a[ez]) - Number(b[ez]);
//            } else {
//                return Number(b[ez]) - Number(a[ez]);
//            }
//        });
//    }
    var ez = $(this).attr("id");
    console.log($(this).attr("id"));

//    varosok.sort(function (a, b) {
//        if(irany){
//        return Number(a[ez])- Number(b[ez]);
//    }
//        else{
//           return Number(b[ez])- Number(a[ez]);
//        }
//    });
    varosok.sort(function (a, b) {
        if (irany) {
            return Number(a[ez] > b[ez]) - 0.5;
        } else {
            return Number(a[ez] < b[ez]) - 0.5;
        }
    });
    irany = !irany;
    kiir();
}