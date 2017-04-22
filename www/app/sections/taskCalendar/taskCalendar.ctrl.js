import * as TasksActions from 'actions/tasks.actions.js';
import {MONTH_NAME_RU, DAY_PREFFIX_NAME_RU, getLocalDate} from 'core/date.utils.js';
import jsPDF from 'jspdf';
import './html2canvas.js';
import {getCurrentTasks, renderHtml, textToHtml} from './utils.js';

export default class TaskCalendar {

  constructor($ngRedux, $scope, $state, toaster) {

    Object.assign(this, {$scope, toaster});

    this.highlights = [];
    this.unsubscribe = $ngRedux.connect(this.mapStateToThis.bind(this), TasksActions)(this);

    this.fetchTasks();

    const months = Object.keys(MONTH_NAME_RU).map(k => MONTH_NAME_RU[k]);
    const daysOfTheWeek = Object.keys(DAY_PREFFIX_NAME_RU).map(k => DAY_PREFFIX_NAME_RU[k]);

    this.onezoneDatepicker = {
      date: new Date(), // MANDATORY
      mondayFirst: true,
      months,
      daysOfTheWeek,
      disablePastDays: false,
      disableSwipe: false,
      showDatepicker: true,
      showTodayButton: false,
      calendarMode: true,
      hideCancelButton: true,
      hideSetButton: true,
      highlights: this.highlights,
      callback: value => {

        $state.go(`home.taskForCurrentDate`, {date: getLocalDate(value)})
      }

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
    // TODO below hot fix, mote it in getCurrentTask method.
    const rows = getCurrentTasks(this.tasks, selectedMonth, selectedYear).map(d => ({ ...d, dateAt: new Date(d.dateAt).toLocaleDateString() }));

    const columns = [
      { title: "Название", dataKey: "title" },
      { title: "Описание", dataKey: "description" },
      { title: "Дата", dataKey: "dateAt" },
      { title: "Время", dataKey: "timeAt" },
      { title: "Оповестить за", dataKey: "notifyOf" }
    ];

    const html = renderHtml({rows, columns, dateAt: this.getCurrentMonth()});

    this.exportAsPdf(html);
  }

  exportAsPdf(html) {

    this.isLoading = true;

    html2canvas(textToHtml(html.replace(/<\/?script[^>]*?>/gi, '')), {

      onrendered: (canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF('p', 'mm');
        doc.addImage(imgData, 'PNG', 10, 10);
        const pdfOutput = doc.output('blob');
        const pdfName = `Очет о задах за ${this.getCurrentMonth()}.pdf`;

        // setTimeout(() => {
        //   this.isLoading = false;
        //   this.showToasty('Сохранение в PDF выполнено успешно', `Сохранено в: local/root`);
        //   this.$scope.$apply();
        // }, 1000);
        // doc.save(pdfName);

        window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, (dir) => {

          console.log("Access to the directory granted succesfully");

          dir.getFile(pdfName, {create: true}, (file) => {

            console.log("File created succesfully.");

            file.createWriter((fileWriter) => {

              console.log("Writing content to file");

              fileWriter.write(pdfOutput);

              fileWriter.onwriteend = () => {
                console.log("Successful file write...");

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



