const routes = {
    '/login': { 
      templateId: 'login', 
      title: 'Login'
    },
    '/dashboard': { 
      templateId: 'dashboard',
      title: 'Dashboard' 
    },
  };
  
  function updateRoute() {
    let path =window.location.pathname;
    const route = routes[path];
  
    if (!route) {
      return navigate('/login');
    }

    if (path=="/dashboard") {
      console.log("Dashboard is shown")
    }

    window.document.title = route.title;
  
    console.log(`ROUTE: ${route}`);
  
    const template = document.getElementById(route.templateId);
    const view = template.content.cloneNode(true);
    const app = document.getElementById('app');
    app.innerHTML = '';
    app.appendChild(view);

   /* if (path=="/login") {
      window.document.title="Login";
    } else if (path=="/dashboard") {
      window.document.title="Dashboard";
      console.log("Dashboard is shown");
    } else {
      window.document.title="Error";
    }*/
  }
  
  function navigate(path) {
    window.history.pushState({}, path, window.location.origin + path); 
    updateRoute();
  }
  
  function onLinkClick(event) {
    event.preventDefault();
    navigate(event.target.href);
  }
  
  window.onpopstate = () => updateRoute();
  updateRoute();
  
  async function register() {
    const registerForm = document.getElementById('registerForm');
    const formData = new FormData(registerForm);
    const data = Object.fromEntries(formData);
    const jsonData = JSON.stringify(data);
  
    const result = await createAccount(jsonData);
  
    if (result.error) {
      return console.log('An error occured:', result.error);
    }
  
    console.log('Account created!', result);
  }
  
  async function createAccount(account) {
    try {
      const response = await fetch('//localhost:5000/api/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: account
      });
      return await response.json();
    } catch (error) {
      return { error: error.message || 'Unknown error' };
    }
  }