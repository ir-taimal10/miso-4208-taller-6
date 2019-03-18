import * as  compareImages from 'resemblejs/compareImages';
import * as  fs from 'fs-extra';
import Path = require("path");
import * as serverScreenshot from "node-server-screenshot";


export class ComparerScreenshot {

    constructor() {

    }

    public async executeCompare() {
        const input_image01 = Path.join(__dirname, "../", "compare__capture01.png");
        const input_image02 = Path.join(__dirname, "../", "compare__capture02.png");
        const output_image = Path.join(__dirname, "../", "compare__result.png");

        await this.captureScreenshot(input_image01);
        await this.captureScreenshot(input_image02);
        await this.getDiff(input_image01, input_image02, output_image);
    }


    public async captureScreenshot(filename) {
        await serverScreenshot.fromURL("https://ir-taimal10.github.io/miso-4208-taller-6/randomColorsApp/",
            filename);
    }

    public async getDiff(input_image01, input_image02, output_image) {
        const options = {
            output: {
                errorColor: {
                    red: 255,
                    green: 0,
                    blue: 255
                },
                errorType: 'movement',
                transparency: 0.3,
                largeImageThreshold: 1200,
                useCrossOrigin: false,
                outputDiff: true
            },
            scaleToSameSize: true,
            ignore: ['nothing', 'less', 'antialiasing', 'colors', 'alpha'],
        };
        const data = await compareImages(
            await fs.readFile(input_image01),
            await fs.readFile(input_image02),
            options
        );

        await fs.writeFile(output_image, data.getBuffer());
    }

}


const comparer = new ComparerScreenshot();
comparer.executeCompare();