import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Container, Typography } from "@mui/material";
import styled from "styled-components";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import axios from "axios";

const Button = styled.button`
  border: none;
  border-radius: 1rem;
  padding: 10px 15px;
  background-color: black;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Main = () => {
  const [client, setClient] = useState("Moj client");
  const [resp, setResp] = useState();
  const [amountState, setAmountState] = useState(0);
  const [from, setFrom] = useState(new Date());
  const [to, setTo] = useState(new Date());

  useEffect(() => {
    let dataForSend = {
      clientName: "Moj zubar",
      dateFrom: "2022-05-18",
      dateTo: "2022-06-12",
    };
    axios
      .post(
        "https://dentaldriversteam.herokuapp.com/api/v1/reports",
        dataForSend
      )
      .then(function (response) {
        setResp(response?.data);

        //racuna iznos
        let amount = 0;
        response?.data.forEach((item) => {
          amount += item?.amount;
        });
        setAmountState(amount);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Container mt={10} p={1}>
      <Box
        p={1}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "0.1rem solid black",
        }}
      >
        <Typography>Report search</Typography>
        <Button>Final report</Button>
      </Box>
      <Box
        p={3}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "70%",
        }}
      >
        <Box>
          <Typography>Client</Typography>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={client}
              onChange={(e) => setClient(e.target.value)}
            >
              <MenuItem value={client}>Moj Klijent</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <Typography>From *</Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <DesktopDatePicker
                inputFormat="MM/dd/yyyy"
                value={from}
                onChange={(newValue) => setFrom(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </Box>
        <Box>
          <Typography>To *</Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <DesktopDatePicker
                inputFormat="MM/dd/yyyy"
                value={to}
                onChange={(newValue) => setTo(newValue)}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
        </Box>
        <Box mt={4}>
          <Button>Submit</Button>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                N
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                From
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                To
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                Direct
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                Paid
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                Bill Date
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>
                Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resp?.map((item) => (
              <TableRow
                key={item?.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center"></TableCell>
                <TableCell align="center">{item?.nameClientFrom}</TableCell>
                <TableCell align="center">{item?.nameClientTo}</TableCell>
                <TableCell align="center">{item?.direct}</TableCell>
                <TableCell align="center">{item?.paid}</TableCell>
                <TableCell align="center">{item?.dateBill}</TableCell>
                <TableCell align="center" sx={{ color: "red" }}>
                  {item?.amount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">
                <Button>To pdf</Button>
              </TableCell>
              <TableCell align="center">Total amount:</TableCell>
              <TableCell align="center">{amountState}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Main;
