import { uuid } from 'core/utils.js';
import * as TasksActions from 'actions/tasks.actions.js';
import { getLocalDate, notifyDay } from 'core/date.utils.js';
import * as ContactsActions from 'actions/contacts.actions.js';

export default class AddTask {

  constructor($state, $ngRedux, $timeout, $scope, toaster) {

    Object.assign(this, { $state, $timeout, $scope, toaster });

    this.unsubscribe = $ngRedux.connect(this.mapStateToThis, Object.assign({}, TasksActions, ContactsActions))(this);

    $scope.$ctrl = this;

    this.getAllPhoneContacts();

    this.countries_text_multiple = 'Добавить контакты, которые необходимо оповестить';
    this.val =  {single: null, multiple: null};
  }

  multiSelectChanged(values) {
    console.log('multiSelectChanged', values.map(v => v.text).join(','));

    this.emails = values.map(v => v.text).join(',');
  }

  mapStateToThis(state) {

    return {
      // TODO rewrite this ...
      contacts: state.contacts.map(s =>s.emails && { id: s.emails[0].id, text: s.emails[0].value }).filter(d => d)
    }
  }

  $onInit() { this.flipInY = true; }

  $onDestroy() {
    this.unsubscribe();
  }

  showWarningToasty(text) {
    this.flipInY = false;
    this.isNotCorrectInput = true;

    this.toaster.pop({
      type: 'warning',
      body: text,
      timeout: 3000
    });

    this.$timeout(() => (this.isNotCorrectInput = false ), 500);
  }

  submitTask() {

    const vm = this;
    const time = new Date(vm.time);

    if (!vm.title || !vm.description) {

      this.showWarningToasty(`Введите ${vm.title ? 'описание' : 'заголовок' } задачи`);

      return;
    }

    if (notifyDay(new Date(vm.date), this.stringifyTime(time), this.notifyOf) < new Date()) {

      this.showWarningToasty(`Дата, которую Вы задали, не может быть применена`);

      return;
    }

    const task = {
      id: uuid(),
      title: vm.title,
      description: vm.description,
      timeAt: this.stringifyTime(time),
      dateAt: new Date(vm.date).toString(),
      emails: this.emails,
      notifyOf: this.notifyOf,
      dateAtServer: vm.date && `${vm.date.getDate()}/${vm.date.getMonth()}/${vm.date.getFullYear()}`
    };

    this.saveTask(task);

    this.$state.go(`home.taskForCurrentDate`, { date: getLocalDate(vm.date) })
  }

  // TODO Rewrite this trash.
  stringifyTime(time) {

    let hours;
    let min;

    if (!time.getHours()) return "";

    //if hourse<10 add 0 before hourse. will look like : 09:13;
    if (time.getHours() < 10) {

      hours = "0" + time.getHours();
    } else {

      hours = time.getHours();
    }

    if (time.getMinutes() < 10) {

      min = "0" + time.getMinutes();
    } else {

      min = time.getMinutes();
    }

    return hours + ":" + min;
  }

  speechRecognizer(type) {
    this.recognitionType = type;
    const recognition = new webkitSpeechRecognition();

    this.isRecogniting = true;
    recognition.continuous = false;
    // recognition.interimResults = false;

    // Change the recognition language here.
    recognition.lang = 'ru';

    recognition.start();

    recognition.onresult = (event) => {

      this[type] = event.results[0][0].transcript;
      this.isRecogniting = false;
      recognition.stop();
      this.$scope.$apply();
    };

    const events = [
      'onaudioend',
      'onaudiostart',
      'onend',
      'onerror',
      'onnomatch',
      'onsoundend',
      'onsoundstart',
      'onspeechend',
      'onspeechstart',
      'onstart'
    ];

    events.forEach(e => recognition[e] = (...args) => {
      console.warn('event: ', e, ...args);
    });

    recognition.onspeechend = (e) => {

      this.isRecogniting = false;
      recognition.stop();
      this.$scope.$apply();
    };

  }

  getIsRecogniting(type) {

    return this.recognitionType === type && this.isRecogniting;
  }
}

