import { Component, OnInit } from '@angular/core';

import { BobService } from '../service/bob.service'

@Component({
    selector: 'customize',
    templateUrl: 'customize.component.html',
    providers: [BobService]
})
export class CustomizeComponent implements OnInit {

    customizables = [];

    constructor(private bobService: BobService) {}

    public ngOnInit() {
        this.bobService
            .getCustomizables('eLink-CE:5.0.0')
            .subscribe(data => {
                this.customizables = data.json().customizables;
            });
    }

}