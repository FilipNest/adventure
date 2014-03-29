//World wrapper

W = {};

//Engine wrapper

A = {}

A.Container = {
    //Shortcut function for creating a new container. Takes a name string, a size number and an array of objects [{name:name, size:size},etc]
    create: function (name, size, contents) {
        if (!contents) {
            contents = [];
        }
        return Object.create(this, {size: {value : size}, name: {value: name}, contents: {value : contents}});
    },
    name: null,
    size: null,
    contents: [],
    space : function () {
        var i,
            total = 0;
        for (i = 0; i < this.contents.length; i += 1) {
            total += this.contents[i].size;
        }
        return this.size - total;
    },
    //Receive takes an item object {name:string, size:number}
    receive : function (item) {
        if (this.hasOwnProperty("contents")) {
            if (this.space() >= item.size) {
                this.contents.push(item);
                return "received";
            } else {
                return "Not enough space in " + this.name;
            }
        }
    },
    //Checks if an item name (string) is in the container and returns its index in the contents array if it is.
    checkitem : function (itemname) {
        if (this.hasOwnProperty("contents")) {
            var i;
            for (i = 0; i < this.contents.length; i += 1) {
                if (this.contents[i].name === itemname) {
                    return i;
                }
            }
        }
    },
    //Take an item name (string), check if it's in the current container and, if yes, move it to the container of the second argument
    give : function (itemname, container) {
        var item;
        //Check if item present
        if (this.contents[this.checkitem(itemname)]) {
            item = this.contents[this.checkitem(itemname)];
            //Check if container has enough space
            if (container.space() < item.size) {
                return "Not enough space in " + container.name;
            }
            //Remove item from current container
            this.contents.splice(item);
            container.receive(item);
            return "Given";
        }
    }
};

//Create a quest type

A.Quest = {
    name: null,
    description: null,
    points: [],
    create: function(name,description){
        W.Q = Object.create(this);
        W.Q.name = name;
        W.Q.description = description;
        W.Q.player = Object.create(A.Character);
        W.Q.points = [];
        },
    newpoint: function(name,description,options){
        var point = Object.create(A.Point);
        point.name = name;
        point.description = description;
        point.options = [];
        W.Q.points.push(point);
    }
}

//Create a questpoint type

A.Point = {
    name: null,
    description: null,
    pos: {lat: null, lng: null, alt: null},
    options: []
}

//Create a character type

A.Character = {
    name: null,
    pos: {lat: null, lng: null, alt: null},
    //Values
    red: null,
    orange: null,
    yellow: null,
    green: null,
    blue: null,
    indigo: null,
    violet: null,
    //Makes an inventory container for the character
    inventory: A.Container.create("inventory", 5)
}


//A function that creates choice groups for dialogue and other options that takes an array of choice objects with the paramaters "condition", "option" and "result". Condition is when this option is available within this choice group, option is the words of the option and result is a function that happens if this option is selected. Also takes an optional  intro which is the string that is displayed before the choices.

A.MakeChoice = function(choices){
    var i=0,
        ChoiceGroup = [];
    for(i=0; i<choices.length; i += 1){
    ChoiceGroup[i] = {
    condition:choices[i].condition,
    option:choices[i].option,
    result:choices[i].result,
    choose: function(){
        return this.result;
    }
    }
        }
    return {
        choices:ChoiceGroup,
        show:function(){
        var i,
            output = [];
        for (i=0; i<this.choices.length; i+=1){
            if(this.choices[i].condition){
             output.push(this.choices[i].option);   
            }
        }
            return {choices:output};
}
}
}