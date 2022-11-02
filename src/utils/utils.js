import Cookies from 'js-cookie';
import { async } from 'regenerator-runtime';

const makeRequest = {
  get: async function(resource, options = {}) {
    const { timeout = 8000 } = options;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(resource, {...options, signal: controller.signal});
    clearTimeout(id);
    return response;
  },
  post: async function(resource, body, options={}) {
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
  patch: async function(resource, body, options={}) {
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
  put: async function(resource, body, options={}) {
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
  delete: async function(resource, options={}) {
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
  }
  return false
}

const makeRequestWrapper = async (resource, method, setLoggedInUser, data={}) => {
  const { options = {timeout: 8000} } = data;
  const { body = {} } = data;
  const requestHandler = makeRequest[method];

  if (method in ['post', 'patch', 'put']) {
    var response = await requestHandler(resource, body, options);
  }else {
    var response = await requestHandler(resource, options);
  }

  if (response.redirected) {
    setLoggedInUser(null);
    Cookies.remove('user');
    return {ok: false}
  }

  return response
}

const getFormattedDate = (date, format) => {
  const [year, month, day] = date.split('-');

  let dd = day;
  let mm = month;
  const yyyy =year;

  if (format === 'dd/mm/yyyy') {
      return dd + '/' + mm + '/' + yyyy;
  }

  if (format === 'mm/dd/yyyy') {
      return mm + '/' + dd + '/' + yyyy;
  }

  if (format === 'mm/dd/yyyy H:M') {
      return `${mm}/${dd}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
  }
}

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

const isDate = date => {
  return !isNaN(Date.parse(date));
}

export { makeRequest, useAuth, makeRequestWrapper, getFormattedDate, uuidv4, isDate };