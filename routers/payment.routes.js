import { Router } from "express";
import { db } from "../firebase.js";

import {registro} from "../controllers/contacto.js"
import qrcode from 'qrcode';
 import vcard from 'vcard-generator';



const router = Router();



router.get("/base", async (req, res) => {
  const querySnapshot = await db.collection("Citas").get();
  const contacts = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  res.send(contacts);
});

router.get("/", (req, res) => res.send("inicio Entrado o Finalizado"));
router.get("/registro",registro )



const vcardContent = vcard.generate({
  name: {
    familyName: 'Cristina Hernández',
    // givenName: 'Cesar Ramos',
    // middleName: 'Philip',
    // prefix: 'Dr.',
    // suffix: 'Jr.',
  },
  // formattedNames: [{
  //   text: 'Mr. Johny',
  // }],
  // nicknames: [{
  //   text: 'Phil',
  // }],
  extraName: {
    maidenName: 'MaidenName',
    phoneticFirstName: 'PhoneticFirstName',
    phoneticMiddleName: 'PhoneticMiddleName',
    phoneticLastName: 'PhoneticLastName',
 
    pronunciationFirstName: 'PronunciationFirstName',
    pronunciationMiddleName: 'PronunciationMiddleName',
    pronunciationLastName: 'PronunciationLastName',
  },
 
  works: [{
    organization: 'SERVIRAM',
    title: 'Ventas',
    role: 'Ventas',
  }],
  emails: [{
    type: 'work',
    text: 'cristina.hernandez@serviram.com.mx',
  }
  // ,{
  //   type: 'home',
  //   text: 'johndoe@example.com',
  // }


],
  phones: [{
    type: 'work',
    text: '5214442772761',
  }
  
  // , {
  //   text: '(123) 123-1234',
  // }, {
  //   uri: 'tel:1234567890',
  // }

],
  addresses: [{
    type: 'work',
    street: 'Lago de Xochimilco #336',
    locality: 'Col. San Luis Rey',
    region: 'S.L.P',
    code: '78350',
    country: 'MEXICO',
  }
  // , {
  //   type: 'home',
  //   street: '456 Home St',
  //   locality: 'Homeland',
  //   region: 'CA',
  //   code: '23456',
  //   country: 'USA',
  // }
],
  // socialProfiles: [{
  //   type: 'facebook',
  //   uri: 'http://www.facebook.com/johndoe',
  // }, {
  //   type: 'twitter',
  //   user: 'johnie',
  // }],
  // urls: [{
  //   type: 'internet',
  //   uri: 'http://www.mycompany.com',
  // }, {
  //   type: 'personal',
  //   uri: 'http://www.johndoe.com',
  // }],
 
  // photos: [{
  //   type: 'work',
  //   uri: 'https://upload.wikimedia.org/wikipedia/en/8/80/Wikipedia-logo-v2.svg',
  // }, {
  //   type: 'home',
  //   dataUri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD///+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4Ug9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC',
  // }],
 
  // birthday: {
  //   year: 2000,
  //   month: 1,
  //   day: 31,
  // },
  // gender: {
  //   sex: 'male',
  // },
  // notes: [{
  //   text: 'John Doe has a long and varied history, being documented on more police files that anyone else.\nReports of his death are alas numerous.',
  // }, {
  //   text: 'Another note.',
  // }],
});


router.get("/qr", async (req, res) => {



qrcode.toFileStream(res, vcardContent);


});

router.get("/vcard", async (req, res) => {



  const qrCodeBuffer = await qrcode.toBuffer(vcardContent);

    // Configurar el encabezado para la descarga del archivo vCard
    res.setHeader('Content-Disposition', 'attachment; filename="contacto.vcf"');
    res.setHeader('Content-Type', 'text/vcard');
    
    // Enviar el archivo vCard al cliente
    res.send(vcardContent);
  
  
  });
  









export default router;
