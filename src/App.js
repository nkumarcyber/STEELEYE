import './App.css';
import List from './components/List';

function App() {
  return (
    <div className="App">
      <h1>Steeleye</h1>
      <h2>Frontend Engineer Assignment</h2>
      <List items={[{ text: 'Item 1' }, { text: 'Item 2' }, { text: 'Item 3' },{text: 'Item 4'},{text: 'Item 5'},{text: 'Item 6'},{text: 'Item 7'},{text: 'Item 8'},{text: 'Item 9'},{text: 'Item 10'},{text: 'Item 11'},{text: 'Item 12'}]} />
    </div>
  );
}

export default App;
