import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BobService } from '../service/bob.service';
import { SystemUtils } from '../utils/utils';

@Component({
    selector: 'list-versions',
    templateUrl: 'list-versions.component.html'
})
export class ListVersionsComponent implements OnInit {

    versionList = [];
    project = null;
    selectedItem = null;

    constructor(private bobService: BobService, private router: Router, private route: ActivatedRoute) {}

    public ngOnInit() {
        this.route.params.subscribe(params => {
            this.project = params['project'];
            if(this.project == null) {
                this.router.navigateByUrl('/select-project');
            }
        });
        this.bobService
            .getVersions(this.project)
            .subscribe((data) => {
                this.versionList = data.json().versions;
            },
            (error) => {
                this.versionList = [];
            });
    }

    public select(item: any) {
        this.selectedItem = item;
    }

    public customize() {
        if(this.selectedItem != null) {
            this.router.navigateByUrl('/' + this.project + '/customize/' + this.selectedItem);
        }
    }

}