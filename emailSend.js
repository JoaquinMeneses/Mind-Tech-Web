import React from 'react';
import NodeMailer from 'nodemailer';


export  function sendEmail() {
  // Configuración del transporte de correo
  const transporter = NodeMailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'mindtech4623@gmail.com',
      pass: 'Hola1234$',
    },
  });

  // Contenido del correo electrónico
  const mailOptions = {
    from: 'mindtech4623@gmail.com',
    to: 'joacodimaro97@gmail.com',
    subject: 'Funcionando factura via email',
    html: `
    <div className='bg-[#e9e6e6] rounded-[15px] mt-4  m-2 font-montserrat items-center justify-evenly p-2 flex flex-col w-[40%] min-h-[90vh]'>
      <!-- email funcionando -->
    </div>
  ` ,
  };

  // Envío del correo electrónico
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Correo electrónico enviado: ' + info.response);
    }
  });
}

