import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import { publicFontFamily } from '../publicStyle/publicStyle';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSubId } from '../../APIs/subSlice';

export const NestedNavMobile = ({ item, handleClose }) => {
  const dispatch = useDispatch()
  const [_, { language: lang }] = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const link = `/departments/${item.id}/${item.title_en.replace(
    / /g,
    "-"
  )}`

  const onNavigate = (e) => {
    navigate(link)
    handleClose(e)
  }

  return (
    <>
      {item.subs.length > 1 ?
        <Accordion
          sx={{
            color: pathname === link ? "#fff" : "#aaa",
            bgcolor: 'transparent',
            outline: 'none',
            padding: 0,
            boxShadow: 'none',
            fontSize: "15px",
            textTransform: "capitalize",
            fontWeight: "bold",
            fontFamily: publicFontFamily,
          }}>
          <AccordionSummary
            sx={{ paddingX: '8px' }}
            expandIcon={
              <ExpandMoreIcon sx={{
                color: pathname === link ?
                  "#fff" : "#aaa",
              }} />
            }
            aria-controls="panel1-content"
            id="panel1-header"
          >
            {item[`title_${lang}`]}
          </AccordionSummary>
          <AccordionDetails sx={{
            padding: 0, marginBottom: 2,
          }}>
            {item.subs.map((sub, i) => {
              return (
                sub.subSubCategories.length > 1 ?
                  <Accordion
                    sx={{
                      color: pathname === link ? "#fff" : "#aaa",
                      bgcolor: 'transparent',
                      outline: 'none',
                      padding: 0,
                      boxShadow: 'none',
                      fontSize: "15px",
                      textTransform: "capitalize",
                      fontWeight: "bold",
                      fontFamily: publicFontFamily,
                    }}>
                    <AccordionSummary
                      sx={{ paddingX: '8px' }}
                      expandIcon={
                        <ExpandMoreIcon sx={{
                          color: pathname === link ?
                            "#fff" : "#aaa",
                        }} />
                      }
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      {sub[`title_${lang}`]}
                    </AccordionSummary>
                    <AccordionDetails sx={{
                      paddingX: 3, marginBottom: 2,
                    }}>
                      <Button
                        key={sub.id}
                        disableRipple
                        onClick={(e) => {
                          onNavigate(e)
                        }}
                        sx={{
                          color: "#aaa",
                          borderBottom: 1,
                          fontSize: "15px",
                          textTransform: "capitalize",
                          fontWeight: "bold",
                          backgroundColor: "transparent !important",
                          display: "block",
                          fontFamily: publicFontFamily,
                        }}
                      >
                        {sub[`title_${lang}`]}
                      </Button>
                    </AccordionDetails>
                  </Accordion> :
                  <Button
                    key={sub.id}
                    disableRipple
                    onClick={(e) => {
                      dispatch(setSubId(sub.id))
                      onNavigate(e)
                    }}
                    sx={{
                      color: "#aaa",
                      borderBottom: 1,
                      fontSize: "15px",
                      textTransform: "capitalize",
                      fontWeight: "bold",
                      backgroundColor: "transparent !important",
                      display: "block",
                      fontFamily: publicFontFamily,
                    }}
                  >
                    {sub[`title_${lang}`]}
                  </Button>
              )
            })}
          </AccordionDetails>
        </Accordion>
        :
        <Button
          key={item.id}
          disableRipple
          onClick={(e) => {
            onNavigate(e);
          }}
          sx={{
            color: pathname === link ? "#fff" : "#aaa",
            fontSize: "15px",
            textTransform: "capitalize",
            fontWeight: "bold",
            backgroundColor: "transparent !important",
            display: "block",
            fontFamily: publicFontFamily,
          }}
        >
          {item[`title_${lang}`]}
        </Button>
      }
      <hr />
    </>
  )
}
