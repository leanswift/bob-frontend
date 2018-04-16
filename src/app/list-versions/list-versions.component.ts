import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BobService } from '../service/bob.service';
import { SystemUtils } from '../utils/utils';

@Component({
    selector: 'list-versions',
    templateUrl: 'list-versions.component.html'
})
export class ListVersionsComponent implements OnInit {

    versionList = [];
    selectedItem = null;

    constructor(private bobService: BobService, private router: Router) {}

    public ngOnInit() {
        this.bobService
            .getELinkVersions()
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
            this.router.navigateByUrl('/customize/' + this.selectedItem);
        }
    }

}