import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BobService } from '../service/bob.service';

@Component({
    selector: 'download-and-install',
    templateUrl: 'download-and-install.component.html',
    providers: [BobService]
})
export class DownloadAndInstallComponent implements OnInit {

    fs: any;
    eLinkVersion: string;

    constructor(private bobService: BobService, private router: Router, private route: ActivatedRoute) {}

    public ngOnInit() {
        this.fs = window['fs'];
        this.route.params.subscribe(params => {
            this.eLinkVersion = params['eLinkVersion'];
        });

        console.log(window['fs']);

        this.bobService.downloadELink(this.eLinkVersion)
            .subscribe(data => {
                console.log(data)
                let file = this.fs.writeFile(this.eLinkVersion + '.war', data, function(a, b, c) {
                    console.log(a);
                    console.log(b);
                    console.log(c);
                });
            });
    }

}