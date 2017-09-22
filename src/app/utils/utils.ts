import { Injectable } from '@angular/core';

export class SystemUtils {

    public getJavaHome(): string {
        return window['process'].env.PATH;
    }

    public getTomcatHome(): string {
        return window['process'].env['CATALINA_HOME'];
    }

}