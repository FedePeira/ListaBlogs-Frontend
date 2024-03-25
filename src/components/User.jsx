import PropTypes from 'prop-types';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material'

const User = ({ id, name, count }) => {
  return (
    <TableRow key={id}>
      <TableCell>
        {name}
      </TableCell>
      <TableCell>
        {count}
      </TableCell>
    </TableRow>
  )
}

User.propTypes = {
    id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

export default User