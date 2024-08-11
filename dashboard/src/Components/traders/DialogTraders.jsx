import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useTranslation } from 'react-i18next';
import { Paper, Radio, TableHead } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';

export const DialogTraders = (props) => {
    const { onClose, assignOrderFn, open, traders, assignedTrader } = props;

    const [selectedValue, setSelectedValue] = useState(assignedTrader ? assignedTrader._id : null);

    const [_, { language: lang }] = useTranslation();

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleOnclick = async (value) => {
        setSelectedValue(value)
        await assignOrderFn(value)
        onClose();
    };


    return (
        <Dialog
            PaperProps={{
                style: {
                    width: '700px',
                    padding: '20px'
                }
            }}
            onClose={handleClose}
            open={open}>
            <DialogTitle>
                {lang === "en" ? "Select Trader" : "اختار تاجر"}
            </DialogTitle>
            <TableContainer component={Paper}>
                <Table aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                            </TableCell>
                            <TableCell>
                                #
                            </TableCell>
                            <TableCell >
                                {lang === "en" ? "Trader Name" : "اسم التاجر"}
                            </TableCell>
                            <TableCell>
                                {lang === "en" ? "City" : "المدينة"}
                            </TableCell>
                            <TableCell>
                                {lang === "en" ? "Neighborhood" : "الحي"}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {traders.map((trader, index) => (
                            <TableRow
                                hover
                                onClick={() => handleOnclick(trader._id)}
                                role="radio"
                                key={trader._id}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    cursor: 'pointer'
                                }}
                            >
                                <TableCell padding="checkbox">
                                    <Radio
                                        checked={selectedValue === trader._id}
                                        value={trader._id}
                                        name="radio-buttons"
                                    />
                                </TableCell>
                                <TableCell >{index + 1}</TableCell>
                                <TableCell component="th" scope="row">
                                    {trader.name}
                                </TableCell >
                                <TableCell component="th" scope="row">
                                    {trader.city[`name_${lang}`]}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {trader.country[`name_${lang}`]}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Dialog>)
}
