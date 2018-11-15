import { Component, OnInit } from '@angular/core';

import { BobService } from '../service/bob.service';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-create-config',
    templateUrl: 'createconfig.template.html'
})
export class CreateConfigComponent implements OnInit {

    project = null;

    isMultiModule: boolean;

    public configurationCreateForm: FormGroup;

    constructor(private bobService: BobService, private _fb: FormBuilder, private snackBar: MatSnackBar,
        private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.configurationCreateForm  = this._fb.group({
            version: ['', [Validators.required, Validators.minLength(5)]],
            modules: this._fb.array([
                this.initModule()
            ]),
            parameters: this._fb.array([])
        });
        this.route.params.subscribe(params => {
            this.project = params['project'];
            if(this.project === null) {
                this.router.navigateByUrl('/select-project');
            }
            if(this.project === 'eLink') {
                this.isMultiModule = true;
                this.initELinkDefaultParameters();
            }
        });
    }

    private initModule() {
        return this._fb.group({
            name: ['', Validators.required],
            version: ['', Validators.required],
            repository: ['', Validators.required],
            branch: [''],
            tag: ['']
        });
    }

    private initELinkDefaultParameters() {
        const control = <FormArray> this.configurationCreateForm.controls['parameters'];
        control.push(this.initParameter('Log file location', 'logLocation', 'regex', null,
            '\\${catalina\\.base}/logs/leanswift/eLink-\\d\\.\\d\\.\\d', 'logback.xml', 'eLink-resources/src/main/resources'));
        control.push(this.initParameter('Config database URL', 'configDBURL', 'properties', 'eLink.config.db.name',
            null, 'eLink-database.properties', 'eLink-resources/src/main/resources'));
        control.push(this.initParameter('Config database name', 'configDBName', 'properties', 'eLink.config.db.host.url',
            null, 'eLink-database.properties', 'eLink-resources/src/main/resources'));
        control.push(this.initParameter('Config database type', 'configDBType', 'properties', 'eLink.dbType',
            null, 'eLink-database.properties', 'eLink-resources/src/main/resources'));
    }

    private initParameter(name?: string, requestKey?: string, type?: string, key?: string,
        expression?: string, fileName?: string, location?: string) {
        return this._fb.group({
            name: [!!name ? name : '', Validators.required],
            requestKey: [!!requestKey ? requestKey : '', Validators.required],
            type: [!!type ? type : '', Validators.required],
            key: [!!key ? key : ''],
            expression: [!!expression ? expression : ''],
            fileName: [!!fileName ? fileName : ''],
            location: [!!location ? location : '']
        });
    }

    addModule() {
        const control = <FormArray> this.configurationCreateForm.controls['modules'];
        control.push(this.initModule());
    }

    addParameter() {
        const control = <FormArray> this.configurationCreateForm.controls['parameters'];
        control.push(this.initParameter());
    }

    removeModule(i: number) {
        const control = <FormArray> this.configurationCreateForm.controls['modules'];
        control.removeAt(i);
    }

    removeParameter(i: number) {
        const control = <FormArray> this.configurationCreateForm.controls['parameters'];
        control.removeAt(i);
    }

    createConfiguration(formGroup: FormGroup) {
        this.bobService.createConfiguration(this.project, formGroup.value)
            .subscribe({
                next: result => {
                    this.ngOnInit();
                    this.openSnackBar('Configuration saved', 'Configure');
                },
                error: error => {
                    this.openSnackBar('Configuration save failed because: \'' + JSON.parse(error._body).message + '\'', 'Dismiss');
                }
            });
    }

    openSnackBar(message, action) {
        this.snackBar.open(message, action, {
            duration: 3000
        });
    }

}
