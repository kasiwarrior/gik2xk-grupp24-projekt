import {Link, Outlet} from 'react-router-dom';

function App() {
 return (
    <>
    <ul>
      <li>
        <Link to= "/">Home</Link>
      </li>
      <li>
        <Link to= "/product/new">Skapa/ändra produkt</Link>
      </li>
    </ul>
    <Outlet />
    </>
  )
}

export default App
