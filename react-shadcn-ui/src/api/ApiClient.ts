export class ApiClient {
  public async get<T>(url: string): Promise<T> {
    const response = await fetch(url);
    return response.json();
  }

  public async post<H, B, R>(url: string, headers: H, body: B): Promise<R> {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify(body),
    });
    return response.json();
  }
}
