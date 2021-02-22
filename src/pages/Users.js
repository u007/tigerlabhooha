import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { apiURL } from '../config';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Users() {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    axios({
      url: `${apiURL}users`,
      method: 'GET',
    }).then((res) => {
      console.log('pipedswitchmap1', res.data.data);
      setRows(res.data.data);
    }).catch((err) => {
      setFetchError(err);
    });
  }, []);

  return (
    <div className="App">
      <h1>Users</h1>
      <Container fixed>
        {fetchError && (
        <Alert
          severity="error"
          action={(
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setFetchError(null);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
        )}
        >
          {fetchError.message}
        </Alert>
        )}
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <colgroup>
              <col style={{ width: '120px' }} />
              <col />
              <col />
              <col />
            </colgroup>
            <TableHead>
              <TableRow>
                <TableCell width="10%">id</TableCell>
                <TableCell align="right">First name</TableCell>
                <TableCell align="right">Last name</TableCell>
                <TableCell align="right">Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.first_name}</TableCell>
                  <TableCell align="right">{row.last_name}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Users;
