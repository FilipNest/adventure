var quest= {}

//Example choice display

quest.TestQuestion = makechoice([
    {
        condition:1<5,
        option:"Eat a sandwich",
        result:function(){return "Eating"}
    },
    {
        condition:10>5,
        option:"Fly a plane",
        result:function(){return "Flying"}
    }
],"What do you wish to do?");

//To show this choice use

quest.TestQuestion.show();

//To pick answer 2 use

quest.TestQuestion.choices[1].choose();


//Create the player with some settings

quest.player = Object.create(character);
quest.player.name = "Player";
quest.player.maxhealth = 100;
quest.player.health = 100;
quest.player.pos = {x:0,y:0}

//Create a test box and some items to play with
quest.box = container.create("box", 5);
quest.amulet = {name:"amulet",size:2};
quest.torch = {name:"torch",size:2};
quest.theremin = {name:"theremin", size:4};
//Some examples:
quest.inventory.receive(world.amulet);
quest.inventory.give("amulet",world.box);
//The box should now have the amulet. Check this as follows.
quest.box.checkitem("amulet");
//Checks if the box has the amulet and returns the position of the amulet in the box's contents array.