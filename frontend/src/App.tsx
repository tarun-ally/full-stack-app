import { useEffect, useState } from 'react';
import './App.css'
import { getHealth } from './api/heatlh.api';

function App() {
  const [data, setData] = useState<any>(null);

  useEffect(()=>{
    getHealth().then(setData)
    .catch(console.error);
  },[])
  return (
    <>
   <div style={{ padding: "20px" }}>
      <h1>React + Vite + TypeScript 🚀</h1>
      <p>Frontend running successfully</p>
      <pre>{JSON.stringify(data,null,2)}</pre>
      fe
    </div>
    </>
  )
}

export default App
