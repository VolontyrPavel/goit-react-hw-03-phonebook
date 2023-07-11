import { Component } from 'react';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { ContactList } from './ContactList';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts) {
      this.setState({
        contacts,
      });
    }
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  handleFormSubmit = data => {
    const findedContact = this.state.contacts.find(contact =>
      contact.name.toLowerCase() === data.name.toLowerCase())
    if (findedContact) {
      return alert(`${data.name} is already in contacts`)
    }
    this.setState(prevState => ({
      contacts: [...prevState.contacts, data],
    }));
  };

  handleFilter = e => {
    this.setState({
      filter: e.currentTarget.value,
    });
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const filterNormalized = this.state.filter.toLowerCase();
    const visibleContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterNormalized)
    );

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.handleFormSubmit} />
        <h2>Contacts</h2>
        <Filter filter={this.state.filter} onChange={this.handleFilter} />
        <ContactList
          contacts={visibleContacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
