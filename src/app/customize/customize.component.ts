import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BobService } from '../service/bob.service';

@Component({
    selector: 'customize',
    templateUrl: 'customize.component.html'
})
export class CustomizeComponent implements OnInit {

    project = null;
    version = null;
    customizables = [];

    constructor(private bobService: BobService, private router: Router, private route: ActivatedRoute) {}

    public ngOnInit() {
        this.route.params.subscribe(params => {
            this.project = params['project'];
            this.version = params['version'];
            if(this.project === null) {
                this.router.navigateByUrl('/select-project');
            }
            if(this.version === null) {
                this.router.navigateByUrl('/' + this.project + '/versions');
            }
            this.refreshCustomizables();
        });
    }

    public refreshCustomizables() {
        this.bobService
            .getCustomizables(this.project, this.version)
            .subscribe(data => {
                this.customizables = data.json().customizables;
            });
    }

    public downloadWar() {
        this.bobService.customizables = this.customizables;
        this.router.navigateByUrl('/' + this.project + '/download-and-install/' + this.version);
    }

}
