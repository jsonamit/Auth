import { Component, Input,  OnInit, ViewChild } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

import { BadgesService } from '../../services/badges.service';
import { GeneralService } from '../../../services/general.service';
import { JsonService } from '../../../services/json.service';
@Component({
    selector: 'badges-step-four',
    templateUrl: './step-four.component.html',
    viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})

export class BadgesStepFourComponent implements OnInit {

     @Input() formdata: any;
  
     landscapedesign = true;
     portraitdesign = false;

     plain = true;
     stripe = false;
     watermark = false;
     companyLogo: any;
     stripebackground:any;
     watermarkbackground:any;
     portraitStripekBg:any;
     watermarkStripekBg:any;
    @ViewChild('customNumberFile') CustomNumberFile;
    RowImageFile: File;

    @Input() data: any;
    

    label: any

    constructor(
      private bservice: BadgesService,
      private gservice: GeneralService,
      private jservice: JsonService
    ) {}

    ngOnInit() {
        this.stripebackground='#FFFFFF';
        this.watermarkbackground='#FFFFFF';
        this.portraitStripekBg='#FFFFFF';
        this.watermarkStripekBg='#FFFFFF';
       this.label = this.bservice.getBadges();
       
       this.label.choosedesign ='Plain';
       this.bservice.updateBadges(this.label);
     
       this.label.cardview ='Landscape';
       this.bservice.updateBadges(this.label);
    }

  public cardView(value)
   {

     if(value == 'Landscape'){
       
       this.landscapedesign = true;
       this.portraitdesign = false;

       this.label.cardview ='Landscape';
       this.bservice.updateBadges(this.label);

    }else if(value == 'Portrait'){

        this.landscapedesign = false;
        this.portraitdesign = true;

        this.label.cardview ='Portrait';
        this.bservice.updateBadges(this.label);
     }
   }

   public chooseDesign(value)
   {
     
    if(value == 'Plain'){
       
        this.plain = true;
        this.stripe = false;
        this.watermark = false;

        this.label.choosedesign ='Plain';
	this.bservice.updateBadges(this.label);

    }else if(value == 'Stripes'){

        this.plain = false;
        this.stripe = true;
        this.watermark = false;

        this.label.choosedesign ='Stripes';
	this.bservice.updateBadges(this.label);

    }else if(value == 'Watermark'){
        this.plain = false;
        this.stripe = false;
        this.watermark = true;

        this.label.choosedesign ='Watermark';
	this.bservice.updateBadges(this.label);
    }


   }
    
    public pickColor(val) {         
          this.label.pickcolor =val.target.value;
	  this.bservice.updateBadges(this.label);
          this.stripebackground=val.target.value;
          this.watermarkbackground=val.target.value;
          this.portraitStripekBg=val.target.value;
          this.watermarkStripekBg=val.target.value;
    }

   public readImage(event): void {
      if(event.target.files && event.target.files[0]) {
          const file = event.target.files[0];
  
            const cUrl =  `uploadlogo`;

             const formData: FormData = new FormData();
             formData.append('logo', file, file.name);

             this.gservice.post(cUrl,formData).subscribe(
	      response => this.handleSuccess(response),
	    );    
      }
  }
  
 private handleSuccess(response) {
          
          this.companyLogo =response.url;
          this.label.logo =response.url;
	  this.bservice.updateBadges(this.label);
  }
   
}
