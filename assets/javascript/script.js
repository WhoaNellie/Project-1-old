$(document).ready(function () {

    // checking for values in local storage and initializing if none
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
    }

    let stateArr;
    if(localStorage.getItem("states")){
        stateArr = JSON.parse(localStorage.getItem("states"));
        console.log(stateArr);
        console.log("states in storage");
    }else{
        stateArr = [];
    }

    //populates previously made cards
    if(stateArr.length > 0){
        for(let i = 1; i < stateArr.length + 1;i++){
            genCards(stateArr[i], i);
        }
    }

    // adding event listener to button to make new kanban card
    $(document).on("click", ".newCard", function(){
        genCards($(this).attr("data-state"), cardNum);
        cardNum++;
        localStorage.setItem("cardNum", cardNum);
    });

    // event listener for changes in card text
    $(document).on("blur",".task", saveTask);

        //enter causes blur
        $(document).on("keypress", ".task", function(event){
            if(event.which == 13){
                $(this).blur();
            }
        })

    // event listener for changes in card state
    $(document).on("click", ".state", saveState);

    function genCards(cardState, num) {
        
        // adding class for styling
        let card = $("<div>").attr({
            class: "card",
            "data-id" : cardNum
        });

        //input for adding text to note, data attr for local storage
        let input = $("<input>").attr({
            type: "text",
            class : "task",
            "data-id": cardNum
        });;

        if(taskArr[num]){
            input.val(taskArr[num]);
        }

        // making radio buttons for task state
            // !!! radio buttons not linking to specific card?

        let toDo;
        let toDoLabel;

        let inProg;
        let inProgLabel;

        let done;
        let doneLabel;

        let radioDiv = $("<div>");

        if(cardState == "toDo"){

            inProg = $("<input>").attr({
                type: "radio",
                name: "progress",
                value: "inProg",
                class : "state",
                id: "inProg" + cardNum
            });
    
                inProgLabel = $("<label>").attr({
                    for: "inProg" + cardNum,
                    "data-value" : "inProg"
                });
                inProgLabel.text("In Progress");

            radioDiv.append(inProg);
            radioDiv.append(inProgLabel);

            done = $("<input>").attr({
                type: "radio",
                name: "progress",
                value: "done",
                class : "state",
                id : "done" + cardNum
            });
    
                doneLabel = $("<label>").attr({
                    for: "done" + cardNum,
                    "data-value" : "done"
                });
                doneLabel.text("Done");

            radioDiv.append(done);
            radioDiv.append(doneLabel);

            $(".toDo").append(card);

        }else if(cardState == "inProg"){
            toDo = $("<input>").attr({
                type: "radio",
                name: "progress",
                value: "toDo",
                class : "state",
                id : "toDo" + cardNum
            });
    
                toDoLabel = $("<label>").attr({
                    for: "toDo" + cardNum,
                    "data-value" : "toDo"
                });
                toDoLabel.text("To Do");   

            radioDiv.append(toDo);
            radioDiv.append(toDoLabel); 

            done = $("<input>").attr({
                type: "radio",
                name: "progress",
                value: "done",
                class : "state",
                id : "done" + cardNum
            });
    
                doneLabel = $("<label>").attr({
                    for: "done" + cardNum,
                    "data-value" : "done"
                });
                doneLabel.text("Done");

            radioDiv.append(done);
            radioDiv.append(doneLabel);

            $(".inProg").append(card);

        }else if(cardState == "done"){
            toDo = $("<input>").attr({
                type: "radio",
                name: "progress",
                value: "toDo",
                class : "state",
                id : "toDo" + cardNum
            });
    
                toDoLabel = $("<label>").attr({
                    for: "toDo" + cardNum,
                    "data-value" : "toDo"
                });
                toDoLabel.text("To Do");
            
            radioDiv.append(toDo);
            radioDiv.append(toDoLabel);
    

            inProg = $("<input>").attr({
                type: "radio",
                name: "progress",
                value: "inProg",
                class : "state",
                id: "inProg" + cardNum
            });
    
                inProgLabel = $("<label>").attr({
                    for: "inProg" + cardNum,
                    "data-value" : "inProg"
                });
                inProgLabel.text("In Progress");

            radioDiv.append(inProg);
            radioDiv.append(inProgLabel);

            $(".done").append(card);
        }else{
            console.log("whoops");
        }

        // div to add radio buttons for organization


        card.append(radioDiv);
        card.append(input);
        

    }


    function saveTask(){
        console.log("save task");
        console.log($(this).val());
        console.log($(this).attr("data-id"));

        // pushing a new index/value if this is a new card, else updating the old card's value
        if(taskArr[$(this).attr("data-id")]){
            taskArr[$(this).attr("data-id")] = $(this).val();
        }else{
            taskArr.push($(this).val());
        }

        localStorage.setItem("tasks", JSON.stringify(taskArr));

    }

    function saveState(){
        console.log("save state");
        console.log($(this).prop("nodeName"));
        console.log($(this).parent().parent().attr("data-id"));

        $(this).parent().parent().attr("state", $(this).attr("value"));

        if(stateArr[$(this).parent().parent().attr("data-id")]){
            stateArr[$(this).parent().parent().attr("data-id")] = $(this).attr("value");
        }else{
            stateArr.push($(this).attr("value"));
        }

        // convert JSON to jquery? might cause problems at some point. getJSON()
        localStorage.setItem("states", JSON.stringify(stateArr));
    }

    //add a way to delete cards

});