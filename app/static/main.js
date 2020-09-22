console.log("This is main.js attached succesfully!")


function edit(d) {
    console.log(d)
    document.getElementById(`taskDisplay${d}`).style.display = 'none'
    document.getElementById(`edit${d}`).style.display = 'none'
    document.getElementById(`editInput${d}`).style.display = 'block'
    document.getElementById(`editInput${d}`).focus()
    document.getElementById(`doneBtn${d}`).style.display = "inline-block"
}

function doneEdit(d) {
    let newTask = document.getElementById(`editInput${d}`)
    let taskDisplay = document.getElementById(`taskDisplay${d}`)
    let url = `http://127.0.0.1:8000/viewset/task/${d}/`
    fetch(url, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "id": d,
                "task": newTask.value,
                "completed": false
            })
        })
        .then(res => {

            console.log(res.status)
            if (res.status == 200) {
                taskDisplay.innerHTML = newTask.value
                taskDisplay.style.display = ''
                document.getElementById(`edit${d}`).style.display = ''
                document.getElementById(`editInput${d}`).style.display = 'none'
                document.getElementById(`doneBtn${d}`).style.display = "none"
            }
        })
        .then(function(data) {
            console.log('Request succeeded with JSON response', data);
        })
        .catch(function(error) {
            console.log('Request failed', error);
        });
}

function deleteTask(d) {
    let url = `http://127.0.0.1:8000/viewset/task/${d}/`
    fetch(url, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json"
            }

        })
        .then(res => {

            console.log(res.status)
            if (res.status == 204) {
                console.log('succesfully deleted a task')
                document.getElementById(`container${d}`).style.display = "none"
            }
        })
        .then(function(data) {
            console.log('Request succeeded with JSON response', data);
        })
        .catch(function(error) {
            console.log('Request failed', error);
        });


}

function completed(d) {
    console.log('completed Clicked')
    let taskDisplay = document.getElementById(`taskDisplay${d}`)
    taskDisplay.style.textDecoration = 'line-through'
    let url = `http://127.0.0.1:8000/viewset/task/${d}/`
    fetch(url, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "id": d,
                "task": taskDisplay.innerHTML,
                "completed": true
            })
        })
        .then(res => {

            console.log(res.status)
            if (res.status == 200) {


                document.getElementById(`doneBtn${d}`).style.display = "none"
                document.getElementById(`edit${d}`).style.display = "none"
                document.getElementById(`completedBtn${d}`).style.display = "none"
                document.getElementById(`deleteBtn${d}`).style.display = "none"
                document.getElementById(`undoBtn${d}`).style.display = ""
            }
        })
        .then(function(data) {
            console.log('Request succeeded with JSON response', data);
        })
        .catch(function(error) {
            console.log('Request failed', error);
        });
}

function undo(d) {

    let taskDisplay = document.getElementById(`taskDisplay${d}`)
    taskDisplay.style.textDecoration = 'none'
    let url = `http://127.0.0.1:8000/viewset/task/${d}/`
    fetch(url, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "id": d,
                "task": taskDisplay.innerHTML,
                "completed": false
            })
        })
        .then(res => {

            console.log(res.status)
            if (res.status == 200) {


                document.getElementById(`doneBtn${d}`).style.display = "none"
                document.getElementById(`edit${d}`).style.display = ""
                document.getElementById(`completedBtn${d}`).style.display = ""
                document.getElementById(`deleteBtn${d}`).style.display = ""
                document.getElementById(`undoBtn${d}`).style.display = "none"
            }
        })
        .then(function(data) {
            console.log('Request succeeded with JSON response', data);
        })
        .catch(function(error) {
            console.log('Request failed', error);
        });
}