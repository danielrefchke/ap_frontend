export class HttpController {
  private baseUrl: string;
  private static AUTH_TOKEN = 'miTokenJWT';

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private static getDefaultHeaders(): any {
    return {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${HttpController.AUTH_TOKEN}`,
    };
  }

  public async get<T>(path: string): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const body = (await response.json()) as T;
    return body;
  }

  public  async post(url: string, data: any): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${url}`, {
      method: 'POST',
      headers: HttpController.getDefaultHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Error al realizar la petición POST');
    }

    return await response.json();
  }

  public  async put(url: string, data: any): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${url}`, {
      method: 'PUT',
      headers: HttpController.getDefaultHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Error al realizar la petición PUT');
    }

    return await response.json();
  }

  public async delete(url: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}/${url}`, {
      method: 'DELETE',
      headers: HttpController.getDefaultHeaders(),
    });

    if (!response.ok) {
      throw new Error('Error al realizar la petición DELETE');
    }

    return await response.json();
  }
}
