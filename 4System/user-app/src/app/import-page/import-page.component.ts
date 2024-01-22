import { Component,OnInit,TemplateRef } from '@angular/core';
import { UserServiceService } from '../user-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-import-page',
  templateUrl: './import-page.component.html',
  styleUrls: ['./import-page.component.css'], 
  standalone: true,
  imports: [
    NgClass,
  ]
})
export class ImportPageComponent {
  responseBody: string='';
  closeResult = '';
  importInProgress: boolean = false;
  buttonClasses = "btn btn-lg btn-outline-primary disabled";

  constructor(
    private userService: UserServiceService,
    private modalService: NgbModal,
    private router: Router,
  ) {}

  uploadFile(event: any): void {
    event.preventDefault();
    let zmienna;
    const fileList: FileList | null = event.target.files;

    if (fileList && fileList.length > 0) {
      const file: File = fileList[0];
      
      this.userService.addBatchUsers(file).subscribe(
        (response) => {
          console.log('Plik przesłany pomyślnie', response);
          const responseText = response as string;
          //for debug purposes
          // console.log('Odpowiedź od serwera:', responseText);
          // console.log('HTTP Response:', response.body);

          //ładowanie responseBody do Modal-a i 
          //włączanie guizka jeżeli import się nie zakończy
          this.loadMessage(response.body);
          this.importInProgress = true;
          this.buttonClasses='btn btn-lg btn-outline-primary';

          //this.router.navigate(['/users']);
        },
        (error) => {
          console.error('Błąd podczas przesyłania pliku', error);
          this.importInProgress = false;
        }
      );
    }
  }
  
  open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				//this.closeResult = `Closed with: ${result}`;
        this.router.navigate(['/users']);
			},
			(reason) => {
				//this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}

  loadMessage(message: string){
    this.responseBody = message;
  }
}
