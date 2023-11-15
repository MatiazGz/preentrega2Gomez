import './App.css'
import Card from './components/Card'
import realstate from "./data/realestate"
function App() {
  const realestateList = realstate.map((v) => {
    return <Card title={v.name} description={v.description}/>
  })
  
  return (
      <div className='App'>

        <h1>Real Estate</h1>

        <div className="container">
          {realestateList}
        </div>
        
      </div>
  )
}

export default App
