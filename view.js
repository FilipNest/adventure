//Load map
    
var map = L.mapbox.map('map', 'filipnest.ga46fcfi')
    .setView([51.53333600874287, -0.1788496971130371 ], 17);

$(document).ready(function(){

//Prevent default button action
    
$("body").on("click", "button", function(){
event.preventDefault(); 
});
    
//Toggle point creation
    
$("body").on("click", "#makepoint", function(){
    if($("#makepoint").hasClass("on")){
        $("#makepoint").attr("class","off");
    }
    else{
    $("#makepoint").attr("class","on");
    }
});

//Toggle new quest form
    
$("body").on("click", "#makequest", function(){
$(this).remove();
$("#forms").html("<form id='newquest'></form>");
$("#newquest").append("<h2>Make an adventure!</h2>");
$("#newquest").append("<label for='name'>Name</label><input name='name' /><br />");
$("#newquest").append("<label for='description'>Description</label><textarea name='description'></textarea><br />");
$("#newquest").append("<input type='submit' value='Create'></form>");
});
    
//Submit new quest form
    
$("#forms").on("submit", "#newquest", function( event ) {
event.preventDefault();
var name = $("#newquest input[name=name]").val();
var desc = $("#newquest textarea[name=description]").val();
A.Quest.create(name,desc);
$("#forms").html(" ");
//Show make point toggle
$("header").append('<button id="makepoint">Make a point</button>');
$("#makepoint").attr("class","off");
});
    
//Create a point form
    
map.on('click', function(e) {
if(W.Q && $("#makepoint").hasClass("on")){
$("#makepoint").attr("class","off");
var lat = e.latlng.lat;
var lng = e.latlng.lng;
    
//Remove previous temporary marker if exists
if(map.tempmarker){
map.removeLayer(map.tempmarker);
}
//Add temporary map marker
var latlng = L.latLng(lat, lng);
map.tempmarker = L.marker(latlng);
map.addLayer(map.tempmarker);

$("#forms").html("<form id='newpoint'></form>");
$("#newpoint").append("<input name='lat' value='"+lat+"'/>");
$("#newpoint").append("<input name='lng' value='"+lng+"'/>");
$("#newpoint").append("<h2>Make a new point</h2>");
$("#newpoint").append("<label for='name'>Name</label><input name='name' /><br />");
$("#newpoint").append("<label for='description'>Description</label><textarea name='description'></textarea><br />");
$("#newpoint").append("<button id='addquestion'>Add question</button>");
$("#newpoint").append("<form id='questions'></form>");
$("#newpoint").append("<input type='submit' value='Create'></form>");
}
});
    
//Add question to point form
    
$("body").on("click","#addquestion",function(){
 
$("#questions").append("<form class='question'></form>");
var form = $("#questions").find(".question");
var last = $(form[form.length-1]);
last.append("<input name='title'/>");
last.append("<input name='response'/>");
last.append("<button>Remove</button>");
});
    
//Submit new point form
    
$("#forms").on("submit", "#newpoint", function( event ) {
//Stop submit
    
event.preventDefault();
    
//Get basic information and create point in quest

var name = $("#newpoint input[name=name]").val();
var desc = $("#newpoint textarea[name=description]").val();
var lat = $("#newpoint input[name=lat]").val();
var lng = $("#newpoint input[name=lng]").val();
    
A.Quest.newpoint(name,desc,lat,lng);
var point = W.Q.points[W.Q.points.length-1];

//Get list of questions and results

var questions = $("#newpoint").find("#questions").find("form");
var options = [];
var i;
for (i=0; i<questions.length; i+=1){
var loopquestion = $(questions[i]).serializeArray();
var title = loopquestion[0].value;
var response = loopquestion[1].value;
options.push({option:title,result:response})
}

//Add list of options to point

point.options.push(A.MakeChoice(options));

$("#forms").html(" ");
    
//Remove temporary marker
    
map.removeLayer(map.tempmarker);

//Add real marker

var latlng = L.latLng(lat, lng);
var marker = L.marker(latlng);
map.addLayer(marker);

//Add point to marker object
    
marker.point = point;

//Add select event
    
marker.on('click', function(e) {
   
console.log(this.point.name);
    
});
    
});
    

// Show question list

function ask(quest,question){

var list = W.quest.questions[question].show(),
    i;
$("#questions").append("<h2>"+list.intro+"<h2/><ul>");
for(i=0; i<list.choices.length; i+=1){

    $("#questions").append("<li class='" + quest + " " + question +"'>"+list.choices[i]+"</li>");

}
    
    $("#questions").append("</ul>");
    
};

//Trigger answer on click


$("body").on("click","li", function(){
var selected =  $(this).index("li");
var classes = $(this).attr("class").split(" ");
var quest = classes[0];
var question = classes[1];
$("#answer").append(W.quest.questions[question].choices[selected].choose());
$("#questions").html(" ");
}); 
    
});