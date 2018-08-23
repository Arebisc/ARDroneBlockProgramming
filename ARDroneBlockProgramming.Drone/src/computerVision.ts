import * as request from 'request';

export class ComputerVision {
    private _key: string = "";
    private _url: string = "";

    public constructor(url: string, key: string) {
        this._url = url;
        this._key = key;
    }

    public async getImageTags(image: any, predictionThreshold: number = 0.75): Promise<Array<string>> {
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

    private async postImage(image: any) {
        const options = this.getUrlOptions(image);

        return new Promise((resolve, reject) => {
            request.post(options, (error, response, body) => {
                let jsonResponse = JSON.parse(body);
                resolve(jsonResponse);
            });
        });
    }

    private getUrlOptions(image: any) {
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

interface IApiJsonResponse {
    tags: Array<ITag>;
    requestId: string;
    metadata: IApiMetadata;
}

interface IApiMetadata {
    height: string,
    width: string,
    format: string
}

interface ITag {
    name: string;
    confidence: number
}

