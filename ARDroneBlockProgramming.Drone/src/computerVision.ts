import * as request from 'request';
import { IApiJsonResponse, IApiMetadata, ITag } from './interfaces/computerVision';

export class ComputerVision {
    private _key: string = "";
    private _url: string = "";

    public constructor(url: string, key: string) {
        this._url = url;
        this._key = key;
    }

    public async getImageTags(image: object, predictionThreshold: number = 0.75): Promise<Array<string>> {
        let tags = new Array<string>();

        try {
            let apiResponse = await this.postImage(image) as IApiJsonResponse;

            for(let i = 0; i < apiResponse.tags.length; i++) {
                if(apiResponse.tags[i].confidence > predictionThreshold) {
                    tags.push(apiResponse.tags[i].name);
                }
            }
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
                let jsonResponse = JSON.parse(body);
                resolve(jsonResponse);
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