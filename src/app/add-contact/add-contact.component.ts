import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Contact } from '../services/contact.service';  // Adjust the import according to your project structure

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})
export class AddContactComponent {
  @Output() contactAdded = new EventEmitter<Contact>();
  show = false;

  newContact: Contact = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    cellNumber: '',
    bio: ''
  };

  closeModal() {
    this.show = false;
  }

  openModal() {
    this.show = true;
  }

  addContact(contactForm: NgForm) {
    if (contactForm.valid) {  
      this.contactAdded.emit(this.newContact);
      this.closeModal();
    }
  }
}