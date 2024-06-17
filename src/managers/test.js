import serviceManager from "./servicesManagers.js";

serviceManager.getServices();

const testServices = async () => {
  serviceManager.addService({
    servicio: "Apoyo al negocio",
    cantidadDePreguntas: 18,
  });
  console.log("hola!");

  //   const service = await serviceManager.getServicesbyId(2);
  //   console.log(service);
  //   const service = await serviceManager.updateService(2, {
  //     cantidadDePreguntas: 10,
  //   });
  //   console.log(service);

  //  const services = await serviceManager.deleteService(11);
};

testServices();
