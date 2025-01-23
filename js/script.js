// Info date
const dateNumber = document.getElementById('dateNumber');
const dateText = document.getElementById('dateText');
const dateMonth = document.getElementById('dateMonth');
const dateYear = document.getElementById('dateYear');
//Import sounds
const soundEffect = new Audio('../sounds/sound_check.mp3');
const backgroundSound = document.getElementById('backgroundSound');

//Background Sounds volume
backgroundSound.volume = 0.2;


// Tasks Container
const tasksContainer = document.getElementById('tasksContainer');

const setDate = () => {
    const date = new Date();
    dateNumber.textContent = date.toLocaleString('es', { day: 'numeric' });
    dateText.textContent = date.toLocaleString('es', { weekday: 'long' });
    dateMonth.textContent = date.toLocaleString('es', { month: 'short' });
    dateYear.textContent = date.toLocaleString('es', { year: 'numeric' });
};

const clock = document.getElementById('clock');
//update clock
const updateClock = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    clock.textContent = `${hours}:${minutes}:${seconds}`;
};
//add tasks
const addNewTask = event => {
    event.preventDefault();
    const { value } = event.target.taskText;
    if(!value) return;
    const task = document.createElement('div');
    task.classList.add('task', 'roundBorder');
    task.addEventListener('click', changeTaskState)
    task.textContent = value;
    tasksContainer.prepend(task);
    event.target.reset();
};
//completed task
const changeTaskState = event => {
    const task = event.target;
    task.classList.add('done');
    task.classList.add('fade-out');
    soundEffect.play();
    task.addEventListener('animationend', () => {
        task.remove();
    });
};

const renderOrderedTasks = () => {
    order().forEach(el => tasksContainer.appendChild(el))
}

setInterval(updateClock, 1000); // Update every second
setDate();
updateClock(); // Initialize the watch immediately