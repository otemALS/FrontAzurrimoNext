export default class HttpService {
    // GET
    static async get<T = any>(url: string): Promise<T> {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`GET ${url} failed with status ${response.status}`);
      }
      return await response.json();
    }
  
    // DELETE
    static async delete<T = any>(url: string): Promise<T> {
      const response = await fetch(url, { method: "DELETE" });
      if (!response.ok) {
        throw new Error(`DELETE ${url} failed with status ${response.status}`);
      }
      return await response.json();
    }
  
    // POST
    static async post<T = any, R = any>(url: string, data: T): Promise<R> {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`POST ${url} failed with status ${response.status}`);
      }
  
      return await response.json();
    }
  
    // PUT
    static async put<T = any, R = any>(url: string, data: T): Promise<R> {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`PUT ${url} failed with status ${response.status}`);
      }
  
      return await response.json();
    }
  }
  