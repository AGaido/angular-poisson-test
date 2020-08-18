import calculateFi from "../app/poissonDistribution"

export default class ChiSquareTest {
    private arrayObservation: number[]
    private arrayFo: number[]//
    private arrayFi: number[] = []
    private observationSize: number


    runTest = (arrayObservation: number[], arrayFo: number[], sampleSize: number) => {
        this.arrayObservation = arrayObservation
        this.arrayFo = arrayFo
        this.observationSize = sampleSize

        this.arrayFi = calculateFi(this.arrayObservation).map((num) => {return num*this.observationSize})

        let chiValue = this.calculateChi()

        let chiTab = this.calculateChitab()

        console.log("chi: " + chiValue);
        console.log("chi tab: " + chiTab);


        if (chiValue < chiTab) {
            console.log("NO SE PUEDE RECHAZAR LA HIPOTESIS HO: LA MUESTRA SE COMPORTA COMO UNA DISTRIBUION POISSON");

            //No se puede rechazar la H0
        } else {
            console.log("SE RECHAZA LA HIPOTESIS HO: LA MUESTRA NO SE COMPORTA COMO UNA DISTRIBUION POISSON");
            //Se rechaza H0
        }
    }

    private calculateChi(): number {
        let chiAcum: number
        this.arrayFi.forEach((fe, i) => {
            let fo = this.arrayFo[i]
            let diff = Math.pow((fe - fo), 2)
            let division = diff / fe
            chiAcum += division
            chiAcum = parseFloat(chiAcum.toFixed(4))
        })

        return chiAcum
    }

    private calculateChitab(): number {
        let v = (this.arrayFo.length-1)// Se resdta uno porqe se calculo la media
        return this.getChiTab(v)
    }

    private getChiTab(freedomDegrees: number): number {

        if (freedomDegrees > 36) return 124.3

        let vectorChi: number[] = [] //declaracion de los elementos de Chi 0.95
        vectorChi[0] = 3.84;
        vectorChi[1] = 5.99;
        vectorChi[2] = 7.81;
        vectorChi[3] = 9.49;
        vectorChi[4] = 11.1;
        vectorChi[5] = 12.6;
        vectorChi[6] = 14.1;
        vectorChi[7] = 15.5;
        vectorChi[8] = 16.9;
        vectorChi[9] = 18.3;
        vectorChi[10] = 19.7;
        vectorChi[11] = 21.0;
        vectorChi[12] = 22.4;
        vectorChi[13] = 23.7;
        vectorChi[14] = 25.0;
        vectorChi[15] = 26.3;
        vectorChi[16] = 27.6;
        vectorChi[17] = 28.9;
        vectorChi[18] = 30.1;
        vectorChi[19] = 31.4;
        vectorChi[20] = 32.7;
        vectorChi[21] = 33.9;
        vectorChi[22] = 35.2;
        vectorChi[23] = 36.4;
        vectorChi[24] = 37.7;
        vectorChi[25] = 38.9;
        vectorChi[26] = 40.1;
        vectorChi[27] = 41.3;
        vectorChi[28] = 42.6;
        vectorChi[29] = 43.8;//30
        vectorChi[30] = 55.8;//40
        vectorChi[31] = 67.5;//50
        vectorChi[32] = 79.1;//60
        vectorChi[33] = 70.5;//70
        vectorChi[34] = 101.9;//80
        vectorChi[35] = 113.1;//90
        vectorChi[36] = 124.3;//100
        return vectorChi[freedomDegrees]
    }

}
