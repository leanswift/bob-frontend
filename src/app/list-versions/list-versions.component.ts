import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {MatTableDataSource, MatDialog, MatDialogConfig} from '@angular/material';

import { BobService } from '../service/bob.service';
import { AlertComponent } from './../alerts/alert.component';

@Component({
    selector: 'list-versions',
    templateUrl: 'list-versions.component.html',
})
export class ListVersionsComponent implements OnInit {

    versionList = [];
    project = null;
    selectedItem = null;
    displayedColumns = ['version', 'actions'];
    dataSource: MatTableDataSource<VersionData>;

    constructor(private bobService: BobService, private router: Router, private route: ActivatedRoute,
                private dialog: MatDialog) {}

    public ngOnInit() {
        this.route.params.subscribe(params => {
            this.project = params['project'];
            if(this.project == null) {
                this.router.navigateByUrl('/select-project');
            }
        });
       this.getVersions();
    }

    public getVersions() {
      this.bobService
      .getVersions(this.project)
      .subscribe((data) => {
          this.versionList = data.json().versions;
          this.dataSource = new MatTableDataSource(this.versionList);
      },
      (error) => {
          this.versionList = [];
      });
    }


    public customize(row: any) {
        if (row != null) {
            this.router.navigateByUrl('/' + this.project + '/customize/' + row);
        }
    }

    public editConfig(version: any) {
      if (version != null) {
        this.router.navigateByUrl('/' + this.project + '/edit-configuration/' + version);
      }
    }

    public deleteConfig(version: any) {
        let encodedVersion = encodeURIComponent(version);
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {
           id: 1,
           title: 'Whaaat?!!'
        };

        const dialogRef = this.dialog.open(AlertComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.bobService.removeConfig(this.project, encodedVersion)
                              .subscribe((data) => {
                                  this.getVersions();
                              },
                              (error) => {
                                this.versionList = [];
                              });
            }
        });
    }
}

export interface VersionData {
  version: string;
}
