import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as arrayBufferToBuffer from 'arraybuffer-to-buffer';

import { BobService, ProgressCallback } from '../service/bob.service';

@Component({
    selector: 'download-and-install',
    templateUrl: 'download-and-install.component.html'
})
export class DownloadAndInstallComponent implements OnInit {

    fs: any;
    eLinkVersion: string;
    progressCallback: ProgressCallback;

    constructor(private bobService: BobService, private router: Router, private route: ActivatedRoute) {}

    public ngOnInit() {
        this.fs = window['fs'];
        this.route.params.subscribe(params => {
            this.eLinkVersion = params['eLinkVersion'];
        });

        this.progressCallback = new ProgressCallbackImpl();

        console.log(window['fs']);

        this.bobService.downloadELink(this.eLinkVersion, this.progressCallback)
            .subscribe(data => {
                console.log(data);
                let content = arrayBufferToBuffer(data._body);
                console.log(content);
                this.fs.writeFile(this.eLinkVersion + '.war', content, (err) => {
                    if(err !== null) {
                        console.log(err);
                    }
                });
            });
    }

}

export class ProgressCallbackImpl implements ProgressCallback {

    public progress = 0;

    setProgress(progress) {
        this.progress = progress;
    }

}