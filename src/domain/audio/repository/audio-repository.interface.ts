import RepositoryInterface from '@domain/shared/repository.interface';
import { Audio } from '@prisma/client';

export default interface AudioRepositoryInterface extends RepositoryInterface<Audio> { }
