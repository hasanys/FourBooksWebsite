import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from './user.interface';
import { DataAccessService } from '../data-access.service'
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

    public myForm: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted

    constructor(public toastr: ToastsManager, vcr: ViewContainerRef, private dataService:DataAccessService, private _fb: FormBuilder) {
		this.toastr.setRootViewContainerRef(vcr);
	} // form builder simplify form initialization

    save(model: User, isValid: boolean) {
        this.submitted = true; // set form submit to true
		
		var rating = 0
		for (var i = 1; i < 6; i ++) {
			if ($("#star-" + i)[0].checked)
				rating = i
		}
		model['rating'] = rating
		model['message'] = $("#ContactForm").val()

		if (isValid) {
			this.toastr.success('Thank you for submitting your feedback!', 'Email Sent');
			this.dataService.sendEmail(model, function(output) { 
				var res = JSON.parse(output); 
				
				if (res['status'] === "SUCCESS") {
					console.log(this.submitted)
					console.log("Successfully saved email data")//this.toastr.success('Thank you for submitting your feedback!', 'Email Sent');
				}else
			        console.log("message saving error: " + res['message'])//this.toastr.error(res['message'], 'Error');
			});
		}
    }
	
  ngOnInit() {
	      // the short way
    this.myForm = this._fb.group({
            name: ['', [<any>Validators.required, <any>Validators.minLength(3)]],
			email: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
			rating: [''],
			message: ['']
        });
  }
}
