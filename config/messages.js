module.exports = {
  initConversation: (project, teamsChannelName) =>
    `
    Hola, soy un Bot creado para las Daily Meetings del proyecto ${project}.

    Todos los días te preguntaré qué has hecho ayer, qué vas a hacer hoy y qué problemas te estás encontrando.

    Tus respuestas serán enviadas al canal ${teamsChannelName}.
    `,

  dailyMessage: (name, keyword) =>
    `
    ¡Buenos días ${name}! Por favor, responde a las siguientes preguntas para el Daily Meeting de ${new Date()}:

    * ¿Qué hiciste ayer?
    * ¿Qué vas a hacer hoy?
    * ¿Qué problemas te estás encontrando?


    Cuando hayas enviado tu mensaje, por favor, envía otro con la palabra "${keyword}"
    `,

  dailyThank: (teamsChannelName) =>
    `
    Gracias por tu respuesta. El mensaje será enviado al equipo ${teamsChannelName}.
    `
};
