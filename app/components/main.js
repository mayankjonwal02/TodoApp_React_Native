import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Note from './note';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noteArray: [],  // Stores all notes
      noteText: '',   // Stores the current text input
    };
  }

  addTask = () => {
    if (this.state.noteText) {
      const d = new Date();
      const newNote = {
        id: Date.now(),  // Unique ID based on timestamp
        date: `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`,
        note: this.state.noteText,
      };

      // Update the state with the new note and clear the input
      this.setState(prevState => ({
        noteArray: [...prevState.noteArray, newNote],
        noteText: '',
      }));
    }
  };

  deleteNote = (id) => {
    // Filter out the note that matches the id
    const filteredNotes = this.state.noteArray.filter(note => note.id !== id);
    this.setState({ noteArray: filteredNotes });
  };

  render() {
    const notes = this.state.noteArray.map((val, key) => (
      <Note
        key={key}
        keyval={val.id}
        note={val.note}
        date={val.date}
        deleteMethod={() => this.deleteNote(val.id)}
      />
    ));

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>ToDo</Text>
        </View>

        <ScrollView style={styles.scrollContainer}>
          {notes}
        </ScrollView>

        <View style={styles.footer}>
          <TextInput
            style={styles.textInput}
            onChangeText={(noteText) => this.setState({ noteText })}
            value={this.state.noteText}
            placeholder="Task"
            placeholderTextColor="white"
            underlineColorAndroid="transparent"
          />
        </View>

        <TouchableOpacity onPress={this.addTask} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    backgroundColor: '#3933FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 10,
    borderBottomColor: '#ddd',
  },
  headerText: { color: 'white', fontSize: 18, padding: 26 },
  scrollContainer: { flex: 1, marginBottom: 100 },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  textInput: {
    alignSelf: 'stretch',
    color: '#fff',
    padding: 20,
    backgroundColor: 'gray',
    borderTopWidth: 2,
    borderTopColor: '#ededed',
  },
  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 90,
    backgroundColor: '#3933FF',
    width: 90,
    height: 90,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
  addButtonText: { color: '#fff', fontSize: 24 },
});
