import Cookies from 'js-cookie';

const makeRequest = {
  get: async function(resource, options = {}) {
    const { timeout = 8000 } = options;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(resource, {...options, signal: controller.signal});
    clearTimeout(id);
    return response;
  },
  post: async function(resource, body, options = {}) {
    const { timeout = 8000 } = options;
    options['method'] = 'POST';
    options['credentials'] = 'same-origin';
    options['headers'] = {
        "X-CSRFToken": Cookies.get('csrftoken'),
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
    options['body'] = JSON.stringify(body);
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(resource, {...options, signal: controller.signal});
    clearTimeout(id);
    return response;
  },
  patch: async function(resource, body, options = {}) {
    const { timeout = 8000 } = options;
    options['method'] = 'PATCH';
    options['credentials'] = 'same-origin';
    options['headers'] = {
        "X-CSRFToken": Cookies.get('csrftoken'),
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
    options['body'] = JSON.stringify(body);
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(resource, {...options, signal: controller.signal});
    clearTimeout(id);
    return response;
  },
  put: async function(resource, body, options = {}) {
    const { timeout = 8000 } = options;
    options['method'] = 'PUT';
    options['credentials'] = 'same-origin';
    options['headers'] = {
        "X-CSRFToken": Cookies.get('csrftoken'),
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
    options['body'] = JSON.stringify(body);
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(resource, {...options, signal: controller.signal});
    clearTimeout(id);
    return response;
  },
  delete: async function(resource, options = {}) {
    const { timeout = 8000 } = options;
    options['method'] = 'DELETE';
    options['credentials'] = 'same-origin';
    options['headers'] = {
        "X-CSRFToken": Cookies.get('csrftoken'),
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(resource, {...options, signal: controller.signal});
    clearTimeout(id);
    return response;
  }
}

const useAuth = () => {
  const user = Cookies.get('user');
  if (user) {
    return true
  } else {
    return false
  }
}

export { makeRequest, useAuth };