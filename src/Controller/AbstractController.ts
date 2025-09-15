// src/Controllers/AbstractController.ts
import type { Request, Response } from "express";

export abstract class AbstractController {
  protected req!: Request;
  protected res!: Response;

  constructor() {}

  public init(req: Request, res: Response) {
    this.req = req;
    this.res = res;
  }

  protected getParams(): Record<string, any> {
    return { ...this.req.params, ...this.req.query, ...this.req.body };
  }

  protected getMethod(): string {
    return this.req.method;
  }
}
