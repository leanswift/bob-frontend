import { Component, OnInit } from  '@angular/core';

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
    version = null;

    public editConfigurationForm: FormGroup;

    constructor(private bobService: BobService, private _fb: FormBuilder, private snackbar: MatSnackBar,
        private router: Router, private route: ActivatedRoute) {}

        ngOnInit(): void {
            // this.editConfigurationForm  = this._fb.group({
            //     version: ['', [Validators.required, Validators.minLength(5)]],
            //     modules: this._fb.array([
            //         this.initModule()
            //     ]),
            //     parameters: this._fb.array([])
            // });
            this.route.params.subscribe(params => {
                this.project = params['project'];
                this.version = params['version'];
                if(this.project == null) {
                    this.router.navigateByUrl('/select-project');
                }
                this.getModuleForVersion();
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

        public getModuleForVersion() {
                this.bobService.getModuleForVersion(this.project, this.version)
                                .subscribe(data => {
                                    this.modules = data.json().modules;
                                });
        }
}
