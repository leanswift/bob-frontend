import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BobService } from '../service/bob.service';
import { SystemUtils } from '../utils/utils';

@Component({
    selector: 'select-project',
    templateUrl: 'select-project.component.html'
})
export class SelectProjectComponent implements OnInit {

    projectList = [];
    selectedProject = null;

    constructor(private bobService: BobService, private router: Router) {}

    public ngOnInit() {
        this.projectList = [ { name: 'eLink', key: 'eLink' }, { name: 'H5 Webapps', key: 'h5' } ];
    }

    public select(project: any) {
        this.selectedProject = project.key;
    }

    public projectSelected() {
        if(this.selectedProject != null) {
            this.router.navigateByUrl('/' + this.selectedProject + '/versions');
        }
    }

}