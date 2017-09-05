import { Component, OnInit } from '@angular/core';

import { BobService } from '../service/bob.service'

@Component({
    selector: 'list-versions',
    templateUrl: 'list-versions.component.html',
    providers: [BobService]
})
export class ListVersionsComponent implements OnInit {

    versionList = [];
    selectedItem = null;

    constructor(private bobService: BobService) {}

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
        console.log(this.selectedItem);
        
    }

}