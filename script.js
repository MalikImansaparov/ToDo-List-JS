(function () {
    let tasks = {
            current: [{
                taskId: doId(),
                taskContent: "Таsк 1",
                taskState: "current"
            }, {
                taskId: doId(),
                taskContent: "Таsк 2",
                taskState: "current"
            }],
            done: [{
                taskId: doId(),
                taskContent: "Тasк 3",
                taskState: "done"
            }],
            get allTasks() {
                return this.current.length + this.done.length;
            },
            get doneTasks() {
                return this.done.length;
            }
        },
        tasksList = document.getElementById("app__list"),
        allTasks = document.getElementById("js-all-tasks"),
        doneTasks = document.getElementById("js-done-tasks"),
        addNewTaskField = document.getElementById("app__task-new");

    function INIT() {// проходим по массиве current,done и обрабатыват
        for (const item of tasks.current) {
            createItem(item);
        }
        for (const item of tasks.done) {
            createItem(item);
        }
        allTasks.innerHTML = tasks.allTasks;
        doneTasks.innerHTML = tasks.doneTasks;
    }

    function createItem(el) {
        let item = document.createElement('li'),
            remove = document.createElement('div'),
            text = document.createElement('span');
        remove.classList.add('app__list-remove');// задаем стили
        remove.addEventListener('click', function () {
            removeTask(this);
        });
        text.classList.add('app__list-text');
        text.addEventListener('click', function () {
            doneTask(this);
        });
        switch (el.taskState) {
            case 'done':
                item.classList.add('app__list-item', 'app__list-item--done');
                break;
            default:
                item.classList.add('app__list-item');
        }
        //собираем li нов.делу
        item.id = el.taskId;
        text.innerHTML = el.taskContent;
        item.appendChild(text);
        item.appendChild(remove);
        tasksList.appendChild(item);
    }

    function doneTask(el) {
        let elem = el.parentNode,
            elemId = elem.id,
            elemState = elem.classList.contains('app__list-item--done');
//elemState true то выпол 1 если нет 2
        const [itemsRemove, itemsAdd] = elemState ? [tasks.done, tasks.current] : [tasks.current, tasks.done];
        elem.classList.toggle('app__list-item--done');
        for (const [index, item] of itemsRemove.entries()) {
            if (item.taskId !== elemId) continue;
            itemsAdd.push(item);
            itemsRemove.splice(index, 1);
        }
        doneTasks.innerHTML = tasks.doneTasks;
    }

    function removeTask(el) {
        let removeEl = el.parentNode,//записываеться не сам ли а родитель span
            removeElId = removeEl.id,
            removeElState = removeEl.classList.contains('app__list-item--done');

        removeEl.remove();
        const items = removeElState ? tasks.done : tasks.current;
        for (const [index, item] of items.entries()) {//цикл показ именно по каким элем нужно пройтись допю индекс показ
            if (item.taskId !== removeElId) continue;
            items.splice(index, 1);
        }
        allTasks.innerHTML = tasks.allTasks;
        doneTasks.innerHTML = tasks.doneTasks;
    }

    function addTasks(str) {
        let elem = {
            taskId: doId(),
            taskContent: str,
            taskState: "current"
        };
        tasks.current.push(elem);
        createItem(elem);
        allTasks.innerHTML = tasks.allTasks;
    }

    function doId() {
        return Math.random().toString(36).substr(2, 16);
    }

    INIT();

    addNewTaskField.addEventListener('keyup',function (e) {
        if(e.keyCode === 13) {
            addTasks(this.value);
            this.value = "";
        }
    })

})();