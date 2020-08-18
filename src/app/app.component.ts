import { Component } from '@angular/core';
import KSTest from "./KSTest"
import ChiSquareTest from "../app/chiSquareTest"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';


  constructor() {

    let arrayObservation = [0, 1, 2, 3, 4] // TP2 example data to test 
    let arrayFrequenciesO = [60, 33, 19, 6, 2]
    let observationSize = 120
    let media = 0.8083

    let ksTest = new KSTest()
    //ksTest.runTest(arrayObservation, arrayFrequenciesO, media, observationSize)

    let chiTest = new ChiSquareTest()
    chiTest.runTest(arrayObservation, arrayFrequenciesO, media , observationSize)
    

  }
}
