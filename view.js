$(document).ready(function(){

//Toggle new quest form
    
$("body").on("click", "#makequest", function(){
$(this).hide();
$("#newquest").show();
    
});

//Submit new quest form
    
$( "#newquest" ).submit(function( event ) {
event.preventDefault();
var name = $("#newquest input[name=name]").val();
var desc = $("#newquest textarea[name=description]").val();
A.Quest.create(name,desc);
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