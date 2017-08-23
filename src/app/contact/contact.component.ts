import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from './user.interface';
import { DataAccessService } from '../data-access.service'

declare var $: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

    public myForm: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    public events: any[] = []; // use later to display form changes

    constructor(private dataService:DataAccessService, private _fb: FormBuilder) { } // form builder simplify form initialization

    save(model: User, isValid: boolean) {
        this.submitted = true; // set form submit to true
		
		var rating = 0
		for (var i = 1; i < 6; i ++) {
			if ($("#star-" + i)[0].checked)
				rating = i
		}
		model['rating'] = rating
		model['message'] = $("#ContactForm").val()

		if (isValid)
			this.dataService.sendEmail(model)
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
