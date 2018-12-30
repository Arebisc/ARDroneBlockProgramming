import * as request from 'request';
import { IApiJsonResponse, IApiMetadata, ITag } from './interfaces/computerVision';

export class ComputerVision {
    
    public constructor(
        private _url: string = "", 
        private _key: string = "") 
    { }

    public async getImageTags(image: object, predictionThreshold: number = 0.75): Promise<Array<string>> {
        let tags = new Array<string>();

        try {
            let apiResponse = await this.postImage(image) as IApiJsonResponse;
            tags = apiResponse.tags
                .filter(n => n.confidence > predictionThreshold)
                .map(x => x.name);
        }
        catch(e) {
            console.log(e);
        }
        finally {
            return tags;
        }
    } 

    private async postImage(image: object) {
        const options = this.getUrlOptions(image);

        return new Promise((resolve, reject) => {
            request.post(options, (error, response, body) => {
                resolve(JSON.parse(body));
            });
        });
    }

    private getUrlOptions(image: object) {
        const params = {
            'visualFeatures': 'Tags',
            'details': '',
            'language': 'en'
        };

        return {
            uri: this._url,
            qs: params,
            body: image,
            headers: {
                'Content-Type': 'application/octet-stream',
                'Ocp-Apim-Subscription-Key' : this._key
            }
        };
    }
}
