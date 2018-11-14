export interface BuildConfiguration {

    version: string;
    modules: ProjectModule[];
    parameters: ProjectCustomizable[];

}

export interface ProjectModule {

    name: string;
    repository: string;
    branch: string;
    tag: string;
    version: string;

}

export interface ProjectCustomizable {

    name: string;
    type: string;
    requestKey: string;
    fileName: string;
    location: string;
    expression: string;
    key: string;

}
