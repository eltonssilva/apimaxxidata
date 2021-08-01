const functions = require("firebase-functions");
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

const app = express();
// Automatically allow cross-origin requests
app.use(cors({ origin: true }));


const { validateFirebaseIdToken } = require('./validaToken'); 



app.get('/', async (request, response) => {

  const endereco =  `contatos`;
  const token = await validateFirebaseIdToken(request);

  const typeUser = token ? (token.type ? token.type : "usr") : "null";


    const ref = admin.database().ref(endereco);
    ref.once('value')
    .then((snapshot) => {
      
      let _user = [];
      snapshot.forEach(value =>{
        const _UserVal = value.val();

       if (typeUser == "adm"){
          _user.push(_UserVal);
        }
      });
      response.status(200).send(_user);
     }, error => {
       response.status(500).send('erroContatos');
     });  

});


app.put('/', async (request, response) => {

  const body = request.body;
  const situacao = body.profissional.situacao;
  const UserUid = body.profissional.uuid;
  const token = await validateFirebaseIdToken(request);
  const typeUser = token ? (token.type ? token.type : "usr") : "null";

  if (typeUser == "adm"){

    const endereco = `contatos/${UserUid}/`;
    var updatedAt = new Date().getTime();
    const dados = {
      situacao,
      updatedAt
    }

    admin.database().ref(endereco).update(dados)
    .then(()=>{
      response.status(200).send('Ok Atualizado');
    }, error => {
      response.status(500).send('Ok Erro Entrega');
    });
 

  }else{
    response.status(403).send('Unauthorized');

  }
  
});




app.put('/level', async (request, response) => {

  const body = request.body;
  const type = body.profissional.type;
  const UserUid = body.profissional.uuid;

  const token = await validateFirebaseIdToken(request);
  const typeUser = token ? (token.type ? token.type : "usr") : "null";

  if (typeUser == "adm"){
  //if (true){

    admin
    .auth()
    .getUser(UserUid)
    .then((user) => {
        const saida =  admin.auth().setCustomUserClaims(user.uid, {
          type: typeUser,
        });

   

        const endereco = `contatos/${UserUid}/`;

        var updatedAt = new Date().getTime();
        const dados = {
          nivel : type,
          updatedAt
        }

        admin.database().ref(endereco).update(dados)
        .then(()=>{
          response.status(200).send(saida);
        }, error => {
          response.status(500).send('Ok Tipo de Usuario Atulizado');
        });
     

    })
    .catch((error) => {
      response.status(200).send(error);
    });


  }else{
    response.status(403).send('Unauthorized');

  }
  
});

exports.users = functions.https.onRequest(app);



