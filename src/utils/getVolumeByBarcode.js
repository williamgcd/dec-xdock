export const getVolumeByBarcode = async (code, volumes) => {
   const filtered = volumes.docs.filter((doc) => doc.data().codBarras === code);
   const volume = filtered[0];

   if (!volume?.data()) {
      throw Error('Volume não pôde ser encontrado.');
   }
   if (volume.data().status === 'L') {
      throw Error('Volume já foi lido anteriormente.');
   }
   if (volume.data().status === 'F') {
      throw Error('Volume já foi finalizado.');
   }

   return volume;
};
