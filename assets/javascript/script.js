$(document).ready(function () {

    // pull cardnum from local storage
    // keeping track of the number of kanban cards
    let cardNum;
    if(localStorage.getItem("cardNum")){
        cardNum = localStorage.getItem("cardNum");
        console.log("nums in storage");
    }else{
        cardNum = 0;
    }

    let taskArr;
    if(localStorage.getItem("tasks")){
        taskArr = JSON.parse(localStorage.getItem("tasks"));
        console.log(taskArr);
        console.log("tasks in storage");
    }else{
        taskArr = [];
        console.l
    }

    // adding event listener to button to make new kanban card
    $("#newCard").on("click", genCards);

    // event listener for changes in card text
    $(document).on("blur",".task", saveTask);

    // event listener for changes in card state
    $(document).on("click", ".state", saveState)

    function genCards(cardObj) {
        cardNum++;
        // adding class for styling
        let card = $("<div>").attr({
            class: "card",
            "data-id" : cardNum
        });

        //input for adding text to note, data attr for local storage
        // make enter when focused blur
        let input = $("<input>").attr({
            type: "text",
            class : "task",
            "data-id": cardNum
        });

        // making radio buttons for task state

        // div to add radio buttons for organization
        let radioDiv = $("<div>");

        let toDo = $("<input>").attr({
            type: "radio",
            name: "progress",
            value: "toDo",
            class : "state",
            "data-id": "toDo" + cardNum
        });

        // adding labels to buttons
            // need to link labels to radio buttons using IDs, find way to integrate with giphy call by ID
        let toDoLabel = $("<label>").attr({
            for: "toDo" + cardNum,
            class : "state"
        })
        toDoLabel.text("To Do");

        let inProg = $("<input>").attr({
            type: "radio",
            name: "progress",
            value: "inProg",
            class : "state",
            "data-id": "inProg" + cardNum
        });

        let inProgLabel = $("<label>").attr({
            for: "toDo" + cardNum,
            class : "state"
        })
        inProgLabel.text("In Progress");

        let done = $("<input>").attr({
            type: "radio",
            name: "progress",
            value: "done",
            class : "state",
            "data-id": "done" + cardNum
        });

        let doneLabel = $("<label>").attr({
            for: "done" + cardNum,
            class : "state"
        });
        doneLabel.text("Done");

        // appending everything

        card.append(radioDiv);
        card.append(input);

        radioDiv.append(toDo);
        radioDiv.append(toDoLabel);
        radioDiv.append(inProg);
        radioDiv.append(inProgLabel);
        radioDiv.append(done);
        radioDiv.append(doneLabel);

        $("#cards").append(card);

        
        localStorage.setItem("cardNum", cardNum);

    }


    // add event listener for enter

    // add stuff to local storage
    // array of cards with text and progress saved


    // deleted old array items when new item added
    function saveTask(){
        console.log("save task");
        console.log($(this).val());
        console.log($(this).attr("data-id"));

        // pushing a new index/value if this is a new card, else updating the old card's value
        if($(this).attr("data-id") == cardNum){
            taskArr.push($(this).val());
        }else{
            taskArr[$(this).attr("data-id")] = $(this).val();
        }

        

        localStorage.setItem("tasks", JSON.stringify(taskArr));

    }

    function saveState(){
        console.log("save state");
        console.log($(this).attr("value"));
    }

});