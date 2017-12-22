import * as TasksActions from 'actions/tasks.actions.js';
import {MONTH_NAME_RU, DAY_PREFFIX_NAME_RU, getLocalDate} from 'core/date.utils.js';
import jsPDF from 'jspdf';
import './html2canvas.js';
import {getCurrentTasks, renderHtml, textToHtml} from './utils.js';
import { DEFAULT_PDF_COLUMNS, DEFAULT_DATE_PICKER_PROPERTIES } from './consts';

export default class TaskCalendar {

  constructor($ngRedux, $scope, $state, toaster) {

    Object.assign(this, {$scope, toaster});

    this.highlights = [];
    this.unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this), TasksActions)(this);

    this.fetchTasks();

    const months = Object.keys(MONTH_NAME_RU).map(k => MONTH_NAME_RU[k]);
    const daysOfTheWeek = Object.keys(DAY_PREFFIX_NAME_RU).map(k => DAY_PREFFIX_NAME_RU[k]);

    this.onezoneDatepicker = {
      ...DEFAULT_DATE_PICKER_PROPERTIES,
      date: new Date(), // MANDATORY
      highlights: this.highlights,
      months,
      daysOfTheWeek,
      callback: value => $state.go(`home.taskForCurrentDate`, {date: getLocalDate(value)})
    };

  }

  mapStateToThis({tasks: {tasks = []}}) {

    const dateForHighlight = tasks.map(t => t.dateAt && ( {date: new Date(t.dateAt)})).filter(t => t);

    this.highlights.push(...dateForHighlight);

    return {
      tasks
    }
  }

  showToasty(title, text) {

    this.toaster.pop({
      type: 'success',
      title: title,
      body: text,
      timeout: 3000
    });
  }

  $onDestroy() {
    this.unsubscribe();
  }

  getCurrentMonth() {

    return MONTH_NAME_RU[this.selectedPicker.date.getMonth()];
  }

  savePdf() {
    const selectedMonth = this.selectedPicker.date.getMonth();
    const selectedYear = this.selectedPicker.date.getFullYear();

    const rows = getCurrentTasks(this.tasks, selectedMonth, selectedYear);

    const html = renderHtml({rows, columns: DEFAULT_PDF_COLUMNS, dateAt: this.getCurrentMonth()});

    this.exportAsPdf(html);
  }

  // That method get a string of html markup.
  // Create a document model in frame.
  // Create a canvas from html.
  // Create an Image from canvas.
  // And convert image to pdf.
  // Save to driver
  //
  // text -> html -> canvas -> image -> png -> pdf -> device root dir.
  //TODO Hard. operation move this logic to backend
  exportAsPdf(html) {

    this.isLoading = true;

    html2canvas(textToHtml(html.replace(/<\/?script[^>]*?>/gi, '')), {
      onrendered: (canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF('p', 'mm');

        doc.addImage(imgData, 'PNG', 10, 10);

        const pdfOutput = doc.output('blob');
        const pdfName = `Очет о задах за ${this.getCurrentMonth()}.pdf`;

        //@TODO rewrite callback hell.
        window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, (dir) => {
          dir.getFile(pdfName, {create: true}, (file) => {
            file.createWriter((fileWriter) => {
              fileWriter.write(pdfOutput);
              fileWriter.onwriteend = () => {
                this.isLoading = false;
                this.showToasty('Сохранение в PDF выполнено успешно', `Сохранено в: ${cordova.file.externalRootDirectory}`);
                this.$scope.$apply();
              };

            }, function () {
              alert('Unable to save file in path ' + cordova.file.externalRootDirectory);
            });
          });
        });

      }
    });
  }

}

TaskCalendar.$inject = ['$ngRedux', '$scope', '$state', 'toaster'];



