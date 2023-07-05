let currentScore = 0;
let currentUserName = "";

const start = document.getElementById("startbutton");
const username = document.getElementById("username");
const timeLeft = document.getElementById("timeleft");
const bestResult = document.getElementById("bestresultbutton");
const clickButton = document.getElementById("mainbutton");
const scoreSection = document.getElementById("scoresection");
const theBestResult = document.getElementById("thebestresultbutton");
const clearBestResult = document.getElementById("clearbestresbutton");
const clearTheBestResult = document.getElementById("clearthebestresbutton");

const startTimer = () =>
{
    let seconds = 0;
    const endTime = 5;

    const timerId = setInterval(() => timeLeft.innerHTML = `<p>Time left: ${endTime - (++seconds)} seconds</p>`, 1000);

    setTimeout(() => 
    {
        clearInterval(timerId);
        clickButton.classList.add("deactivatebutton");
            
            alert(`Player \"${currentUserName}\" has scored: ${currentScore} points!`);

            if(currentScore > sessionStorage.score || sessionStorage.score == null) 
            {
                sessionStorage.score = currentScore;
                sessionStorage.userName = JSON.stringify({name: currentUserName});

                if(currentScore > localStorage.score || localStorage.score == null)
                {
                    localStorage.score = currentScore;
                    localStorage.userName = JSON.stringify({name: currentUserName});
                }
            }

            scoreSection.innerHTML = "";
            timeLeft.innerHTML = "";
            currentScore = 0;
    }, 5000);
}

const getNickname = () =>
{
    try
    {
        if(username.value === "Enter nickname here!") throw "Invalid nickname!";
        else if(username.value === "") throw "Empty nickname!";
        else if (username.value.length < 3) throw "Too short nickname!"

        currentUserName = username.value;

        clickButton.classList.remove("deactivatebutton");

        startTimer();
    }
    catch(exception)
    {
        alert(exception);
        if(!clickButton.classList.contains("deactivatebutton")) clickButton.classList.add(".deactivatebutton");
    }
}
const getBestScore = () => 
{
    try
    {
        if(sessionStorage.score == null) throw "No saved data data!";
        else alert(`Best result is ${sessionStorage.score}, it belongs to \"${JSON.parse(sessionStorage.userName).name}\"`);
    }
    catch(exception)
    {
        alert(exception);
    }
}
const getTheBestScore = () => 
{
    try
    {
        if(localStorage.score == null) throw "No saved data!";
        else alert(`The Best result is ${localStorage.score}, it belongs to \"${JSON.parse(localStorage.userName).name}\"`);
    }
    catch(exception)
    {
        alert(exception);
    }
}
const clearBestScore = () =>
{
    delete sessionStorage.score;
    delete sessionStorage.userName;

    alert("Best score was erased!");
}
const clearheBestScore = () =>
{
    delete localStorage.score;
    delete localStorage.userName;

    alert("The Best score was erased!");
}
const getPoints = () => 
{
    ++currentScore;
    scoreSection.innerHTML = `<p>Score: ${currentScore} points</p>`;
}

start.addEventListener("click", getNickname);
clickButton.addEventListener("click", getPoints);
bestResult.addEventListener("click", getBestScore);
theBestResult.addEventListener("click", getTheBestScore);
clearBestResult.addEventListener("click", clearBestScore);
clearTheBestResult.addEventListener("click", clearheBestScore);