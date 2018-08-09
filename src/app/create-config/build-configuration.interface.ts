export interface BuildConfiguration {

    version: string;
    modules: ELinkModule[];
    parameters: ELinkCustomizable[];

}

export interface ELinkModule {

    name: string;
    repository: string;
    branch: string;
    tag: string;
    version: string;

}

export interface ELinkCustomizable {

    name: string;
    type: string;
    requestKey: string;
    fileName: string;
    location: string;
    expression: string;
    key: string;

}
