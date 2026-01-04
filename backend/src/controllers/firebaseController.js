const admin = require('../firebase/admin');

async function deletarFotosFirebase(fotosRemovidas) {
  if (!fotosRemovidas?.length) return;

  const bucket = admin.storage().bucket();

  await Promise.all(
    fotosRemovidas.map(async (url) => {
      try {
        const path = decodeURIComponent(
          url.split('/o/')[1].split('?')[0]
        );

        await bucket.file(path).delete();
      } catch (err) {
        console.error('Erro ao deletar imagem:', err.message);
      }
    })
  );
}

module.exports = {
    deletarFotosFirebase
};
