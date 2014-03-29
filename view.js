$(document).ready(function(){

//Prevent default button action
    
$("body").on("click", "button", function(){
event.preventDefault(); 
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
$("#makepoint").show();
});
    
//Create a point form
    
$("body").on("click", "#makepoint", function(){
$("#forms").html("<form id='newpoint'></form>");
$("#newpoint").append("<h2>Make a new point</h2>");
$("#newpoint").append("<label for='name'>Name</label><input name='name' /><br />");
$("#newpoint").append("<label for='description'>Description</label><textarea name='description'></textarea><br />");
$("#newpoint").append("<button id='addquestion'>Add question</button>");
$("#newpoint").append("<form id='questions'></form>");
$("#newpoint").append("<input type='submit' value='Create'></form>");
});
    
//Add question to point form
    
$("body").on("click","#addquestion",function(){
 
$("#questions").append("<form></form>");
var form = $("#questions").last("form");
form.append("<input /><button>Remove</button>");
});
    
//Submit new point form
    
$("#forms").on("submit", "#newpoint", function( event ) {
event.preventDefault();
var name = $("#newpoint input[name=name]").val();
var desc = $("#newpoint textarea[name=description]").val();
A.Quest.newpoint(name,desc);
$("#forms").html(" ");
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