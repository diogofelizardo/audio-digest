import RepositoryInterface from "@domain/shared/repository.interface";
import { Summary } from "@prisma/client";

export default interface SummaryRepositoryInterface extends RepositoryInterface<Summary> {
}