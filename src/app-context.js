import { createContext, useContext, useEffect, useState } from 'react';

export const AppContext = createContext({ code: '' });

export const AppContextProvider = (props) => {
   const [code, setCode] = useState('');
   return (
      <AppContext.Provider value={{ code, setCode }}>
         {/* <button
            onClick={() => setCode('200446495')}
            style={{
               background: 'red',
               bottom: 0,
               padding: '1rem',
               position: 'absolute',
               right: 0,
               zIndex: 999999,
            }}
         >
            {code || 'SET CODE'}
         </button> */}
         {props.children}
      </AppContext.Provider>
   );
};

export const useAppContext = () => {
   const { code, setCode } = useContext(AppContext);

   useEffect(() => {
      try {
         window.plugins.honeywell.listen((c) => {
            console.log(`Honeywell: ${c}`);
            setCode(c);
         });
         return () => window.plugins.honeywell.release();
      } catch (_err) {}
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   return { code, setCode };
};
