let screen = document.getElementById('screen');
buttons = document.querySelectorAll('button');
let final_ans = "HANGMAN";
let wrong_guesses = 6;

let jsondata = "";
let apiUrl = "https://random-word-api.herokuapp.com/word"

async function getJson(url) {
    let response = await fetch(url);
    let data = await response.json()
    return data;
}

async function getData() { 
jsondata = getJson(apiUrl)

    return jsondata;
}

final_ans = getData()
console.log(final_ans);


output_tries = `you have ${wrong_guesses} guesses left`;
document.getElementById("guesses").innerHTML = output_tries;

let length = final_ans.length;

let final_ans_button = ''; 

for (let i = 0; i < length; i++){
    btn_id = "btn_"+i;
    word_html = `<button id = ${btn_id}>_</button>`;
    final_ans_button += word_html;
}

document.getElementById('final_ans').innerHTML = final_ans_button;  
document.getElementById('final_ans').disabled = true;

function check_word(buttonText){
    for (let i = 0; i < length; i++){
        if (buttonText == final_ans[i]){
            document.getElementById('btn_'+i).innerHTML = final_ans[i];
        }
    }
}

function reset_word(){
    for (let i = 0; i < length; i++){
        document.getElementById('btn_'+i).innerHTML = "_";
    }
}

for(item of buttons){
    item.addEventListener('click', (e)=>{
        buttonText = e.target.innerText;

        if (buttonText != "RETRY"){
            if (final_ans.includes(buttonText)){
                console.log("yes");
                document.getElementById(buttonText).disabled = true;
                check_word(buttonText);
            }
            else if (buttonText == "HINT"){
                console.log("It is the name of the game")
            }
            else {
                console.log("nope");
                wrong_guesses -= 1;
                output_tries = `you have ${wrong_guesses} guesses left`;
                document.getElementById("guesses").innerHTML = output_tries;
            }

            if (wrong_guesses == 0){
                document.getElementById("game_over").innerHTML = "Game Over";
                const buttons = document.getElementsByTagName("button");
                for (const button of buttons) {
                    button.disabled = true;
                }
                document.getElementById("retry").disabled = false;
            }
        }

        else {
            wrong_guesses = 6;
            const buttons = document.getElementsByTagName("button");
            for (const button of buttons) {
                button.disabled = false;
            }
            document.getElementById("game_over").innerHTML = "";
            output_tries = `you have ${wrong_guesses} guesses left`;
            document.getElementById("guesses").innerHTML = output_tries;
            reset_word();
        }
    })
}