import { Component, OnInit } from '@angular/core';

import { BobService } from '../service/bob.service'

@Component({
    selector: 'download-and-install',
    templateUrl: 'download-and-install.component.html',
    providers: [BobService]
})
export class DownloadAndInstallComponent implements OnInit {

    constructor(private bobService: BobService) {}

    public ngOnInit() {
        
    }

}