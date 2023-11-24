const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () =>{
      container.classList.add("active");
});

loginBtn.addEventListener('click', () =>{
      container.classList.remove("active");
});

document.getElementById('signupButton').addEventListener('click', function (event) {
      event.preventDefault();
      const formData = {
            firstname: document.querySelector('.form-container.sign-up input[placeholder="Firstname"]').value,
            lastname: document.querySelector('.form-container.sign-up input[placeholder="Lastname"]').value,
            email: document.querySelector('.form-container.sign-up input[placeholder="Email"]').value,
            password: document.querySelector('.form-container.sign-up input[placeholder="Password"]').value
        };

        fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Răspuns de la server:', data);

            // Verifică dacă serverul a returnat un token
            if (data.token) {
                // Poți salva tokenul într-un loc sigur, cum ar fi Local Storage
                localStorage.setItem('token', data.token);
                console.log('Token salvat:', data.token);

                // Aici poți face orice alte acțiuni necesare după ce ai primit tokenul
            } else {
                console.error('Răspuns de la server lipsind tokenul.');
                // Tratează cazul în care serverul nu a returnat un token
            }
        })
        .catch(error => {
            console.error('Eroare:', error);
        });
  });

  document.getElementById('signinButton').addEventListener('click', function (event) {
      event.preventDefault();
      authenticateUser();
  });
  
  async function authenticateUser() {
      // Obțineți valorile din formularul de autentificare
      const email = document.querySelector('.form-container.sign-in input[placeholder="Email"]').value;
      const password = document.querySelector('.form-container.sign-in input[placeholder="Password"]').value;
  
      // Construiește obiectul de autentificare
      const credentials = {
          email: email,
          password: password
      };
  
      // Realizează un POST request pentru autentificare
      try {
          const response = await fetch('http://localhost:8080/auth/authenticate', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(credentials)
          });
  
          if (response.ok) {
              const data = await response.json();
              console.log('Autentificare cu succes. Token obținut:', data.token);
  
              // Salvează tokenul în Local Storage pentru utilizare ulterioară
              localStorage.setItem('token', data.token);
  
              // După autentificare, poți face un GET request pentru a obține datele protejate
              authenticateAndFetchData(email);
          } else {
              console.error('Eroare la autentificare:', response.statusText);
          }
      } catch (error) {
          console.error('Eroare în timpul POST request pentru autentificare:', error);
      }
  }
  
  async function authenticateAndFetchData(email) {
      // Obține tokenul salvat în Local Storage
      const token = localStorage.getItem('token');
  
      // Verifică dacă tokenul există
      if (!token) {
          console.error('Token lipsă. Autentificare necesară.');
          return;
      }
  
      // Realizează un GET request pentru a obține datele
      try {
          const response = await fetch(`http://localhost:8080/usertable/${email}`, {
              method: 'GET',
              headers: {
                  'Authorization': `Bearer ${token}`
              }
          });
  
          if (response.ok) {
              const data = await response.text();
              console.log('Date obținute cu succes:', data);
          } else {
              console.error('Eroare la obținerea datelor:', response.statusText);
          }
      } catch (error) {
          console.error('Eroare în timpul GET request:', error);
      }
  }