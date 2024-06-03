import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Contact, ContactService } from '../services/contact.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddContactComponent } from '../add-contact/add-contact.component';

@Component({
    selector: 'app-contact-page',
    standalone: true,
    providers: [ContactService, HttpClient],
    templateUrl: './contact-page.component.html',
    styleUrl: './contact-page.component.scss',
    imports: [FormsModule, HttpClientModule, CommonModule, AddContactComponent]
})
export class ContactPageComponent implements OnInit {
  @ViewChild('addContactModal') addContactModal!: AddContactComponent;
  contacts: any[] = [];
  selectedContact: any = null;
  filterText: string = '';

  constructor(private contactService: ContactService, private http: HttpClient) { }

  ngOnInit(): void {
    this.contactService.getContacts().subscribe(data => {
      this.contacts = data;
      console.log(this.contacts);
    });
  }

  getInitials(contact: any): string {
    return contact.firstName.charAt(0) + contact.lastName.charAt(0);
  }

  selectContact(contact: any): void {
    this.selectedContact = contact;
    this.http.get(`https://api.agify.io?name=${contact.firstName}`).subscribe((data: any) => {
      this.selectedContact['age'] = data.age;
    });
  }

  get filteredContacts(): Contact[] {
    return this.contacts.filter(contact => {
      const filterTextLower = this.filterText.toLowerCase();
      const firstNameLower = contact.firstName ? contact.firstName.toLowerCase() : '';
      const lastNameLower = contact.lastName ? contact.lastName.toLowerCase() : '';
      const cellNumberLower = contact.cellNumber ? contact.cellNumber.toLowerCase() : '';
      const fullNameLower = `${firstNameLower} ${lastNameLower}`;

      return firstNameLower.includes(filterTextLower) ||
             lastNameLower.includes(filterTextLower) ||
             fullNameLower.includes(filterTextLower) ||
             cellNumberLower.includes(filterTextLower);
    });
  }

  addContact(): void {
    // Implement adding a contact here
  }

  onContactAdded(contact: Contact) {
    this.contacts.push(contact);
    this.selectedContact = contact;
  }
  
}
  

