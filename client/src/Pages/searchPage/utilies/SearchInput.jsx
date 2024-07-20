import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SearchStyles } from "./utilesStyles";
import { useTranslation } from "react-i18next";
import { InputBase } from "@mui/material";

export const SearchInput = ({ onChange, setOpen }) => {
  const [search, setSearch] = useState("");
  const { pathname } = useLocation();
  const {
    i18n: { language },
  } = useTranslation();
  useEffect(() => {
    const id = setTimeout(() => {
      const s = search.trim()
        ? `keyword[title_en]=${search}&keyword[title_ar]=${search}`
        : "";
      //&keyword[description_en]=${search}&keyword[description_ar]=${search}
      onChange(s);
    }, 500);
    return () => {
      clearTimeout(id);
    };
  }, [search]);
  useEffect(() => {
    setSearch("");
  }, [pathname]);

  return (
    <InputBase
      type={"text"}
      placeholder={language === 'ar' ? 'ما الذي تبحث عنه؟' : 'what are you looking for?'}
      sx={SearchStyles.BoxInput}
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
      }}
      onFocus={() => setOpen(true)}
    />
  );
};
