import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BobService } from '../service/bob.service';

@Component({
    selector: 'customize',
    templateUrl: 'customize.component.html'
})
export class CustomizeComponent implements OnInit {

    eLinkVersion = null;
    customizables = [];

    constructor(private bobService: BobService, private router: Router, private route: ActivatedRoute) {}

    public ngOnInit() {
        this.route.params.subscribe(params => {
            this.eLinkVersion = params['eLinkVersion'];
            if(this.eLinkVersion == null) {
                this.router.navigateByUrl('/list-versions');
            }
            this.refreshCustomizables();
        });
    }

    public refreshCustomizables() {
        this.bobService
            .getCustomizables(this.eLinkVersion)
            .subscribe(data => {
                this.customizables = data.json().customizables;
            });
    }

    public downloadWar() {
        this.bobService.customizables = this.customizables;
        this.router.navigateByUrl('/download-and-install/' + this.eLinkVersion);
    }

}
