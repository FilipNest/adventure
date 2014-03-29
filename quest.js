Quest.create("Hello","A development adventure");

//Example choice display

world.quest.questions[0] = MakeChoice([
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

world.quest.questions[0].show();

//To pick answer 2 use

world.quest.questions[0].choices[1].choose();


//Create the player with some settings

world.quest.player = Object.create(Character);
world.quest.player.name = "Player";

//Create a test box and some items to play with
world.quest.box = Container.create("box", 5);
world.quest.amulet = {name:"amulet",size:2};
world.quest.torch = {name:"torch",size:2};
world.quest.theremin = {name:"theremin", size:4};
//Some examples:
world.quest.player.inventory.receive(world.quest.amulet);
world.quest.player.inventory.give("amulet",world.quest.box);
//The box should now have the amulet. Check this as follows.
world.quest.box.checkitem("amulet");
//Checks if the box has the amulet and returns the position of the amulet in the box's contents array.