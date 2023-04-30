import RepositoryInterface from "@domain/shared/repository.interface";
import Message from "../entity/message";

export default interface MessageRepositoryInterface extends RepositoryInterface<Message> { }