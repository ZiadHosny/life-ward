import { useEffect, useState } from "react";
import { useLazyGetFastCoastQuery } from "../../../APIs/fastCoastApi";
import { useLazyGetNoteQuery } from "../../../APIs/noteApi";
export const useGetFastCoast = () => {
  const [state, setState] = useState();
  const [getFastCoast] = useLazyGetFastCoastQuery();
  useEffect(() => {
    getFastCoast()
      .unwrap()
      .then((res) => {
        setState(res.data[0].value);
      });
  }, []);
  return { fastCoast: state };
};
export const useGetNote = () => {
  const [state, setState] = useState();
  const [getNote] = useLazyGetNoteQuery();
  useEffect(() => {
    getNote()
      .unwrap()
      .then((res) => {
         
        setState(res.data[0].value);
      });
  }, []);
  return { noteMessage: state };
};
