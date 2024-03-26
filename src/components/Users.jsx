import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"

import User from './User'

const Users = ({ users }) => {

  return (
    <div>
      <Router> 
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                                
                </TableCell>
                <TableCell>
                  Blogs Created
                </TableCell>
              </TableRow>
              {users.map(user =>
                <TableRow key={user.id}>
                  <TableCell>
                    <Link to={`/users/${user.id}`}>
                      {user.name}
                    </Link>          
                  </TableCell>
                  <TableCell>
                    {user.blogs.length}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        <Routes>
          <Route path="/users/:id" element={<User users={users}/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default Users