import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as arrayBufferToBuffer from 'arraybuffer-to-buffer';

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
                console.log(data);
                let content = arrayBufferToBuffer(data._body);
                console.log(content);
                this.fs.writeFile('/home/shyam/' + this.eLinkVersion + '.war', content, (err) => {
                    if(err !== null) {
                        console.log(err);
                    }
                });
            });
    }

}