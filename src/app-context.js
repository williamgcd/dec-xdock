import { createContext, useContext, useEffect, useState } from 'react';

export const AppContext = createContext({ code: '' });

export const AppContextProvider = (props) => {
   const [code, setCode] = useState('');
   return (
      <AppContext.Provider value={{ code, setCode }}>
         {props.children}
      </AppContext.Provider>
   );
};

export const useAppContext = () => {
   const { code, setCode } = useContext(AppContext);

   useEffect(() => {
      try {
         window.plugins.honeywell.listen(
            (c) => {
               console.log(`Honeywell: ${c}`);
               setCode(c);
            },
            (err) => {
               console.log(`Honeywell Error: ${err}`);
            }
         );
         return () => window.plugins.honeywell.release();
      } catch (_err) {
         console.log(`Honeywell not found.`);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return { code, setCode };
};
