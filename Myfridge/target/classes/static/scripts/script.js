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

            if (data.token) {
                localStorage.setItem('token', data.token);
                console.log('Token salvat:', data.token);
            } else {
                console.error('Răspuns de la server lipsind tokenul.');
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
              localStorage.setItem('token', data.token);
              window.location.href = 'http://127.0.0.1:5500/src/main/resources/static/index2.html';
          } else {
              console.error('Eroare la autentificare:', response.statusText);
          }
      } catch (error) {
          console.error('Eroare în timpul POST request pentru autentificare:', error);
      }
  }
  