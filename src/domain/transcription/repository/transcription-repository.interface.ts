import RepositoryInterface from "@domain/shared/repository.interface";
import { Transcription } from "@prisma/client";

export default interface TranscriptionRepositoryInterface extends RepositoryInterface<Transcription> {
}