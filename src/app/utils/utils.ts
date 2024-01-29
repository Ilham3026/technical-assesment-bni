import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Constant } from 'src/app/config/constant'

@Injectable({
  providedIn: 'root'
})
export class Utils {
  constant: any;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private loader: NgxUiLoaderService
  ) {
    this.constant = Constant;
  }

  showConfirm(title: string, confirmMessage: string, icon?: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.confirmationService.confirm({
        message: confirmMessage,
        header: title,
        icon: icon ? icon : 'pi pi-exclamation-triangle',
        accept: () => {
          resolve(true);
        },
        reject: () => {
          resolve(false);
        },
      });
    });
  }

  showNotification(type: string, title: string, description: string, icon?: boolean, duration?: number): void {
    this.messageService.add({
      severity: type,
      summary: title,
      detail: description,
      icon: icon ? '' : 'pi',
      life: duration ? duration : this.constant.duration,
    });
  }

  notificationLink(type: string, title: string, description1: string, description2: string, description3: any): void {
    this.messageService.add({
      key: Array.isArray(description3) ? 'arrType' : 'c',
      severity: type,
      detail: description1,
      summary: description2,
      data: description3,
      life: 400000,
    });
  }

  notifTagHtml(type: string, title: string, description: string): void {
    this.messageService.add({
      key: 'tagHtml',
      severity: type,
      summary: title,
      detail: description,
      life: this.constant.duration,
    });
  }

  messagesTagHtml(type: string, title: string, description: string): void {
    this.messageService.add({
      key: 'message',
      severity: type,
      summary: title,
      detail: description
    });
  }

  setLocalStorage(name: string, value: any): void{
    if(value instanceof Array){
      value = JSON.stringify(value);
      localStorage.setItem('isArray_'+name, 'true');
    }else{
      localStorage.setItem('isArray_'+name, '');
    }
    localStorage.setItem(name, value);
  }

  getLocalStorage(name: string): any{
    var data = localStorage.getItem(name);
    var isArray = localStorage.getItem('isArray_'+name);
    if(isArray == 'true'){
      data = JSON.parse(data);
    }
    return data;
  }

  clearAllLocalstorage(): void {
    localStorage.clear();
  }

  showLoading(): void {
    this.loader.start();
  }

  hideLoading(): void {
    this.loader.stop();
  }

}
