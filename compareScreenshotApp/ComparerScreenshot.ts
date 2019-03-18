import * as capture from 'capture-screenshot';
import * as  compareImages from 'resemblejs/compareImages';
import * as  fs from 'fs-extra';
import * as mfs from 'mz/fs';

export class ComparerScreenshot {

    constructor() {

    }

    public async executeComparation() {
        const input_image01 = 'capture01.png';
        const input_image02 = 'capture02.png';
        const output_image = 'result.png';

        this.captureScreenshot(input_image01);
        this.captureScreenshot(input_image02);

        setTimeout(()=>{
            this.getDiff(input_image01, input_image02, output_image);
        }, 3000, 'funky');


    }


    public async captureScreenshot(filename) {
        capture({url: 'https://ir-taimal10.github.io/miso-4208-taller-6/randomColorsApp/'})
            .then(imgs => {
                fs.writeFileSync(filename, imgs.chrome)
            });
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
            await mfs.readFile(input_image01),
            await mfs.readFile(input_image02),
            options
        );

        await mfs.writeFile(output_image, data.getBuffer());
    }

}



const comparer = new ComparerScreenshot();
comparer.executeComparation();