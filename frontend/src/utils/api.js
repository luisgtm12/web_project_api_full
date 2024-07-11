class Api {
  constructor({baseUrl, headers}){
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  
  defaultProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers:this._headers
    })
    .then((res)=> {
      if (res.ok){
        
        return res.json();
      }
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
  }
  getCards(){
    return fetch(`${this._baseUrl}/cards`, {
      headers:this._headers,
    })
    .then((res)=> {
      if (res.ok){
        
        return res.json();
      }
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
  }

  addCards(data){
    return fetch(`${this._baseUrl}/cards`,{
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data)
    })
    .then((res)=> {
      if (res.ok){
        
        return res.json();
      }
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
  }

  updateAvatar(data){
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers:this._headers,
      body:JSON.stringify(data)
    })
    .then((res)=> {
      if (res.ok){
        
        return res.json();
      }
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
  }

  updateProfile(data){
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers:this._headers,
      body:JSON.stringify(data)
    })
    .then((res)=> {
      if (res.ok){
        
        return res.json();
      }
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    })
    .then((res) =>{
      if (res.ok){
        return res.json();
      }
      return Promise.reject(res.status);
    } )
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers:this._headers,
    })
      .then((res) =>{
        if (res.ok){
          return res.json();
        }
        return Promise.reject(res.status);
      } )
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  }

  deleteCard(cardId){
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers:this._headers,
    })
    .then((res)=> {
      if (res.ok){
        
        return res.json();
      }
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
    }
}

export const api = new Api({
  baseUrl:"https://around.nomoreparties.co/v1/web_es_07",
  headers:{
    authorization:"3a9ccaa6-61a7-4561-8aff-5b939bc6d3d4",
    "Content-Type": "application/json"
  }
})
export default api;