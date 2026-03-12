import {BrowserRouter,Routes,Route} from "react-router-dom"

import Signup from "./components/Signup"
import Login from "./components/Login"
import Profile from "./components/Profile"
import AdminDashboard from "./components/AdminDashboard"
import ProtectedRoute from "./components/ProtectedRoute"

function App(){

return(

<BrowserRouter>

<Routes>

<Route path="/" element={<Login/>}/>
<Route path="/signup" element={<Signup/>}/>

<Route 
path="/profile" 
element={
<ProtectedRoute>
<Profile/>
</ProtectedRoute>
}
/>

<Route 
path="/admin" 
element={
<ProtectedRoute>
<AdminDashboard/>
</ProtectedRoute>
}
/>

</Routes>

</BrowserRouter>

)

}

export default App