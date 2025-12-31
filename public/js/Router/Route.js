export default class Route {
    constructor(url, title, pathHtml, authorize = [], pathJS = "") {
      this.url = url;
      this.title = title;
      this.pathHtml = pathHtml;
      this.pathJS = pathJS;
      this.authorize = authorize;
    }
}

/*
[] -> tout le monde peut y accéder
['disconnected'] -> réserver au utilisateur deconnecté
['client'] -> réserver au utilisateur avec le rôle client
['admin'] -> réserver au utilisateur avec le rôle admin 
['admin' , 'client'] -> réserver au utilisateur avec le rôle client ou admin
*/
