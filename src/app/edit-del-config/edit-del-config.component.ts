import { Component, OnInit } from '@angular/core';

import { BobService } from '../service/bob.service';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'edit-or-del-config',
    templateUrl: 'editordelconfig.template.html'
})
export class EditOrDelConfigComponent implements OnInit {

    project = null;
    versionList = [];
    selectedItem = null;
    modules = [];
    parameters = [];
    version = null;

    public configurationEditForm: FormGroup;

    constructor(private bobService: BobService, private _fb: FormBuilder, private snackBar: MatSnackBar,
        private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.configurationEditForm = this._fb.group({
            modules: this._fb.array([]),
            parameters: this._fb.array([])
        })
        this.route.params.subscribe(params => {
            this.project = params['project'];
            this.version = params['version'];
            if(this.project == null) {
                this.router.navigateByUrl('/select-project');
            }
            this.getConfigurations();
        });
    }

    public getConfigurations() {
        const that = this;
        this.bobService.getConfigurations(this.project, this.version)
            .subscribe({
                next: data => {
                    const moduleControl = <FormArray>that.configurationEditForm.controls['modules'];
                    const modules = data.json().modules;
                    modules.forEach(module => {
                        moduleControl.push(this.initModule(module.name, module.version, module.repository, module.branch, module.tag));
                    })
                    const paramControl = <FormArray>that.configurationEditForm.controls['parameters'];
                    const parameters = data.json().parameters;
                    parameters.forEach(config => {
                        paramControl.push(this.initParameter(config.name, config.requestKey, config.type, config.key,
                            config.expression, config.fileName, config.location));
                    });
                },
                error: error => {
                    that.openSnackBar(error.json().message, 'Dismiss');
                }
            });
    }

    public editConfiguration(formGroup: FormGroup) {
        const that = this;
        let buildConfig = formGroup.value;
        buildConfig.version = this.version;
        this.bobService.updateConfiguration(this.project, this.version, buildConfig)
            .subscribe({
                next: () => {
                    that.openSnackBar('Configuration updated', 'Dismiss');
                },
                error: error => {
                    that.openSnackBar(error.json().message, 'Dismiss');
                }
            });
    }

    private initModule(name?: string, version?: string, repository?: string, branch?: string, tag?: string) {
        return this._fb.group({
            name: [!!name ? name : '', Validators.required],
            version: [!!version ? version : '', Validators.required],
            repository: [!!repository ? repository : '', Validators.required],
            branch: [!!branch ? branch : ''],
            tag: [!!tag ? tag : '']
        })
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
        const control = <FormArray> this.configurationEditForm.controls['modules'];
        control.push(this.initModule());
    }

    addParameter() {
        const control = <FormArray> this.configurationEditForm.controls['parameters'];
        control.push(this.initParameter());
    }

    removeModule(i: number) {
        const control = <FormArray> this.configurationEditForm.controls['modules'];
        control.removeAt(i);
    }

    removeParameter(i: number) {
        const control = <FormArray> this.configurationEditForm.controls['parameters'];
        control.removeAt(i);
    }

    openSnackBar(message, action) {
        this.snackBar.open(message, action, {
            duration: 3000
        });
    }
}
