import {EventEmitter} from 'events';

let clientsEvents=new EventEmitter();

let EvDeleteClicked="EvDeleteClicked"; // удаление клиента
let EvEditClicked="EvEditClicked"; // редактирование клиента
let EvSaveClicked="EvSaveClicked"; // сохранились изменения по клиенту
let EvAddClicked="EvAddClicked"; // сохранились изменения по клиенту
let EvCancelClicked="EvCancelClicked"; // кликнули отмену

export {clientsEvents, EvDeleteClicked, EvEditClicked, EvSaveClicked,EvAddClicked,EvCancelClicked};
