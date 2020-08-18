import calculateFi from "../app/poissonDistribution"

export default class PoissonTestClass {
    private arrayObservation: number[]
    private arrayProbFo: number[] = []
    private arrayProbFi: number[] = []
    private arrayAcumProbFo: number[] = []
    private arrayAcumProbFi: number[] = []
    private observationSize: number


    runTest = (arrayObservation: number[], arrayFo: number[], media: number, sampleSize: number) => {
        this.arrayObservation = arrayObservation
        this.observationSize = sampleSize
        this.arrayProbFo = this.getArrayProbFo(arrayFo)
        this.arrayObservation.sort()
        this.sortArray(this.arrayProbFo)

        this.arrayProbFi = calculateFi(this.arrayObservation, media)
        this.getAcFo()
        this.getAcFi()


        let Dn = this.calculateDn()
        let Dtab = this.calculateDtab()
        console.log("Dn: " + Dn);
        console.log("D tab: " + Dtab);
        if (Dn < Dtab) {
            console.log("NO SE PUEDE RECHAZAR LA HIPOTESIS HO: LA MUESTRA SE COMPORTA COMO UNA DISTRIBUION POISSON");

            //No se puede rechazar la H0
        } else {
            console.log("SE RECHAZA LA HIPOTESIS HO: LA MUESTRA NO SE COMPORTA COMO UNA DISTRIBUION POISSON");
            //Se rechaza H0
        }
    }

    private getArrayProbFo(arrayFo: number[]): number[] {
        let arrayProbFo: number[] = []
        console.log(arrayFo);

        arrayFo.forEach(fo => {
            let probFo = fo / this.observationSize
            probFo = parseFloat(probFo.toFixed(4))
            arrayProbFo.push(probFo)
        });
        console.log(arrayProbFo);
        
        return arrayProbFo
    }

    private sortArray(arrayToSort: number[]) {
        arrayToSort.sort(function (a, b) { return b - a })
    }

    private getAcFo() {
        let acumAux: number = 0
        this.arrayProbFo.forEach(num => {
            acumAux += num
            acumAux = parseFloat(acumAux.toFixed(4))
            this.arrayAcumProbFo.push(acumAux)
        })
    }


    private getAcFi() {
        let acumAux: number = 0
        this.arrayProbFi.forEach(num => {
            acumAux += num
            acumAux = parseFloat(acumAux.toFixed(4))
            this.arrayAcumProbFi.push(acumAux)
        })
        return this.arrayAcumProbFi
    }

    private calculateDn(): number {
        let arrayAcumDiff: number[] = this.getArrayAcumDiff()
        return Math.max.apply(null, arrayAcumDiff)
    }

    private getArrayAcumDiff(): number[] {
        let arrayAcumDiff: number[] = []

        this.arrayAcumProbFo.forEach((probFo, i) => {
            let probFi = this.arrayAcumProbFi[i]
            let diff = Math.abs(probFo - probFi)
            diff = parseFloat(diff.toFixed(4))
            arrayAcumDiff.push(diff)
        })

        return arrayAcumDiff
    }

    private calculateDtab(): number {
        let Dtab: number
        const poissonConstant: number = 1.22 // D0,10
        if (this.observationSize > 35) {
            Dtab = parseFloat((poissonConstant / Math.sqrt(this.observationSize)).toFixed(4))
        } else {
            Dtab = this.getPoissonDtab(this.observationSize)
        }
        return Dtab
    }

    private getPoissonDtab(freedomDegrees: number): number {

        if (freedomDegrees > 23) return 0.21

        let vectorPoisson: number[] = [] //declaracion de los elementos de Poisson 0.10
        vectorPoisson[0] = 0.95
        vectorPoisson[1] = 0.776
        vectorPoisson[2] = 0.642
        vectorPoisson[3] = 0.564
        vectorPoisson[4] = 0.510
        vectorPoisson[5] = 0.470
        vectorPoisson[6] = 0.438
        vectorPoisson[7] = 0.411
        vectorPoisson[8] = 0.388
        vectorPoisson[9] = 0.368
        vectorPoisson[10] = 0.352
        vectorPoisson[11] = 0.338
        vectorPoisson[12] = 0.325
        vectorPoisson[13] = 0.314
        vectorPoisson[14] = 0.304
        vectorPoisson[15] = 0.295
        vectorPoisson[16] = 0.286
        vectorPoisson[17] = 0.278
        vectorPoisson[18] = 0.272
        vectorPoisson[19] = 0.264
        vectorPoisson[20] = 0.24
        vectorPoisson[21] = 0.22
        vectorPoisson[22] = 0.21

        return vectorPoisson[freedomDegrees]
    }

}
