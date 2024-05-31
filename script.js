if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register("./sw.js", { scope: "./" })
    .then((res) => {
      console.log("Service worker registered successfully");
    })
    .catch((err) => {
      console.log("Falied to registered service worker", err);
    });
}
