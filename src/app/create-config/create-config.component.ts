import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

import { BobService } from '../service/bob.service';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { BuildConfiguration } from './build-configuration.interface';

@Component({
    selector: 'app-create-config',
    templateUrl: 'createconfig.template.html'
})
export class CreateConfigComponent implements OnInit {

    public configurationCreateForm: FormGroup;

    constructor(private bobService: BobService, private router: Router, private _fb: FormBuilder) {}

    ngOnInit(): void {
        this.configurationCreateForm  = this._fb.group({
            version: ['', [Validators.required, Validators.minLength(5)]],
            modules: this._fb.array([
                this.initModules()
            ]),
            parameters: this._fb.array([
                this.initParameters()
            ])
        })
    }

    private initModules() {
        return this._fb.group({
            name: ['', Validators.required],
            version: ['', Validators.required],
            repository: ['', Validators.required],
            branch: [''],
            tag: ['']
        });
    }

    private initParameters() {
        return this._fb.group({
            name: ['', Validators.required],
            requestKey: ['', Validators.required],
            type: ['', Validators.required],
            key: [''],
            expression: [''],
            fileName: [''],
            location: ['']
        });
    }

    private removeModule(i: number) {
        const control = <FormArray>this.configurationCreateForm.controls['modules'];
        control.removeAt(i);
    }

    private removeParameter(i: number) {
        const control = <FormArray>this.configurationCreateForm.controls['parameters'];
        control.removeAt(i);
    }

    private createConfiguration(buildConfiguration: BuildConfiguration) {
        this.bobService.createConfiguration(buildConfiguration);
    }

}
