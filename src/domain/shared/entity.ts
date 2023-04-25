export default abstract class Entity {
  protected _id: string;

  get id(): string {
    return this._id;
  }
}
