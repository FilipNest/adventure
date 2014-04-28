/*global A,console*/

//Create a basic world. Player has ten health and a size 10 rucksack with nothing in it to start.
var world = Object.create(A.world);
world.attributes.red = "health";
world.player.attributes.red = 10;
world.player.attributes.blue = 6;
world.player.inventory = Object.create(A.container);
world.player.inventory.name = "rucksack";
world.player.inventory.size = 5;
world.player.inventory.contents = [];

//Create a place on the map

world.places.push(Object.create(A.place, {
    admin_name: {
        value: "Start"
    }
}));

//Create a treasure chest and put it in that place

world.findplace("Start").container = Object.create(A.container, {
    name: {
        value: "chest"
    },
    size: {
        value: 10
    },
    contents: {
        value: []
    }
});

//Create an amulet object

world.amulet = Object.create(A.item);
world.amulet.name = "Amulet";
world.amulet.size = 5;

//Create a donkey object

world.donkey = Object.create(A.item);
world.donkey.name = "Donkey";
world.donkey.size = 100;

//Put the amulet in the treasure chest

world.findplace("Start").container.receive(world.amulet);

//Give the player the amulet

world.findplace("Start").container.give(world.amulet, world.player.inventory);

//Check if the player has the amulet

console.log(world.player.inventory.checkitem(world.amulet));

//Create a game condition for checking if the player has 10 health

world.condition = Object.create(A.condition, {attributes : {value: {min : {}, max : {}}}});
world.condition.attributes.red = {min : 9};
world.condition.attributes.blue = {max : 10};
world.condition.item = {yes : world.amulet, no : world.donkey};

//Test if condition passes

console.log(world.condition.check(world.player));