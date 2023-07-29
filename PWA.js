if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/service-worker.js')
      .then(function(registration) {
        console.log('Service Worker zarejestrowany:1', registration);
      })
      .catch(function(error) {
        console.log('Rejestracja Service Workera nie powiodła się:', error);
      });
  });
}