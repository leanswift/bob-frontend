import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TextDecoder } from 'text-encoding';
import { saveAs } from 'file-saver';

import { BobService, ProgressCallback } from '../service/bob.service';

@Component({
    selector: 'download-and-install',
    templateUrl: 'download-and-install.component.html'
})
export class DownloadAndInstallComponent implements OnInit {

    // fs: any;
    project: any;
    version: string;
    progressCallback: ProgressCallback;
    mode: string;
    hasError: boolean;
    errorMessage: string;

    constructor(private bobService: BobService, private router: Router, private route: ActivatedRoute) {}

    public ngOnInit() {
        // this.fs = window['fs'];
        this.route.params.subscribe(params => {
            this.project = params['project'];
            this.version = params['version'];
        });

        this.mode = 'query';

        this.progressCallback = new ProgressCallbackImpl();

        this.bobService.downloadProject(this.project, this.version, this.progressCallback)
            .subscribe(data => {
                console.log(data);
                const extension = this.project === 'elink' ? '.war' : '.zip';
                this.mode = 'determinate';
                const blob = data.blob();
                saveAs(blob, this.version + extension);
            },
            error => {
                const textDecoder = new TextDecoder('utf-8');
                this.hasError = true;
                this.errorMessage = textDecoder.decode(error._body);
            });
    }

}

export class ProgressCallbackImpl implements ProgressCallback {

    public progress = 0;
    public mode = 'query';

    setProgress(progress) {
        this.mode = 'determinate';
        this.progress = progress;
    }

}