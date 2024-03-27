import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material'
import {
  Link
} from "react-router-dom"

const Users = ({ users }) => {
  return (
    <div>
        <h1>Users</h1>
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
    </div>
  )
}

export default Users