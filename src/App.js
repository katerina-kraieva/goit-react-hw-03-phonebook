import React, { Component } from 'react';
import shortid from 'shortid';
import './App.css';
import Container from './Components/Container/Container';
import ContactForm from './Components/ContactForm/ContactForm';
import Filter from './Components/Filter/Filter';
import ContactList from './Components/ContactList/ContactList';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

   componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }

  addNumber = (name, tel) => {
    if (this.state.contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in the list`);
      return;
    }
    const contact = {
      id: shortid.generate(),
      name: name,
      number: tel,
    };

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  deleteNumber = numberId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== numberId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;

    const normFilter = filter.toLowerCase();

    return contacts.filter(contact => contact.name.toLowerCase().includes(normFilter));
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <>
        <Container>
          <h1 className="appTitle">Phonebook</h1>
          <ContactForm onSubmit={this.addNumber} />
        </Container>
        <Container title="Contacts">
          <Filter value={filter} onChange={this.changeFilter} />
          <ContactList contacts={visibleContacts} onDeleteNumber={this.deleteNumber} />
        </Container>
      </>
    );
  }
}

export default App;
