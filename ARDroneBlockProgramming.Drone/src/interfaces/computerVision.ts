
export interface IApiJsonResponse {
    tags: Array<ITag>;
    requestId: string;
    metadata: IApiMetadata;
}

export interface IApiMetadata {
    height: string,
    width: string,
    format: string
}

export interface ITag {
    name: string;
    confidence: number
}

