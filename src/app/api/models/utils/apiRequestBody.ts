export class ApiRequestBody {
  static GenerateRequestBody<T>(model: T) {
    let body: any = {};
    for (let key in model) {
      if (Object.prototype.hasOwnProperty.call(model, key)) {
        body[key] = model[key];
      }
    }
    return body;
  }
}
