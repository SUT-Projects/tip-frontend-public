import { Component } from '@angular/core';
import Chart from 'chart.js';
import stat_questions_1 from "../quiz/questions_1.json"; // this should be stat data
import stat_questions_2 from "../quiz/questions_2.json"; // this should be stat data
import { ActivatedRoute } from '@angular/router';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../variables/charts";

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.scss'
})
export class StudentDashboardComponent {
  stats: any;
  quizDb: string;
  public datasets: any;
  public data: any;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  constructor(private route: ActivatedRoute) {}


  loadStatData() {
    if (this.quizDb == 'questions_1_dashboard') {
      this.stats = stat_questions_1; // should be stat
    } 
    if (this.quizDb == 'questions_2_dashboard') {
      this.stats = stat_questions_2; // should be stat
    }
  }

  colors: any = {
    gray: {
      100: '#f6f9fc',
      200: '#e9ecef',
      300: '#dee2e6',
      400: '#ced4da',
      500: '#adb5bd',
      600: '#8898aa',
      700: '#525f7f',
      800: '#32325d',
      900: '#212529'
    },
    theme: {
      'default': '#172b4d',
      'primary': '#5e72e4',
      'secondary': '#f4f5f7',
      'info': '#11cdef',
      'success': '#2dce89',
      'danger': '#f5365c',
      'warning': '#fb6340'
    },
    black: '#12263F',
    white: '#FFFFFF',
    transparent: 'transparent',
  };

  studentScore = {
  
    options: {
      scales: {
        yAxes: [{
          gridLines: {
            color: this.colors.gray[900],
            zeroLineColor: this.colors.gray[900],
            drawOnChartArea: false
          },
          ticks: {
            callback: function(value) {
              if (!(value % 10)) {
                //return '$' + value + 'k';
                return value;
              }
            }
          }
        }]
      }
    },
    data: {
      labels: ["0% - 20%", "21% - 40%", "41% - 60%", "61% - 80%", "81% - 100%"],
      datasets: [{
        label: 'Number of students',
        data: [11, 20, 10, 30, 15]
      }]
    }
  }

  studentAttempt = {
    
    options: {
      scales: {
        yAxes: [{
          gridLines: {
            color: this.colors.gray[900],
            zeroLineColor: this.colors.gray[900],
            drawOnChartArea: false
          },
          ticks: {
            callback: function(value) {
              if (!(value % 10)) {
                //return '$' + value + 'k';
                return value;
              }
            }
          }
        }]
      }
    },
    data: {
      labels: ["0/3", "1/3", "2/3", "3/3"],
      datasets: [{
        label: 'Number of students',
        data: [11, 30, 30, 15]
      }]
    }
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.quizDb = params['quizDb'];
      this.loadStatData();
    })

    var studentScore = document.getElementById('student-score');

    parseOptions(Chart, chartOptions());


    var scoreChart = new Chart(studentScore, {
      type: 'bar',
      options: this.studentScore.options,
      data: this.studentScore.data
    });

    var studentAttempt = document.getElementById('student-attempt');

    var attemptChart = new Chart(studentAttempt, {
			type: 'bar',
			options: this.studentAttempt.options,
			data: this.studentAttempt.data
		});
  }

}

