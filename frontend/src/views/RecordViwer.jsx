import React from "react";
import { connect } from 'react-redux';
import { Grid, Row, Col } from "react-bootstrap";
import Card from "components/Card/Card.jsx";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

function RecordViewer(props) {

  const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    tableWrapper: {
      maxHeight: 520,
      overflow: 'auto',
    },
  });

  const columns = [
    { id: 'age', label: 'age', minWidth: 30, align: 'right'},
    { id: 'campaign', label: 'campaign', minWidth: 30 },
    { id: 'cons_conf_idx', label: 'cons_conf_idx', minWidth: 50, align: 'right'},
    { id: 'cons_price_idx', label: 'cons_price_idx', minWidth: 50, align: 'right'},
    { id: 'contact', label: 'contact', minWidth: 50},
    { id: 'day_of_week', label: 'day_of_week', minWidth: 50},
    { id: 'default', label: 'default', minWidth: 30},
    { id: 'duration', label: 'duration', minWidth: 30, align: 'right'},
    { id: 'education', label: 'education', minWidth: 50},
    { id: 'emp_var_rate', label: 'emp_var_rate', minWidth: 50, align: 'right'},
    { id: 'euribor3m', label: 'euribor3m', minWidth: 50, align: 'right'},
    { id: 'housing', label: 'housing', minWidth: 30},
    { id: 'index', label: 'index', minWidth: 30, align: 'right'},
    { id: 'job', label: 'job', minWidth: 50},
    { id: 'loan', label: 'loan', minWidth: 30},
    { id: 'marital', label: 'marital', minWidth: 30},
    { id: 'month', label: 'month', minWidth: 30},
    { id: 'nr_employed', label: 'nr_employed', minWidth: 30, align: 'right'},
    { id: 'pdays', label: 'pdays', minWidth: 20, align: 'right'},
    { id: 'poutcome', label: 'poutcome', minWidth: 30},
    { id: 'previous', label: 'previous', minWidth: 30, align: 'right'},
    { id: 'y', label: 'y', minWidth: 25},
  ]

  const classes = useStyles();

  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col md={12}>
            <Card
              title="Striped Table with Hover"
              category="Here is a subtitle for this table"
              ctTableResponsive
              content={
                <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map(column => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {props.filteredRecords.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                        return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                            {columns.map(column => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === 'number' ? column.format(value) : value}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 50, 100, 250]}
                  component="div"
                  count={props.filteredRecords.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  backIconButtonProps={{
                    'aria-label': 'previous page',
                  }}
                  nextIconButtonProps={{
                    'aria-label': 'next page',
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
                </Paper>
              }
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    filteredRecords: state.filteredRecords
  }
}

export default connect(mapStateToProps)(RecordViewer);

